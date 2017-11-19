import { connect } from 'react-redux';
import AvailabilityList from '../components/AvailabilityList';

const mapStateToProps = (state) => {
  const { isFetching, selectedAvailability, byId } = state.availabilities || {
    isFetching: true,
  };

  const times =
    typeof selectedAvailability !== 'undefined' ? byId[selectedAvailability].availability_list : [];

  const { duration } = state.availabilities.duration || {
    duration: 0,
  };
  return {
    isFetching,
    times,
    duration,
  };
};

const ConnectedAvailabilityList = connect(mapStateToProps)(AvailabilityList);

export default ConnectedAvailabilityList;
