import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';

import ConnectedLogin from '../containers/ConnectedLogin';

class LoginScreen extends Component {
  _resetToHome = () => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Home' })],
    });
    this.props.navigation.dispatch(resetAction);
  };

  render() {
    return <ConnectedLogin onSuccess={this._resetToHome} />;
  }
}

export default LoginScreen;
