import { connect } from 'react-redux';
import * as actions from '../actions/UserActions';
import LoginForm from '../components/LoginForm';

const mapStateToProps = (state) => {
  const { currentUser } = state.users || {
    currentUser: undefined,
  };

  return {
    currentUser,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onPress: () => {
    dispatch(actions.logIn());
  },
  onLoginSuccess: () => {
    ownProps.onSuccess();
  },
});

const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(LoginForm);
export default ConnectedLogin;
