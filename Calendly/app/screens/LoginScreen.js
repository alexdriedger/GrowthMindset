import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import { NavigationActions } from 'react-navigation';

class LoginScreen extends Component {
  componentDidMount() {
    this._setupGoogleSignin();
  }

  _resetToHome = () => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Home' })],
    });
    this.props.navigation.dispatch(resetAction);
  };

  async _setupGoogleSignin() {
    try {
      await GoogleSignin.hasPlayServices({ autoResolve: true });
      await GoogleSignin.configure({
        scopes: ['https://www.googleapis.com/auth/calendar'],
        webClientId: '559002692075-dd16p5gkema2phtuq4hrt09pbdpnjvb4.apps.googleusercontent.com',
        offlineAccess: true,
      });

      const user = await GoogleSignin.currentUserAsync();
      if (user) {
        this._resetToHome();
        console.log('User already logged in', user);
      }
    } catch (err) {
      console.log('Play services error', err.code, err.message);
    }
  }

  async _signIn() {
    try {
      const user = await GoogleSignin.signIn();
      console.log('Successful login', user);
      this._resetToHome();
    } catch (err) {
      console.log('WRONG SIGNIN', err);
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <GoogleSigninButton
          style={{ width: 48, height: 48 }}
          size={GoogleSigninButton.Size.Icon}
          color={GoogleSigninButton.Color.Dark}
          onPress={() => this._signIn()}
        />
      </View>
    );
  }
}

export default LoginScreen;
