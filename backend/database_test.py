import unittest
import sys
sys.path.insert(0, '.')
from database import Database

class TestStringMethods(unittest.TestCase):

    def setUp(self):
        self.db = Database(test=True)

        # Re-create fresh test data for each test
        # This test data covers the following cases
        #     - Blank or empty inputs
        #     - Strings that are both numbers and text
        #     - Positive and negative numerical inputs, both large and small
        #     - Events with duplicate IDs and emails

        self.db.create_event("Lunch at the Nest", "Mathew", ["time1", "time2", "time3"], 90, "lunch@lunch.com", "123.123_321.321", "The Nest")
        self.db.create_event("Study for CPEN", "Alex", ["noon"], 10, "study@study.com", "lat_lon", "MacLeod")
        self.db.create_event("", "Fab", [], -10293857192, "blank@blank.ca", "00.0-11.1", "Sauder")
        self.db.create_event("Parkour Party", "Spencer", ["midnight", "never"], 0, "parkour@parkour.ca", "-170.42_-49.1234", "The Gym")
        self.db.create_event("Another Parkour Party", "Spencer", ["forever"], 123959172, "parkour@parkour.ca", "", "The Gym")

    def test_event_creation(self):
        pass
        # # In addition to adding "real" data in the setUp function, add some test cases for invalid parameters
        # # TODO: Make these values "bad" once the create_event function has more checks
        # result1 = self.db.create_event("Lunch at the Nest", "Mathew", ["time1", "time2", "time3"], 90, "lunch@lunch.com", "123.123_321.321", "The Nest")
        # result2 = self.db.create_event("Study for CPEN", "Alex", ["noon"], 10, "study@study.com", "lat_lon", "MacLeod")
        # result3 = self.db.create_event("", "Fab", [], -10293857192, "blank@blank.ca", "00.0-11.1", "Sauder")
        # self.assertFalse(result1)
        # self.assertFalse(result2)
        # self.assertFalse(result3)

    def test_delete_event(self):
        result1 = self.db.delete_event("Lunch at the Nest")
        self.assertTrue(result1)

        result2 = self.db.delete_event("Lunch at the Nest")
        self.assertTrue(result2)

        result3 = self.db.delete_event("")
        self.assertTrue(result3)

        result4 = self.db.delete_event("")
        self.assertTrue(result4)

        result5 = self.db.delete_event("Another Parkour Party")
        self.assertTrue(result5)

        result6 = self.db.delete_event("Another Parkour Party")
        self.assertTrue(result6)


    def test_get_events_by_email(self):
        result1 = self.db.get_events_by_email("lunch@lunch.com")
        result2 = self.db.get_events_by_email("study@study.com")
        result3 = self.db.get_events_by_email("parkour@parkour.ca")

        expected1 = '[["Lunch at the Nest", ["time1", "time2", "time3"], "Mathew", 90, "lunch@lunch.com", "123.123_321.321", "The Nest"]]'
        expected2 = '[["Study for CPEN", ["noon"], "Alex", 10, "study@study.com", "lat_lon", "MacLeod"]]'
        expected3 = '[["Parkour Party", ["midnight", "never"], "Spencer", 0, "parkour@parkour.ca", "-170.42_-49.1234", "The Gym"], ["Another Parkour Party", ["forever"], "Spencer", 123959172, "parkour@parkour.ca", "", "The Gym"]]'

        self.assertEqual(result1, expected1)
        self.assertEqual(result2, expected2)
        self.assertEqual(result3, expected3)

        # print(result1)
        # print(result2)
        # print(result3)

    def test_get_events_by_id(self):
        result1 = self.db.get_events_by_id("")
        result2 = self.db.get_events_by_id("Parkour Party")
        result3 = self.db.get_events_by_id("Another Parkour Party")

        expected1 = '[["", [], "Fab", -10293857192, "blank@blank.ca", "00.0-11.1", "Sauder"]]'
        expected2 = '[["Parkour Party", ["midnight", "never"], "Spencer", 0, "parkour@parkour.ca", "-170.42_-49.1234", "The Gym"]]'
        expected3 = '[["Another Parkour Party", ["forever"], "Spencer", 123959172, "parkour@parkour.ca", "", "The Gym"]]'

        self.assertEqual(result1, expected1)
        self.assertEqual(result2, expected2)
        self.assertEqual(result3, expected3)

        # print(result1)
        # print(result2)
        # print(result3)

def run_tests():
    unittest.main()

if __name__ == '__main__':
    run_tests()
