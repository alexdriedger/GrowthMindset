import { combineReducers } from 'redux';
import * as actions from '../actions/ActionTypes';

function availabilties(
  state = {
    isFetching: false,
    didInvalidate: false,
    byId: {},
    allIds: [],
    currentAvailability: {},
  },
  action,
) {
  switch (action.type) {
    case actions.SUBMIT_FORM:
      return Object.assign({}, state, {
        currentAvailability: action.form,
      });
    case actions.REQUEST_AVAILABILITIES:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
      });
    case actions.RECEIVE_AVAILABILITIES:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        fetchedAvailability: action.availabilities,
        id: action.id,
        // byId: action.availabilty_list.b,
        // allIds: action.events.allIds,
        lastUpdated: action.receivedAt,
      });
    case actions.RECEIVE_AVAILABILITIES_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
      });
    default:
      return state;
  }
}

function users(
  state = {
    byId: {},
    allIds: [],
  },
  action,
) {
  return state;
}

const rootReducer = combineReducers({
  availabilties,
  users,
});

export default rootReducer;
