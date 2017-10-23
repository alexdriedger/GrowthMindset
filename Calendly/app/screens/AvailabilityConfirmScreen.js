import React, { Component } from 'react';
import { View } from 'react-native';

import ConnectedAvailabilityList from '../containers/ConnectedAvailabilityList';

class AvailabilityConfirmScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ConnectedAvailabilityList />
      </View>
    );
  }
}

export default AvailabilityConfirmScreen;
