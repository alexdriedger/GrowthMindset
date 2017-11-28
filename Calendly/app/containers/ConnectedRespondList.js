import { connect } from 'react-redux';
import AvailabilityList from '../components/AvailabilityList';

const mapStateToProps = (state, ownProps) => ({
  times: state.availabilities.byId[ownProps.id].available_list,
  authToken: state.availabilities.byId[ownProps.id].creator_code,
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
    ...ownProps,
    onItemPress: (index) => {
      const time = times[index];
      console.log(time, authToken, listId);
    },
  };
};

const ConnectedRespondList = connect(mapStateToProps, null, mergeProps)(AvailabilityList);
export default ConnectedRespondList;
