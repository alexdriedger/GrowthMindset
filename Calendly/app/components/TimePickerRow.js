import React, { Component } from 'react';
import { TextInput, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import * as STYLES from '../common/Styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textBox: {
    flex: 1,
    height: 50,
    fontSize: 22,
    color: 'black',
  },
});

class TimePickerRow extends Component {
  render() {
    return (
      <TouchableOpacity onPress={() => this.props.onPress()} activeOpacity={0.7}>
        <View style={styles.container}>
          <Text
            style={styles.textBox}
            onChangeText={this.props.onChange}
            placeholder={this.props.defaultText}
          >
            {this.props.text}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

TimePickerRow.propTypes = {
  icon: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  defaultText: PropTypes.string.isRequired,
};

export default TimePickerRow;
