from urllib import parse  # pylint: disable=no-name-in-module
import psycopg2  # pylint: disable=import-error
import pandas as pd  # pylint: disable=import-error
import json

DATABASE_URL = "postgres://munfzpuxgvkogi:" \
               "094596dafa9e38305a839455b1829555651f126c3aa93b10069f8ac7b664fffd" \
               "@ec2-50-19-105-113.compute-1.amazonaws.com:5432/dd5dl7lpfor3a4"

class Database(object):
    """
    This Database class wraps a SQL database with utility functions
    that are exposed to our main app. This abstraction makes interacting with the Database
    very easy and allows us to change the database if necessary.
    """

    connection = None  # The connection object for the databse
    cursor = None  # The cursor for queries

    def __init__(self, test=False):
        """
        Constructs a new Databse instance, pointing at the postgres databse
        hosted on heroku
        """
        parse.uses_netloc.append("postgres")

        if test:
            # If the database is to be created for testing, use a local instance of postgres
            # This will require setup beforehand to assign a password to the default 'postgres' user
            connection_string = "host='localhost' dbname='postgres' user='postgres' password='postgres'"
            self.connection = psycopg2.connect(connection_string)
            print("Database initialized for testing")
        else:
            # If the database is to be created for deployment, use the url that points to the database
            # hosted on Heroku
            url = parse.urlparse(DATABASE_URL)
            self.connection = psycopg2.connect(
                database=url.path[1:],
                user=url.username,
                password=url.password,
                host=url.hostname,
                port=url.port
            )
            print("Database initialized for deployment")


        self.cursor = self.connection.cursor()

        # Drop and re-create the table if we are in testing mode, otherwise the data should be preserved
        if test:
            self.cursor.execute("DROP TABLE IF EXISTS events;")
            print("Dropped table 'events'")
        self.cursor.execute("CREATE TABLE IF NOT EXISTS events ("
                            "list_id text PRIMARY KEY,"  # A UUID for each event. Generated by clients
                            "available_list text[],"  # An array of available times
                            "creator_code text,"  # An ID for the creator of the event
                            "duration bigint,"  # The duration of the event
                            "email text,"  # The email of the recipient of the event
                            "location text,"  # The location of the event (concat lat/long)
                            "location_name text);")  # The name of the location

    def create_event(self, list_id, creator_code, available_list, duration, email, location, location_name):
        """
        Creates a new event in the database, using the given parameters
        :param list_id: A unique String ID for each event. Generated by clients
        :param creator_code: A string ID for the creator of the event
        :param available_list: An array of strings representing available times
        :param duration: A positive interger representing the duration of the event
        :param email: A string containing the email of the recipient of the event
        :param location: A string containing the latitue and longitude for the event
        :param location_name: A string containing the name of the location for the event
        :return: True if the event was created successfully and False otherwise
        """

        # TODO: Add checks for duplicate entries / duplicate list_ids
        try:
            self.cursor.execute("INSERT INTO events"
                                "(list_id, available_list, creator_code, duration, email, location, location_name) "
                                "VALUES (%s, %s, %s, %s, %s, %s, %s);",
                                (list_id, available_list, creator_code, duration, email, location, location_name))
        except Exception:
            print("Failed to create event with list_id: {}. Event already exists".format(list_id))
            return False

        return True

    def delete_event(self, list_id):
        """
        Deletes the event with the given list_id. This list_id should be unique so no more than 1 event
        should be deleted
        :param list_id: The list_id of the event to delete
        :return: True if the event was deleted successfully and False otherwise
        """

        try:
            # The comma next to list_id needs to be there to form a tuple
            self.cursor.execute("DELETE FROM events "
                                "WHERE list_id = (%s);", (list_id,))
            print("Deleted event")
        except Exception:
            # TODO: Why is this not reached?
            print("Failed to delete the event with list_id: {} from events. Item does not exist".format(list_id))
            return False

        return True

    def get_events_by_email(self, email):
        """
        Returns all events that contain the given email. The events are returned in JSON format.
        :param email: The email of the events to be returned
        :return: A JSON object containing all events with the given email. If no such events are in the databse, a
        JSON string containing an empty list is returned
        """

        # The comma next to list_id needs to be there to form a tuple
        self.cursor.execute("SELECT * FROM events "
                            "WHERE email = (%s);", (email,))
        events = []
        try:
            events = self.cursor.fetchall()
        except Exception:  # normally throws ProgrammingError
            pass

        return json.dumps(events)

    def get_events_by_id(self, list_id):
        """
        Returns the event that contains the given list_id. The events are returned in JSON format.
        :param list_id: The list_id of the event to be returned
        :return: A JSON object the event with the given list_id. If no such event is in the databse, a
        JSON string containing an empty list is returned
        """

        # The comma next to list_id needs to be there to form a tuple
        self.cursor.execute("SELECT * FROM events "
                            "WHERE list_id = (%s);", (list_id,))
        events = []
        try:
            events = self.cursor.fetchall()
        except Exception:  # normally throws ProgrammingError
            pass

        return json.dumps(events)
    
    def getall(self):
        """
        Gets the table for testing purposes
        """
        return pd.read_sql('select * from events;', self.connection)

    def printall(self):
        """
        Prints the table for testing purposes
        """
        my_table = pd.read_sql('select * from events;', self.connection)
        print(my_table)  # pylint: disable=superfluous-parens
        print("\n\n\n\n")
