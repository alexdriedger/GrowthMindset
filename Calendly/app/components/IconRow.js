import React, { Component } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  textBox: {
    flex: 1,
    height: 50,
    padding: 8,
    paddingLeft: 40,
    fontSize: 22,
  },
});

class IconRow extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Icon name={this.props.icon} size={30} color="black" />
        <TextInput
          style={styles.textBox}
          onChangeText={this.props.onChange}
          placeholder={this.props.defaultText}
          value={this.props.text}
        />
      </View>
    );
  }
}

IconRow.propTypes = {
  icon: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  defaultText: PropTypes.string.isRequired,
};

export default IconRow;
