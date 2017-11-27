import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

class MeetingList extends Component {
  render() {
    return (
      <View>
        <TouchableOpacity onPress={() => this.props.fetchMeetings(this.props.authToken)}>
          <Text>Press Me!</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default MeetingList;
