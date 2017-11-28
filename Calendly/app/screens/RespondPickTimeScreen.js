import React, { Component } from 'react';
import { View, Text } from 'react-native';
import ConnectedRespondList from '../containers/ConnectedRespondList';

class RespondPickTimeScreen extends Component {
  render() {
    console.log('id', this.props.navigation.state.params.id);
    return <ConnectedRespondList id={this.props.navigation.state.params.id} />;
  }
}

export default RespondPickTimeScreen;
