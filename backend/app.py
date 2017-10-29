""" Server API for the rendezVous application """

from __future__ import print_function
from datetime import datetime
from datetime import timedelta
import uuid
import httplib2
from googleapiclient import discovery
from oauth2client import client
from oauth2client.contrib.multiprocess_file_storage import MultiprocessFileStorage
from flask import Flask, jsonify, request

SCOPES = 'https://www.googleapis.com/auth/calendar.readonly'
REDIRECT_URI = 'urn:ietf:wg:oauth:2.0:oob'
CLIENT_SECRET_FILE = 'client_secret.json'
APPLICATION_NAME = 'Google Calendar API Python Quickstart'

app = Flask(__name__)

@app.route('/helloworld', methods=['GET'])
def helloworld():
    """
    Hello world function to test if the API is up and running.
    """
    return "Hello world!"

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
    code = request.headers['code']
    flow = client.flow_from_clientsecrets(CLIENT_SECRET_FILE, scope=SCOPES,
                                          redirect_uri=REDIRECT_URI)
    flow.user_agent = APPLICATION_NAME
    credentials = flow.step2_exchange(code)
    storage = MultiprocessFileStorage('credentials', code)
    storage.put(credentials)
    return ""

# TODO: change this to a POST method
@app.route('/submit_form', methods=['GET'])
def submit_form():
    """
    Allows a user to submit a form using the parameters laid out below.
    Create an available list based on the results from querying the Google Calendar API.
    Store the result in the database and send a response back to the caller.
    """
    # TODO: use location somehow
    #location = request.headers['location']
    email = request.headers['email']
    duration = int(request.headers['duration'])
    date_range_start = request.headers['date_range_start']
    date_range_end = request.headers['date_range_end']
    meeting_buffer = int(request.headers['meeting_buffer'])
    earliest_meeting_time = request.headers['earliest_meeting_time']
    latest_meeting_time = request.headers['latest_meeting_time']

    # convert the data to more useable formats
    buffer_delta = timedelta(minutes=meeting_buffer)
    earliest_time = datetime.strptime(earliest_meeting_time, '%H:%M').time()
    latest_time = datetime.strptime(latest_meeting_time, '%H:%M').time()

    # TODO: for now just use this code to access Rendez's calendar
    code = '4/27zFdVQkYlMS0fwT_mRbb6jFmCyquND3MtjoKQhGeRg'

    # create the service from the given code above
    storage = MultiprocessFileStorage('credentials', code)
    credentials = storage.get()
    http = credentials.authorize(httplib2.Http())
    service = discovery.build('calendar', 'v3', http=http)

    # TODO:
    # create a mysql database to store the availability in
    # do more things..........

    time1 = datetime.strptime(date_range_start, '%Y-%m-%d')
    time2 = datetime.strptime(date_range_end, '%Y-%m-%d')
    time_min = time1.isoformat() + '-07:00'
    time_max = time2.isoformat() + '-07:00'

    events_result = service.events().list(
        calendarId='primary', timeMin=time_min, timeMax=time_max, singleEvents=True,
        orderBy='startTime').execute()
    events = events_result.get('items', [])

    if not events:
        return 'No events for the given date.'

    available_list = []

    for i in range(len(events) + 1):
        # find the start time of the next possible meeting range
        if i == 0:
            start_time = time1
        else:
            start_time = datetime.strptime(events[i-1]['end']['dateTime'][:-6],
                                           '%Y-%m-%dT%H:%M:%S') + buffer_delta

        # find the end time of the next possible meeting range
        if i == len(events):
            end_time = time2
        else:
            end_time = datetime.strptime(events[i]['start']['dateTime'][:-6],
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

    # TODO: store the object in the database according to the database spec document
    return jsonify({'email': email, 'list_id': list_id, 'available_list': available_list})

@app.route('/confirm_form', methods=['GET'])
def confirm_form():
    """
    Confirm if the available list created by submit_form() should be sent to the specified email.
    If not, remove it from the database.
    """
    #list_id = request.headers['list_id']
    #list_confirmed = request.headers['list_confirmed']
    # TODO:
    # if list_confirmed is false, remove the entry corresponding to the list_id from the database
    # if list_confirmed is true, retrieve corresponding entry in the database
    # and send an email to the receiver of the available list containing the list_id

@app.route('/get_available_lists', methods=['GET'])
def get_available_lists():
    """
    Get all available lists from the database given an email.
    """
    #email = request.headers['email']
    # TODO:
    # the email should automatically be sent from the app's end when this request is made
    # (since the user will be logged in under their email, this ensures security)
    # query the database to find all available lists containing this email

@app.route('/choose_meeting_time', methods=['GET'])
def choose_meeting_time():
    """
    Choose a time, and update the calendars of the two meeting members accordingly.
    """
    #code = request.headers['code']
    #list_id = request.headers['list_id']
    #chosen_time = request.headers['chosen_time'] # this must include date
    # TODO:
    # use the list_id to get the corresponding available list from the database
    # keep the duration, location, and creator_code from the entry
    # delete the available list from the database
    # create the event for both people attending the meeting by using the code and the creator_code

if __name__ == '__main__':
    app.run(debug=True)
