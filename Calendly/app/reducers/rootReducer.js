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
    isFetching: false,
    didInvalidate: false,
    currentUser: {},
  },
  action,
) {
  switch (action.type) {
    case actions.REQUEST_USER:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
      });
    case actions.RECEIVE_USER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        currentUser: action.user,
      });
    case actions.RECEIVE_USER_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
      });
    case actions.LOG_OUT:
      return Object.assign({}, state, {
        currentUser: {},
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
