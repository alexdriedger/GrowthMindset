from flask import Flask, jsonify
import json
import os

app = Flask(__name__)

# Gets the filepath to the database file. Always at the same level of this file,
# no matter where it's called from
database_file = os.path.realpath(os.path.join(__file__, os.pardir)) + "/database.json"
# This is a test comment
with open(database_file) as database:
    data = json.load(database);

@app.route('/cal/api/v1.0/data', methods=['GET'])
def get_test_data():
    return jsonify({'data': data})

if __name__ == '__main__':
    app.run(debug=True)
