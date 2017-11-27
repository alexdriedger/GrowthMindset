import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Linking, TextInput, TouchableOpacity } from 'react-native';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { connect } from 'react-redux';
import * as actions from '../actions/UserActions';

import * as STYLES from '../common/Styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 48,
  },
  backgroundImage: {
    flex: 1,
    height: undefined,
    width: undefined,
    alignSelf: 'stretch',
  },
  logoContainer: {
    flex: 2,
  },
  textContainer: {
    flex: 1,
    paddingTop: 32,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  logo: {
    height: 200,
    width: 200,
  },
  titleText: {
    fontSize: 36,
    color: 'white',
    textAlign: 'center',
  },
  separator: {
    height: 1,
    width: 100,
    backgroundColor: 'lightgrey',
  },
  subText: {
    fontSize: 16,
    color: 'lightgrey',
    textAlign: 'center',
  },
  textInput: {
    backgroundColor: 'white',
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
    width: 312,
    height: 56,
  },
});

const logo = require('../assets/logo_white.png');
const backgroundImage = require('../assets/background_blue_bubbles.jpg');

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signInPressed: false,
      authCode: '',
      error: '',
    };
  }

  _login2 = async () => {
    try {
      const response = await fetch('https://growthmindset-calendly.herokuapp.com/login2', {
        headers: {
          code: this.state.authCode,
        },
      });
      console.log(response);
      if (response._bodyText !== 'User successfully authenticated!') {
        this.setState({ error: 'Code is not valid!' });
        return false;
      }
      return true;
    } catch (err) {
      this.setState({ error: 'Code is not valid!' });
    }
    return false;
  };

  _resetToHome = () => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Home' })],
    });
    this.props.navigation.dispatch(resetAction);
  };

  _linkLogin = async () => {
    try {
      console.log('Calling login1');
      const response = await fetch('https://growthmindset-calendly.herokuapp.com/login1');
      const url = response._bodyText;
      await Linking.openURL(url);
      this.setState({ signInPressed: true, error: '' });
    } catch (err) {
      this.setState({ error: 'Oops, something went wrong!' });
    }
  };

  _renderLoginButton() {
    if (this.state.signInPressed) {
      return (
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            style={styles.textInput}
            onChangeText={authCode => this.setState({ authCode })}
            value={this.state.authCode}
            multiline={false}
            underlineColorAndroid="transparent"
            placeholder="Paste code here!"
            textAlign="center"
          />
          <TouchableOpacity
            onPress={() => {
              if (this._login2()) {
                this.props.onSubmit(this.state.authCode);
                this._resetToHome();
              }
            }}
          >
            <View
              style={{
                height: 56,
                width: 56,
                borderTopRightRadius: 3,
                borderBottomRightRadius: 3,
                backgroundColor: STYLES.COLOR_PRIMARY,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Icon size={40} name="check-circle" color="white" />
            </View>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View style={{ flexDirection: 'column' }}>
        <GoogleSigninButton
          style={{ width: 312, height: 56 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          onPress={() => this._linkLogin()}
        />
        <Text style={[styles.subText, { color: 'white' }]}>{this.state.error}</Text>
      </View>
    );
  }

  render() {
    return (
      <Image
        style={styles.backgroundImage}
        source={backgroundImage}
        resizeMode="cover"
        blurRadius={1.5}
      >
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={logo} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.titleText}>RendezVous</Text>
            <View style={styles.separator} />
            <Text style={styles.subText}>
              Never play phone tag again{'\n'}Login with your Google account to start!
            </Text>
          </View>
          <View style={styles.buttonContainer}>{this._renderLoginButton()}</View>
        </View>
      </Image>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onSubmit: (code) => {
    dispatch(actions.setUser(code));
  },
});

const ConnectedLoginScreen = connect(undefined, mapDispatchToProps)(LoginScreen);
export default ConnectedLoginScreen;
