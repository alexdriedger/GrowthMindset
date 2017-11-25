import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { GoogleSignin } from 'react-native-google-signin';
import { connect } from 'react-redux';

import { logOut } from '../actions/UserActions';
import * as STYLES from '../common/Styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 260,
    height: 120,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: STYLES.COLOR_PRIMARY,
  },
  logoutButton: {
    width: 260,
    height: 60,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    color: 'white',
    fontSize: 26,
  },
  logoutButtonText: {
    color: 'black',
    fontSize: 26,
  },
});

class HomeScreen extends Component {
  _logout = async () => {
    this.props.onLogOut();
    this.props.navigation.navigate('Login');
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.button}
          onPress={() => this.props.navigation.navigate('CreateMeeting')}
        >
          <Text style={styles.text}>Create Meeting</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.logoutButton}
          activeOpacity={0.7}
          onPress={() => this._logout()}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onLogOut: () => dispatch(logOut()),
});

const ConnectedHomeScreen = connect(undefined, mapDispatchToProps)(HomeScreen);
export default ConnectedHomeScreen;
