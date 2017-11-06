import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { hook } from 'cavy';

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
  text: {
    color: 'white',
    fontSize: 26,
  },
});

class HomeScreen extends Component {
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
      </View>
    );
  }
}

const TestableHomeScreen = hook(HomeScreen);
export default TestableHomeScreen;
