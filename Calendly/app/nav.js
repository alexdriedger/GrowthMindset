import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import * as STYLES from './common/Styles';

// Screens
import HomeScreen from './screens/HomeScreen';
import AvailabilityConfirmScreen from './screens/AvailabilityConfirmScreen';
import CreateMeetingScreen from './screens/CreateMeetingScreen';

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
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: 'rendezVous',
        headerRight: null,
      },
    },
    CreateMeeting: {
      screen: CreateMeetingScreen,
      navigationOptions: {
        title: 'Create Meeting',
      },
    },
    AvailabilityConfirm: {
      screen: AvailabilityConfirmScreen,
      navigationOptions: {
        title: 'Confirm',
      },
    },
  },
  {
    navigationOptions: {
      initialRouteName: 'Home',
      headerStyle: styles.headerStyle,
      headerTitleStyle: styles.headerText,
      headerBackTitleStyle: styles.headerBack,
      headerTintColor: 'white',
      headerRight: <View />,
    },
  },
);
