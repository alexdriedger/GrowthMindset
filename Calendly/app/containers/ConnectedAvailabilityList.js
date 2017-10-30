import { connect } from 'react-redux';
import AvailabilityList from '../components/AvailabilityList';

const mapStateToProps = (state) => {
  const { isFetching, selectedAvailability, byId } = state.availabilities || {
    isFetching: true,
  };

  const times =
    typeof selectedAvailability !== 'undefined' ? byId[selectedAvailability].availability_list : [];

  return {
    isFetching,
    times,
  };
};

const ConnectedAvailabilityList = connect(mapStateToProps)(AvailabilityList);

export default ConnectedAvailabilityList;
