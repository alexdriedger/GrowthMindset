import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import * as STYLES from '../common/Styles';

const styles = StyleSheet.create({
  container: {
    height: 80,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 5,
    borderColor: STYLES.COLOR_PRIMARY,
    overflow: 'hidden',
  },
  text: {
    color: '#222222',
    fontSize: 28,
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
