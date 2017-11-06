import coverage
import database_test
import app_test
import unittest

# Start tracking code coverage
cov = coverage.Coverage()
cov.start()

# Run backend tests
database_suite = unittest.TestLoader().loadTestsFromModule(database_test)
unittest.TextTestRunner(verbosity=2).run(database_suite)

app_suite = unittest.TestLoader().loadTestsFromModule(app_test)
unittest.TextTestRunner(verbosity=2).run(app_suite)

# Stop and report on code coverage
cov.stop()
cov.save()

# The source files that we care about coverage
source_files = ['database.py', 'app.py']
print(cov.report(source_files, show_missing=True))