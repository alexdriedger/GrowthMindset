""" Server API for the rendezVous application """

from __future__ import print_function
from datetime import datetime
from datetime import timedelta
import uuid
import httplib2
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from googleapiclient import discovery
from oauth2client import client
from oauth2client.contrib.multiprocess_file_storage import MultiprocessFileStorage
from flask import Flask, jsonify, request
import database
import ast
import sys

SCOPES = ['https://www.googleapis.com/auth/calendar',
          'https://www.googleapis.com/auth/plus.profile.emails.read']
REDIRECT_URI = 'urn:ietf:wg:oauth:2.0:oob'
CLIENT_SECRET_FILE = 'client_secret.json'
APPLICATION_NAME = 'Google Calendar API Python Quickstart'

app = Flask(__name__)

@app.route('/helloworld', methods=['GET'])
def helloworld():
    """
    Hello world function to test if the API is up and running.
    """
    return "Hello world!\n"

@app.route('/login1')
def login1():
    """
    The first step of the OAuth 2.0 login process.
    Returns a URL that the client has to go to.
    """
    flow = client.flow_from_clientsecrets(CLIENT_SECRET_FILE, scope=SCOPES,
                                          redirect_uri=REDIRECT_URI)
    flow.user_agent = APPLICATION_NAME
    return flow.step1_get_authorize_url()

@app.route('/login2')
def login2():
    """
    The second step of the OAuth 2.0 login process.
    Once the client has accessed and retrieved the code from the first step of the
    login process, the client passes the code to this API.
    """
    try:
        code = request.headers['code']
        flow = client.flow_from_clientsecrets(CLIENT_SECRET_FILE, scope=SCOPES,
                                              redirect_uri=REDIRECT_URI)
        flow.user_agent = APPLICATION_NAME
        credentials = flow.step2_exchange(code)
        storage = MultiprocessFileStorage('credentials', code)
        storage.put(credentials)
    except:
        return jsonify({'success': False, 'response_message': "ERROR: " + str(sys.exc_info())})
    return jsonify({'success': True, 'response_message': "User successfully authenticated!"})

def get_user_email(credentials):
  """
  Send a request to the Plus API to retrieve the user's email.

  Args:
    credentials: oauth2client.client.OAuth2Credentials instance to authorize the
                 request.
  Returns:
    User information as a dict.
  """
  plus_service = discovery.build(
      serviceName='plus', version='v1',
      http=credentials.authorize(httplib2.Http()))
  user_info = None
  try:
    user_info = plus_service.people().get(userId="me").execute()
  except:
    return 'An error occurred: ' + str(sys.exc_info())
  if user_info and user_info.get('id'):
    return user_info['emails'][0]['value']
  else:
    raise NoUserIdException()

