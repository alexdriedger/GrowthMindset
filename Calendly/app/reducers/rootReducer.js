import { combineReducers } from 'redux';
import * as actions from '../actions/ActionTypes';

function availabilities(
  state = {
    isFetching: false,
    didInvalidate: false,
    byId: {},
    allIds: [],
    currentAvailability: {},
    selectedAvailability: undefined,
  },
  action,
) {
  switch (action.type) {
    case actions.SUBMIT_FORM:
      return Object.assign({}, state, {
        currentAvailability: action.form,
        selectedAvailability: undefined,
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
        selectedAvailability: action.availabilities.id,
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
    currentUser: undefined,
  },
  action,
) {
  switch (action.type) {
    case actions.SET_USER:
      return Object.assign({}, state, {
        currentUser: action.code,
      });
    case actions.CLEAR_USERS:
      return Object.assign({}, state, {
        currentUser: undefined,
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  availabilities,
  users,
});

export default rootReducer;
