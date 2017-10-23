import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import * as STYLES from '../common/Styles';

const styles = StyleSheet.create({
  container: {
    height: 120,
    backgroundColor: STYLES.COLOR_PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
  },
});

class TimeRow extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.text}</Text>
      </View>
    );
  }
}

export default TimeRow;