# TODO: change this to a POST method
@app.route('/submit_form', methods=['GET'])
def submit_form():
    """
    Allows a user to submit a form using the parameters laid out below.
    Create an available list based on the results from querying the Google Calendar API.
    Store the result in the database and send a response back to the caller.
    """
    code = request.headers['code']
    email_responder = request.headers['email_responder']
    duration = int(request.headers['duration'])
    date_range_start = request.headers['date_range_start']
    date_range_end = request.headers['date_range_end']
    meeting_buffer = int(request.headers['meeting_buffer'])
    earliest_meeting_time = request.headers['earliest_meeting_time']
    latest_meeting_time = request.headers['latest_meeting_time']
    location = request.headers['location']
    summary = request.headers['summary']
    description = request.headers['description']

    # convert the data to more useable formats
    buffer_delta = timedelta(minutes=meeting_buffer)
    earliest_time = datetime.strptime(earliest_meeting_time, '%H:%M').time()
    latest_time = datetime.strptime(latest_meeting_time, '%H:%M').time()

    # create the service from the supplied code
    storage = MultiprocessFileStorage('credentials', code)
    credentials = storage.get()

    email_creator = get_user_email(credentials)

    # TODO: this is code that should ideally work with the pretty login screen Alex made but doesn't :(
    #print(credentials.to_json())
    #credentials = client.credentials_from_clientsecrets_and_code(CLIENT_SECRET_FILE, SCOPES, code)
    #storage.put(credentials)
    
    http = credentials.authorize(httplib2.Http())
    service = discovery.build('calendar', 'v3', http=http)

    time1 = datetime.strptime(date_range_start, '%Y-%m-%d')
    time2 = datetime.strptime(date_range_end, '%Y-%m-%d')
    time_min = time1.isoformat() + '-08:00'
    time_max = time2.isoformat() + '-08:00'

    events_result = service.events().list(
        calendarId='primary', timeMin=time_min, timeMax=time_max, singleEvents=True,
        orderBy='startTime').execute()
    events = events_result.get('items', [])

    #if not events:
    #return 'No events for the given date.\n'

    available_list = []

    for i in range(len(events) + 1):
        # find the start time of the next possible meeting range
        if i == 0:
            start_time = time1
        else:
            start_time = datetime.strptime(events[i-1]['end']['dateTime'][:-1],
                                           '%Y-%m-%dT%H:%M:%S') + buffer_delta

        # find the end time of the next possible meeting range
        if i == len(events):
            end_time = time2
        else:
            end_time = datetime.strptime(events[i]['start']['dateTime'][:-1],
                                         '%Y-%m-%dT%H:%M:%S') - buffer_delta

        # calculate meeting minutes
        delta = end_time - start_time
        minutes = delta.total_seconds() / 60

        # loop through the space between meetings in case it is longer than the duration
        # TODO: this doesn't account for the "earliest_time" specified (i.e. there is a chance the
        # first event doesn't start at the specified earliest time even if the meeting time works)
        for j in range(0, int(minutes/duration)):
            meeting_time = start_time + timedelta(minutes=j * duration)
            if (meeting_time.time() >= earliest_time and
                    (meeting_time + timedelta(duration)).time() <= latest_time):
                available_list.append(meeting_time)

    list_id = str(uuid.uuid4())

    database.create_event(list_id, available_list, code, duration, email_creator, email_responder, location, summary, description)

    return jsonify({'email_responder': email_responder, 'list_id': list_id, 'available_list': available_list})

@app.route('/modify_list', methods=['GET'])
def modify_list():
    """
    Remove a specific entry from an availability_list
    """
    list_id = request.headers['list_id']
    list_index = int(request.headers['list_index'])
    
    # this assumes list_id is valid
    availability = ast.literal_eval(database.get_events_by_id(list_id))[0]

    if (availability[0] != list_id):
        return "ERROR: database list_id mismatch"

    del availability[1][list_index]

    database.delete_event(availability[0])
    database.create_event(availability[0],
                          availability[1],
                          availability[2],
                          availability[3],
                          availability[4],
                          availability[5],
                          availability[6],
                          availability[7],
                          availability[8])

    return "Database entry successfully modified"

@app.route('/confirm_form', methods=['GET'])
def confirm_form():
    """
    Confirm if the available list created by submit_form() should be sent to the specified email.
    If not, remove it from the database.
    """
    list_id = request.headers['list_id']
    list_confirmed = request.headers['list_confirmed']
    
    if list_confirmed == 'true':
        availability = ast.literal_eval(database.get_events_by_id(list_id))[0]

        msg = MIMEMultipart('alternative')
        msg['Subject'] = "New meeting request: " + availability[0]
        msg['From'] = "rendezvouscpen321@gmail.com"
        msg['To'] = availability[5]

        html = "<html><head></head><body>Hey there, you've just been requested to attend a meeting with <b>"""
        html += availability[4]
        html += "</b>. The available meeting times are:<ul>"
        
        for time in availability[1]:
            html += "<li>" + time + "</li>"

        html += "</ul>Please respond in the app to the availability list corresponding to the following meeting ID:<br><br>"
        html += "<span style=\"font-family: Courier New, Courier, Lucida Sans Typewriter, Lucida Typewriter, monospace;\">"
        html += availability[0]
        html += "</span><br><br>Sincerely,<br>The rendezVous team</body></html>"

        msg.attach(MIMEText(html, 'html'))

        s = smtplib.SMTP('smtp.gmail.com', 587)
        s.ehlo()
        s.starttls()
        # TODO: this doesn't work on heroku FeelsBadMan
        s.login("rendezvouscpen321@gmail.com", "vousrende")
        s.sendmail("rendezvouscpen321@gmail.com",
                   availability[5],
                   msg.as_string())
        s.close()

        return "email sent\n"
    elif list_confirmed == 'false':
        database.delete_event(list_id)
        return "DELETED\n"
    else:
        return "list_confirmed should be either \'true\' or \'false\'\n"

