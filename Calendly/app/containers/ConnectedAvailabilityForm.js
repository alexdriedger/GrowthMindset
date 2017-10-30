import { connect } from 'react-redux';
import * as actions from '../actions/APIActions';
import AvailabilityForm from '../components/AvailabilityForm';

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSubmit: (form) => {
    dispatch(actions.fetchAvailabilities(form));
    ownProps.onSubmit();
  },
});

const ConnectedAvailabilityForm = connect(undefined, mapDispatchToProps)(AvailabilityForm);

export default ConnectedAvailabilityForm;
