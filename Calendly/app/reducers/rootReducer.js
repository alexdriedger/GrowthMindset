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
    respondTo: [],
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
    case actions.CLEAR_USERS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        byId: {},
        allIds: [],
        currentAvailability: {},
        selectedAvailability: undefined,
      });
    case actions.REQUEST_RESPONDING_MEETINGS:
      return Object.assign({}, state, {
        respondTo: [],
      });
    case actions.RECEIVE_RESPONDING_MEETINGS_SUCCESS:
      return Object.assign({}, state, {
        byId: {
          ...state.byId,
          [action.meetings.list_id]: action.meetings,
        },
        allIds: [...new Set([...state.allIds, action.meetings.list_id])],
      });
    case actions.SET_ACTIVE_RESPONDING_MEETINGS:
      return Object.assign({}, state, {
        respondTo: action.ids,
      });
    // case actions.REQUEST_CONFIRM_MEETING_SUCCESS:
    // const { byId } = state;
    // delete byId[action.id];
    // return Object.assign({}, state, {
    //   byId,
    // });
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
