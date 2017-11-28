import React, { Component } from 'react';
import { TextInput, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    flex: 1,
  },
  textBox: {
    flex: 1,
    height: 50,
    padding: 8,
    fontSize: 22,
  },
});

class DatePickerRow extends Component {
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

DatePickerRow.propTypes = {
  icon: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  defaultText: PropTypes.string.isRequired,
};

export default DatePickerRow;
