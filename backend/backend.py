from flask import Flask, abort, jsonify, make_response
import json

app = Flask(__name__)

data = {
    "event1":
        {
            'number': 1,
            'name': u'My cool event',
            'short_name': u'MCE'
        },
    "event2":
        {
            'number': 2,
            'name': u'Radical dude',
            'short_name': u'RD'
        }
}

@app.route('/cal/api/v1.0/data', methods=['GET'])
def get_test_data():
    return jsonify({'data': data})

if __name__ == '__main__':
    app.run(debug=True)
