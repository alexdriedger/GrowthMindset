from __future__ import print_function
import httplib2
import os

from apiclient import discovery
from oauth2client import client
from oauth2client import tools
from oauth2client.file import Storage
from flask import Flask, jsonify

from datetime import datetime
from datetime import timedelta

#try:
#    import argparse
#    flags = argparse.ArgumentParser(parents=[tools.argparser]).parse_args()
#except ImportError:
#    flags = None
flags = None


# If modifying these scopes, delete your previously saved credentials
# at ~/.credentials/calendar-python-quickstart.json
SCOPES = 'https://www.googleapis.com/auth/calendar.readonly'
CLIENT_SECRET_FILE = 'client_secret.json'
APPLICATION_NAME = 'Google Calendar API Python Quickstart'

app = Flask(__name__)

def get_credentials():
    """Gets valid user credentials from storage.

    If nothing has been stored, or if the stored credentials are invalid,
    the OAuth2 flow is completed to obtain the new credentials.  
    Returns:
        Credentials, the obtained credential.
    """
    dir_name = os.path.dirname(os.path.realpath(__file__))
    credential_path = os.path.join(dir_name, 'calendar-python-quickstart.json')

    '''
    home_dir = os.path.expanduser('~')
    credential_dir = os.path.join(home_dir, '.credentials')
    if not os.path.exists(credential_dir):
        os.makedirs(credential_dir)
    credential_path = os.path.join(credential_dir,
                                   'calendar-python-quickstart.json')
    '''

    store = Storage(credential_path)
    credentials = store.get()
    if not credentials or credentials.invalid:
        flow = client.flow_from_clientsecrets(CLIENT_SECRET_FILE, SCOPES)
        flow.user_agent = APPLICATION_NAME
        if flags:
            credentials = tools.run_flow(flow, store, flags)
        else: # Needed only for compatibility with Python 2.6
            credentials = tools.run(flow, store)
        print('Storing credentials to ' + credential_path)
    return credentials

@app.route('/helloworld', methods=['GET'])
def get_test_data():
    return "Hello world!"

# assumed date format is YYYY-MM-DD
@app.route('/events/<date>')
def get_events_for_date(date):
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

    '''
    availablelist = ""
    availablelist += timeMin
    for event in events:
        availablelist += " - " + event['start']['dateTime']
        availablelist += "<br>" + event['end']['dateTime']
    availablelist += " - " + timeMax
    return availablelist
    '''

    '''
    eventlist = ""
    for event in events:
        start = event['start']['dateTime']
        eventlist += start + " " + event['summary'] + "<br>"
    return eventlist
    '''

@app.route('/submit_form', methods=['POST'])
def submit_form():
    location = request.form['location']
    duration = request.form['duration']
    date_range_start = request.form['date_range_start']
    date_range_end = request.form['date_range_end']
    buffer_before = request.form['buffer_before']
    buffer_after = request.form['buffer_after']
    # TODO:
    # use this API call to find all events from timeMin=date_range_start to timeMax=date_range_end:
    # https://developers.google.com/google-apps/calendar/v3/reference/events/list
    # with the resulting list, sort through the events and figure out times that fit the duration and buffer lengths
    # store the created list in a database (possibly by doing this https://docs.python.org/3/library/json.html)
    # create a mysql database to store the availability in
    # do more things..........


credentials = get_credentials()
http = credentials.authorize(httplib2.Http())
service = discovery.build('calendar', 'v3', http=http)

if __name__ == '__main__':
    app.run(debug=True)
