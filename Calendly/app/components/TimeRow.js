import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 120,
    backgroundColor: '#0C6991',
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
