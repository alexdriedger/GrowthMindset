import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Tester, TestHookStore } from 'cavy';

import App from './App';
import AppSpec from './specs/AppSpec';

const testHookStore = new TestHookStore();

class AppWrapper extends Component {
  render() {
    return (
      <Tester specs={[AppSpec]} store={testHookStore} waitTime={1000} startDelay={3000}>
        <App />
      </Tester>
    );
  }
}

AppRegistry.registerComponent('Calendly', () => AppWrapper);
