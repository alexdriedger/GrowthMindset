import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { hook } from 'cavy';
import { GoogleSignin } from 'react-native-google-signin';

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
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    console.log('Signed out');
    this.props.navigation.navigate('Login');
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          ref={this.props.generateTestHook('HomeScreen.CreateMeeting')}
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

const TestableHomeScreen = hook(HomeScreen);
export default TestableHomeScreen;