@app.route('/get_available_lists', methods=['GET'])
def get_available_lists():
    """
    Get all available lists from the database given a responder email.
    """
    code = request.headers['code']
    storage = MultiprocessFileStorage('credentials', code)
    credentials = storage.get()
    email_responder = get_user_email(credentials)
    available_lists_array = ast.literal_eval(database.get_events_by_email_responder(email_responder))
    available_lists = {}
    for available_list in available_lists_array:
        available_lists[available_list[0]] = {
            "list_id": available_list[0],
            "available_list": available_list[1],
            "creator_code": available_list[2],
            "duration": available_list[3],
            "email_creator": available_list[4],
            "email_responder": available_list[5],
            "location": available_list[6],
            "summary": available_list[7],
            "description": available_list[8]}
    return jsonify({'available_lists': available_lists})

@app.route('/get_sent_lists', methods=['GET'])
def get_sent_lists():
    """
    Get all available lists from the database given a creator email.
    """
    code = request.headers['code']
    storage = MultiprocessFileStorage('credentials', code)
    credentials = storage.get()
    email_creator = get_user_email(credentials)
    available_lists_array = ast.literal_eval(db.get_events_by_email_creator(email_creator))
    available_lists = {}
    for available_list in available_lists_array:
        available_lists[available_list[0]] = {
            "list_id": available_list[0],
            "available_list": available_list[1],
            "creator_code": available_list[2],
            "duration": available_list[3],
            "email_creator": available_list[4],
            "email_responder": available_list[5],
            "location": available_list[6],
            "summary": available_list[7],
            "description": available_list[8]}
    return jsonify({'available_lists': available_lists})

@app.route('/choose_meeting_time', methods=['GET'])
def choose_meeting_time():
    """
    Choose a time, and update the calendars of the two meeting members accordingly.
    """
    code = request.headers['code']
    list_id = request.headers['list_id']
    chosen_time = request.headers['chosen_time'] # this must include date

    # get all useful data from the availability list
    availability = ast.literal_eval(database.get_events_by_id(list_id))[0]
    creator_code = availability[2]
    duration = int(availability[3])
    email_creator = availability[4]
    location = availability[6]
    summary = availability[7]
    description = availability[8]
    database.delete_event(list_id)
    
    # create the start and end times based on the creator_code and duration
    time_start = datetime.strptime(chosen_time, '%Y-%m-%d %H:%M')
    dateTime_start = time_start.isoformat() + '-08:00'
    duration_delta = timedelta(minutes=duration)
    time_end = time_start + duration_delta
    dateTime_end = time_end.isoformat() + '-08:00'

    # use the provided header code to get the responder's email
    storage = MultiprocessFileStorage('credentials', code)
    credentials = storage.get()
    email_responder = get_user_email(credentials)

    if (email_responder != availability[5]):
        return "Security vulnerability: email mismatch\n"

    # create the event body
    event = {
      'summary': summary,
      'location': location,
      'description': description,
      'start': {
        'dateTime': dateTime_start,
        'timeZone': 'America/Los_Angeles',
      },
      'end': {
        'dateTime': dateTime_end,
        'timeZone': 'America/Los_Angeles',
      },
      'attendees': [
        {'email': email_creator},
        {'email': email_responder},
      ],
    }

    # create the event in the creator's calendar
    creator_storage = MultiprocessFileStorage('credentials', creator_code)
    creator_credentials = creator_storage.get()
    creator_http = creator_credentials.authorize(httplib2.Http())
    creator_service = discovery.build('calendar', 'v3', http=creator_http)
    creator_event = creator_service.events().insert(calendarId='primary', body=event).execute()
    print('Event created: ' + str(creator_event.get('htmlLink')))

    return "SUCCESS\n"

@app.route('/print_database', methods=['GET'])
def print_database():
    return str(database.getall()) + '\n'

if __name__ == '__main__':
    app.run(debug=True, use_reloader=False)
