import React, { Component } from 'react';
import { View, Text } from 'react-native';
import ConnectedMeetingList from '../containers/ConnectedMeetingList';

class RespondToMeetingsScreen extends Component {
  _onPress = (id) => {
    this.props.navigation.navigate('RespondPickTime', { id });
  };

  render() {
    return <ConnectedMeetingList onItemPress={id => this._onPress(id)} />;
  }
}

export default RespondToMeetingsScreen;
