import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from './app/reducers/rootReducer';

import ConnectedAvailabilityForm from './app/containers/ConnectedAvailabilityForm';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <ConnectedAvailabilityForm />
        </View>
      </Provider>
    );
  }
}

export default App;
