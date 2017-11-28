import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import App from './App';
import AppSpec from './specs/AppSpec';

class AppWrapper extends Component {
  render() {
    return <App />;
  }
}

AppRegistry.registerComponent('Calendly', () => AppWrapper);
