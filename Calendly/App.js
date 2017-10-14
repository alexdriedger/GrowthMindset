import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import AvailabilityForm from './app/components/AvailabilityForm';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <AvailabilityForm />
      </View>
    );
  }
}
