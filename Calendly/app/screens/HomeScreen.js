import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import * as STYLES from '../common/Styles';
import ConnectedLogOutButton from '../containers/ConnectedLogOutButton';

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
  text: {
    color: 'white',
    fontSize: 26,
  },
});

class HomeScreen extends Component {
  _logout = async () => {
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
          activeOpacity={0.7}
          style={styles.button}
          onPress={() => this.props.navigation.navigate('RespondToMeetings')}
        >
          <Text style={styles.text}>Meetings Yo</Text>
        </TouchableOpacity>
        <ConnectedLogOutButton onPress={() => this._logout()} />
      </View>
    );
  }
}

export default HomeScreen;
