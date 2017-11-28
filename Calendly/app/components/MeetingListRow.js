import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import * as STYLES from '../common/Styles';

const styles = StyleSheet.create({
  container: {
    marginRight: 40,
  },
  button: {
    backgroundColor: STYLES.COLOR_SECONDARY,
  },
});

class MeetingListRow extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
          <View>
            <Text>{this.props.lineOne}</Text>
            <Text>{this.props.lineTwo}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

MeetingListRow.propTypes = {
  lineOne: PropTypes.string.isRequired,
  lineTwo: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default MeetingListRow;
