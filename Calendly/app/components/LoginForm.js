import React, { Component } from 'react';
import { View } from 'react-native';
import { GoogleSigninButton } from 'react-native-google-signin';
import PropTypes from 'prop-types';

class LoginForm extends Component {
  constructor(props) {
    super();
    console.log('Constructor: currentUser:', props.currentUser);
    if (props.currentUser.id) {
      props.onSuccess();
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps: currentUser:', this.props.currentUser);
    if (nextProps.currentUser.id) {
      this.props.onSuccess();
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <GoogleSigninButton
          style={{ width: 48, height: 48 }}
          size={GoogleSigninButton.Size.Icon}
          color={GoogleSigninButton.Color.Dark}
          onPress={() => this.props.onPress()}
        />
      </View>
    );
  }
}

LoginForm.propTypes = {
  currentUser: PropTypes.object,
  onPress: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default LoginForm;
