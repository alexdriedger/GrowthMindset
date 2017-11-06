"""
Tests for the server API
Note that these tests assume app.py is already running locally
"""
import ast
import unittest
from subprocess import check_output
import subprocess


class TestServerAPI(unittest.TestCase):
    # TODO: empty the database before starting the tests
    def setUp(self):
        pass

    def test_hello_world(self):
        """
        Confirm the API is running locally
        """
        resp = check_output(["curl", "localhost:5000/helloworld"], stderr=subprocess.PIPE)
        self.assertEqual(resp.decode(), "Hello world!")

    def test_login1(self):
        """
        Ensure a valid URL is returned from the API call
        """
        resp = check_output(["curl", "localhost:5000/login1"], stderr=subprocess.PIPE)
        self.assertEqual(resp.decode()[:36], "https://accounts.google.com/o/oauth2")

    def test_login2(self):
        """
        This test involves going to the URL returned from login1, logging in, retreiving the code, and
        then passing that code into this API call as a header, thus it cannot be tested using unittest
        """
        pass

    # TODO: add tests for confirm_form once it has been completed
    # TODO: add tests for choose_meeting_time once it has been completed
    def test_database(self):
        """
        Confirm the API is running locally
        """
        # Ensure the list is empty to begin with. Check this by creating a local list that should look identical
        lists = {}
        available_lists = []
        lists["available_lists"] = str(available_lists)
        resp = check_output(["curl", "-H", "email:spencerspenst@gmail.com", "localhost:5000/get_available_lists"], stderr=subprocess.PIPE)
        self.assertEqual(ast.literal_eval(resp.decode()), lists)

        # Submit a form, which will add an available list to the database
        resp = check_output(["curl", "-H", "duration:30",
                             "-H", "date_range_start:2017-10-20",
                             "-H", "date_range_end:2017-10-21",
                             "-H", "meeting_buffer:15",
                             "-H", "earliest_meeting_time:09:00",
                             "-H", "latest_meeting_time:20:00",
                             "-H", "email:spencerspenst@gmail.com",
                             "localhost:5000/submit_form"], stderr=subprocess.PIPE)
        #TODO: do some test on the data that is received from this request

        # Ensure that the database contains one available list
        resp = check_output(["curl", "-H", "email:spencerspenst@gmail.com", "localhost:5000/get_available_lists"], stderr=subprocess.PIPE)
        # The following line decodes the response byte array, then converts it to a dictionary, retreives
        # the "available_lists" entry of the dictionary, and converts the resulting string into a list
        self.assertEqual(len(ast.literal_eval(ast.literal_eval(resp.decode())["available_lists"])), 1)

if __name__ == '__main__':
    unittest.main()
