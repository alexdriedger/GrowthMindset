import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import * as STYLES from '../common/Styles';
import ConnectedLogOutButton from '../containers/ConnectedLogOutButton';

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
  button: {
    width: 260,
    height: 120,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: STYLES.COLOR_PRIMARY,
  },
  text: {
    color: 'white',
    fontSize: 26,
  },
});

const backgroundImage = require('../assets/background_blue_bubbles.jpg');

class HomeScreen extends Component {
  _logout = async () => {
    this.props.navigation.navigate('Login');
  };

  render() {
    return (
      <Image
        style={styles.backgroundImage}
        source={backgroundImage}
        resizeMode="cover"
        blurRadius={1.5}
      >
        <View style={styles.container}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.button}
            onPress={() => this.props.navigation.navigate('CreateMeeting')}
          >
            <Text style={styles.text}>Create Meeting</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.button}
            onPress={() => this.props.navigation.navigate('RespondToMeetings')}
          >
            <Text style={styles.text}>Pending</Text>
          </TouchableOpacity>
          <ConnectedLogOutButton onPress={() => this._logout()} />
        </View>
      </Image>
    );
  }
}

export default HomeScreen;
