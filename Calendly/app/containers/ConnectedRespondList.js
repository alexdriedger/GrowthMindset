import { connect } from 'react-redux';
import AvailabilityList from '../components/AvailabilityList';
import * as actions from '../actions/APIActions';

const mapStateToProps = (state, ownProps) => ({
  times: state.availabilities.byId[ownProps.id].available_list,
  // authToken: state.availabilities.byId[ownProps.id].creator_code,
  authToken: state.users.currentUser,
  listId: state.availabilities.byId[ownProps.id].list_id,
});

// const mapDispatchToProps = dispatch => ({
//   onItemPress: item => console.log(item),
// });

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { authToken, listId, times } = stateProps;
  const { dispatch } = dispatchProps;
  return {
    times,
    isFetching: false,
    onItemPress: (index) => {
      console.log('all times: ', times);
      const time = times[index];
      console.log('time selected: ', time);
      console.log('merge props stuff: ', time, authToken, listId);
      dispatch(actions.confirmMeeting(time, authToken, listId));
      ownProps.onItemPress();
    },
  };
};

const ConnectedRespondList = connect(mapStateToProps, null, mergeProps)(AvailabilityList);
export default ConnectedRespondList;
