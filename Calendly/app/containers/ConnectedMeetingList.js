import { connect } from 'react-redux';
import * as actions from '../actions/APIActions';
import MeetingList from '../components/MeetingList';

const mapStateToProps = (state) => {
  const meetingId = state.availabilities.respondTo;
  const respondTo = state.availabilities.allIds
    .filter(id => meetingId.includes(id))
    .map(id => state.availabilities.byId[id]);
  return {
    authToken: state.users.currentUser,
    data: respondTo,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchMeetings: (authCode) => {
    dispatch(actions.fetchRespondingMeetings(authCode));
  },
  onItemPress: (id) => {
    ownProps.onItemPress(id);
  },
});

const ConnectedMeetingList = connect(mapStateToProps, mapDispatchToProps)(MeetingList);
export default ConnectedMeetingList;
