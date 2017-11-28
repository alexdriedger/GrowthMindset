import { connect } from 'react-redux';
import * as actions from '../actions/APIActions';
import AvailabilityForm from '../components/AvailabilityForm';

const mapStateToProps = state => ({
  authCode: state.users.currentUser,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSubmit: (form) => {
    dispatch(actions.fetchAvailabilities(form));
    ownProps.onSubmit();
  },
});

const ConnectedAvailabilityForm = connect(mapStateToProps, mapDispatchToProps)(AvailabilityForm);

export default ConnectedAvailabilityForm;
