import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import * as actions from '../actions/UserActions';

const styles = StyleSheet.create({
  logoutButton: {
    width: 260,
    height: 60,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logoutButtonText: {
    color: 'black',
    fontSize: 26,
  },
});

class ConnectedLogOutButton extends Component {
  render() {
    return (
      <TouchableOpacity style={styles.logoutButton} onPress={this.props.onPress}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    );
  }
}

ConnectedLogOutButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onPress: () => {
    dispatch(actions.clearUsers());
    ownProps.onPress();
  },
});

export default connect(undefined, mapDispatchToProps)(ConnectedLogOutButton);
