import { connect } from 'react-redux';
import * as actions from '../actions/APIActions';
import MeetingList from '../components/MeetingList';

const mapStateToProps = state => ({
  authToken: state.users.currentUser,
});

const mapDispatchToProps = dispatch => ({
  fetchMeetings: (authCode) => {
    dispatch(actions.fetchRespondingMeetings(authCode));
  },
});

const ConnectedMeetingList = connect(mapStateToProps, mapDispatchToProps)(MeetingList);
export default ConnectedMeetingList;
