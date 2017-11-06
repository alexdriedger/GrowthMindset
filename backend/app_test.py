import ast
import os
import sys
sys.path.insert(0, '.')
import app
import unittest
import tempfile

class FlaskrTestCase(unittest.TestCase):

    def setUp(self):
        self.db_fd, app.app.config['DATABASE'] = tempfile.mkstemp()
        app.app.testing = True
        self.app = app.app.test_client()
#        with app.app.app_context():
#            app.init_db()

    def tearDown(self):
        os.close(self.db_fd)
        os.unlink(app.app.config['DATABASE'])
    
    def test_hello_world(self):
        """
        Confirm the API is running locally
        """
        r = self.app.get("/helloworld")
        self.assertEqual(r.data.decode(), "Hello world!")

    def test_login1(self):
        """
        Ensure a valid URL is returned from the API call
        """
        r = self.app.get("/login1")
        self.assertEqual(r.data.decode()[:36], "https://accounts.google.com/o/oauth2")

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
        email = "spencerspenst@gmail.com"
        
        # Ensure the list is empty to begin with. Check this by creating a local list that should look identical
        lists = {}
        available_lists = []
        lists["available_lists"] = str(available_lists)
        r = self.app.get("/get_available_lists", headers={
            "email":email})
        self.assertEqual(ast.literal_eval(r.data.decode()), lists)

        # Submit a form, which will add an available list to the database
        r = self.app.get("/submit_form", headers={
            "duration":"30",
            "date_range_start":"2017-10-20",
            "date_range_end":"2017-10-21",
            "meeting_buffer":"15",
            "earliest_meeting_time":"09:00",
            "latest_meeting_time":"20:00",
            "email":email})
        
        # Check if the available_list contains 14 entries, and that the email is as specified
        self.assertEqual(len(ast.literal_eval(r.data.decode())["available_list"]), 14)
        self.assertEqual(ast.literal_eval(r.data.decode())["email"], email)

        # Ensure that the database contains one available list
        r = self.app.get("/get_available_lists", headers={
            "email":email})
        
        # The following line decodes the response byte array, then converts it to a dictionary, retreives
        # the "available_lists" entry of the dictionary, and converts the resulting string into a list
        self.assertEqual(len(ast.literal_eval(ast.literal_eval(r.data.decode())["available_lists"])), 1)

if __name__ == '__main__':
    unittest.main()
