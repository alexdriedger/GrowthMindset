import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { NavigationActions } from 'react-navigation';
import ConnectedRespondList from '../containers/ConnectedRespondList';

class RespondPickTimeScreen extends Component {
  _resetToHome = () => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Home' })],
    });
    this.props.navigation.dispatch(resetAction);
  };

  render() {
    console.log('id', this.props.navigation.state.params.id);
    return (
      <ConnectedRespondList
        id={this.props.navigation.state.params.id}
        onItemPress={() => this._resetToHome()}
      />
    );
  }
}

export default RespondPickTimeScreen;
