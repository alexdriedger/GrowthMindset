import React, { Component } from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: 'red',
  },
  textBox: {
    flex: 1,
    height: 50,
    padding: 8,
    fontSize: 22,
  },
});

class PickerRow extends Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPush}>
        <View style={styles.container}>
          <Icon name={this.props.icon} size={30} color="black" />
          <TextInput
            style={styles.textBox}
            onChangeText={this.props.onChange}
            placeholder={this.props.defaultText}
            value={this.props.text}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

PickerRow.propTypes = {
  icon: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onPush: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  defaultText: PropTypes.string.isRequired,
};

export default PickerRow;
