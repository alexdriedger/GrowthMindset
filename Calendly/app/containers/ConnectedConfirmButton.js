import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../actions/APIActions';

const styles = StyleSheet.create({
  container: {
    height: 72,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 28,
    fontWeight: 'bold',
  },
});

class ConfirmButton extends Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => this.props.onConfirm(this.props.selectedAvailability)}
      >
        <Text style={styles.text}>Confirm</Text>
      </TouchableOpacity>
    );
  }
}

ConfirmButton.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  selectedAvailability: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  const { selectedAvailability } = state.availabilities;
  return {
    selectedAvailability,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onConfirm: (id) => {
    dispatch(actions.confirmAvailability('true', id));
    ownProps.onConfirm();
  },
});

const ConnectedConfirmButton = connect(mapStateToProps, mapDispatchToProps)(ConfirmButton);
export default ConnectedConfirmButton;
