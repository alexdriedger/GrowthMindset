import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import * as STYLES from '../common/Styles';

const styles = StyleSheet.create({
  container: {
    height: 120,
    backgroundColor: STYLES.COLOR_SECONDARY,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0,
    borderWidth: 20,
    borderColor: 'white',
    // overflow: 'hidden',
    flexDirection: 'column',
  },
  container2: {
    height: 80,
    backgroundColor: STYLES.COLOR_SECONDARY,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  text1: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text2: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
  },
});

class TimeRow extends Component {
  render() {
    return (
      // <View style={styles.container}>
      <TouchableOpacity onPress={() => this.props.onPress()}>
        <View style={styles.container}>
          <Text style={styles.text1}>{this.props.text1}</Text>
          <Text style={styles.text2}>{this.props.text2}</Text>
        </View>
      </TouchableOpacity>
      // </View>
    );
  }
}

TimeRow.propTypes = {
  onPress: PropTypes.func.isRequired,
  text1: PropTypes.string.isRequired,
  text2: PropTypes.string.isRequired,
};

export default TimeRow;
