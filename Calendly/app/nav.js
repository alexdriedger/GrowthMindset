import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import * as STYLES from './common/Styles';

// Screens
import HomeScreen from './screens/HomeScreen';
import AvailabilityConfirmScreen from './screens/AvailabilityConfirmScreen';
import CreateMeetingScreen from './screens/CreateMeetingScreen';
import LoginScreen from './screens/LoginScreen';
import RespondToMeetingsScreen from './screens/RespondToMeetingsScreen';
import RespondPickTimeScreen from './screens/RespondPickTimeScreen';

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: STYLES.COLOR_PRIMARY,
  },
  headerText: {
    color: 'white',
    alignSelf: 'center',
  },
  headerBack: {
    color: 'white',
  },
});

// eslint-disable-next-line
export const RootStack = StackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        header: null,
      },
    },
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        // title: 'rendezVous',
        // headerRight: null,
        header: null,
      },
    },
    CreateMeeting: {
      screen: CreateMeetingScreen,
      navigationOptions: {
        title: '',
        headerStyle: [
          styles.headerStyle,
          {
            elevation: 0,
            shadowOpacity: 0,
          },
        ],
      },
    },
    AvailabilityConfirm: {
      screen: AvailabilityConfirmScreen,
      navigationOptions: {
        title: 'Confirm',
      },
    },
    RespondToMeetings: {
      screen: RespondToMeetingsScreen,
      navigationOptions: {
        title: 'My Meetings',
      },
    },
    RespondPickTime: {
      screen: RespondPickTimeScreen,
      navigationOptions: {
        title: 'Pick A Time',
      },
    },
  },
  {
    initialRouteName: 'Login',
    navigationOptions: {
      headerStyle: styles.headerStyle,
      headerTitleStyle: styles.headerText,
      headerBackTitleStyle: styles.headerBack,
      headerTintColor: 'white',
      headerRight: <View />,
    },
  },
);
