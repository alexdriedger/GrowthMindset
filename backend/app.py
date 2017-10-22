# TODO: inconsistent camel case vs underscores

from __future__ import print_function
import httplib2
import uuid

from googleapiclient import discovery
from oauth2client import client
from oauth2client.contrib.multiprocess_file_storage import MultiprocessFileStorage
from flask import Flask, jsonify, request
from datetime import datetime
from datetime import timedelta

SCOPES = 'https://www.googleapis.com/auth/calendar.readonly'
REDIRECT_URI = 'urn:ietf:wg:oauth:2.0:oob'
CLIENT_SECRET_FILE = 'client_secret.json'
APPLICATION_NAME = 'Google Calendar API Python Quickstart'

app = Flask(__name__)

# Hello world function to test if the API is up and running.
@app.route('/helloworld', methods=['GET'])
def helloworld():
    return "Hello world!"

# The first step of the OAuth 2.0 login process.
# Returns a URL that the client has to go to.
@app.route('/login1')
def login1():
    flow = client.flow_from_clientsecrets(CLIENT_SECRET_FILE, scope=SCOPES, redirect_uri=REDIRECT_URI)
    flow.user_agent = APPLICATION_NAME
    return flow.step1_get_authorize_url()

# The second step of the OAuth 2.0 login process.
# Once the client has accessed and retrieved the code from the first step of the login process,
# the client passes the code to this API. Returns a Credentials object.
@app.route('/login2/<path:code>')
def login2(code):
    flow = client.flow_from_clientsecrets(CLIENT_SECRET_FILE, scope=SCOPES, redirect_uri=REDIRECT_URI)
    flow.user_agent = APPLICATION_NAME
    credentials = flow.step2_exchange(code)
    storage = MultiprocessFileStorage('credentials', code)
    storage.put(credentials)
    return code

# Get all available times during a day by passing in the current date.
# The assumed date format is YYYY-MM-DD.
# The code returned from login2 must be passed as the 'code' header.
@app.route('/events/<date>')
def get_events_for_date(date):
    #code = request.headers['code']
    #code = '4/MPYcvsakUWK5elKNUlc9ED9pLDwPLAFIpxkITyJGm-k'
    code = '4/27zFdVQkYlMS0fwT_mRbb6jFmCyquND3MtjoKQhGeRg'
    storage = MultiprocessFileStorage('credentials', code)
    credentials = storage.get()
    http = credentials.authorize(httplib2.Http())
    service = discovery.build('calendar', 'v3', http=http)

    time1 = datetime.strptime(date, '%Y-%m-%d')
    time2 = time1 + timedelta(days=1)
    timeMin = time1.isoformat() + '-07:00'
    timeMax = time2.isoformat() + '-07:00'

    eventsResult = service.events().list(
        calendarId='primary', timeMin=timeMin, timeMax=timeMax, singleEvents=True,
        orderBy='startTime').execute()
    events = eventsResult.get('items', [])

    if not events:
        return 'No events for the given date.'

    availablelist = []
    availablelist.append(timeMin)
    for event in events:
        availablelist.append(event['start']['dateTime'])
        availablelist.append(event['end']['dateTime'])
    availablelist.append(timeMax)
    return jsonify({'availablelist': availablelist})

# TODO: change this to a POST method
@app.route('/submit_form', methods=['GET'])
def submit_form():
    # TODO: use location somehow
    #location = request.headers['location']
    email = request.headers['email']
    duration = int(request.headers['duration'])
    date_range_start = request.headers['date_range_start']
    date_range_end = request.headers['date_range_end']
    meeting_buffer = int(request.headers['meeting_buffer'])
    earliest_meeting_time = request.headers['earliest_meeting_time']
    latest_meeting_time = request.headers['latest_meeting_time']

    # TODO: remove these temporary testing values
    '''
    duration = 30
    date_range_start = "2017-10-20"
    date_range_end = "2017-10-21"
    meeting_buffer = 15
    earliest_meeting_time = "09:00"
    latest_meeting_time = "20:00"
    '''

    buffer_delta = timedelta(minutes=meeting_buffer)
    earliest_time = datetime.strptime(earliest_meeting_time, '%H:%M').time()
    latest_time = datetime.strptime(latest_meeting_time, '%H:%M').time()
    
    # for now just use this code to access Rendez's calendar
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
    timeMin = time1.isoformat() + '-07:00'
    timeMax = time2.isoformat() + '-07:00'

    eventsResult = service.events().list(
        calendarId='primary', timeMin=timeMin, timeMax=timeMax, singleEvents=True,
        orderBy='startTime').execute()
    events = eventsResult.get('items', [])

    if not events:
        return 'No events for the given date.'

    available_list = []

    for i in range(len(events) + 1):
        # find the start time of the next possible meeting range
        if i == 0:
            start_time = time1
        else:
            start_time = datetime.strptime(events[i-1]['end']['dateTime'][:-6], '%Y-%m-%dT%H:%M:%S') + buffer_delta

        # find the end time of the next possible meeting range
        if i == len(events):
            end_time = time2
        else:
            end_time = datetime.strptime(events[i]['start']['dateTime'][:-6], '%Y-%m-%dT%H:%M:%S') - buffer_delta

        # calculate meeting minutes
        delta = end_time - start_time
        minutes = delta.total_seconds() / 60

        # loop through the space for meetings (in case there is more than one spot for a meeting between events)
        # TODO: this doesn't account for the "earliest_time" specified
        # (i.e. there is a chance the first event doesn't start at the specified earliest time even if the meeting time works)
        for j in range(0, int(minutes/duration)):
            meeting_time = start_time + timedelta(minutes=j * duration)
            if (meeting_time.time() >= earliest_time and
                (meeting_time + timedelta(duration)).time() <= latest_time):
                available_list.append(meeting_time)

    list_id = str(uuid.uuid4())
    
    # TODO: store the jsoinfied object in the database before returning it
    #store this: jsonify({'creator_code': code, 'list_id': list_id, 'email': email, 'available_list': available_list})
    return jsonify({'email': email, 'list_id': list_id, 'available_list': available_list})

@app.route('/confirm_form', methods=['GET'])
def confirm_form():
    email = request.headers['email'] # TODO: this can also just be taken from the database
    list_id = request.headers['list_id']
    list_confirmed = request.headers['list_confirmed']
    # TODO:
    # if list_confirmed is false, remove the entry corresponding to the list_id from the database
    # if list_confirmed is true, send an email to the receiver of the available list containing the list_id

@app.route('/get_available_lists', methods=['GET'])
def get_available_lists():
    email = request.headers['email']
    # TODO:
    # the email should automatically be sent from the app's end when this request is made
    # (since the user will be logged in under their email, this ensures security when accessing available lists)
    # query the database to find all available lists containing this email

@app.route('/choose_meeting_time', methods=['GET'])
def choose_meeting_time():
    code = request.headers['code']
    list_id = request.headers['list_id']
    chosen_time = request.headers['chosen_time'] # this must include date
    duration = request.headers['duration']
    location = request.headers['location']
    # TODO:
    # use the list_id to get the corresponding available list from the database
    # keep the duration, location, and creator_code from the entry
    # delete the available list from the database
    # create the event for both people attending the meeting by using the code and the creator_code

if __name__ == '__main__':
    app.run(debug=True)
