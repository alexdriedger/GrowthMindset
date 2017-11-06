import React, { Component } from 'react';
import { View } from 'react-native';
import { hook } from 'cavy';

import ConnectedAvailabilityForm from '../containers/ConnectedAvailabilityForm';

class CreateMeetingScreen extends Component {
  _onSubmit = () => {
    this.props.navigation.navigate('AvailabilityConfirm');
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ConnectedAvailabilityForm onSubmit={this._onSubmit} />
      </View>
    );
  }
}

const TestableCreateMeetingScreen = hook(CreateMeetingScreen);
export default TestableCreateMeetingScreen;
