import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { NavigationActions } from 'react-navigation';

import ConnectedAvailabilityList from '../containers/ConnectedAvailabilityList';
import ConnectedConfirmButton from '../containers/ConnectedConfirmButton';

class AvailabilityConfirmScreen extends Component {
  _resetToHome = () => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Home' })],
    });
    this.props.navigation.dispatch(resetAction);
  };

  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <ConnectedAvailabilityList />
        <ConnectedConfirmButton onConfirm={() => this._resetToHome()} />
      </ScrollView>
    );
  }
}

export default AvailabilityConfirmScreen;
