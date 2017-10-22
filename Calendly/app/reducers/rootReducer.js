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
    case actions.REQUEST_AVAILABILITY:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
      });
    case actions.RECEIVE_AVAILABILITY:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        byId: {
          ...state.byId,
          [action.availabilities.id]: action.availabilities,
        },
        allIds: [...state.allIds, action.availabilities.id],
        currentAvailability: {},
      });
    case actions.RECEIVE_AVAILABILITY_FAILURE:
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
