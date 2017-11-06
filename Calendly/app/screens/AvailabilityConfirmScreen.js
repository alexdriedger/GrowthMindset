import React, { Component } from 'react';
import { View } from 'react-native';
import { hook } from 'cavy';

import ConnectedAvailabilityList from '../containers/ConnectedAvailabilityList';

class AvailabilityConfirmScreen extends Component {
  render() {
    return (
      <View ref={this.props.generateTestHook('AvailabilityConfirmScreen')} style={{ flex: 1 }}>
        <ConnectedAvailabilityList />
      </View>
    );
  }
}

const TestableAvailabilityConfirmScreen = hook(AvailabilityConfirmScreen);
export default TestableAvailabilityConfirmScreen;
