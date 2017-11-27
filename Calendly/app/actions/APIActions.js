import * as actions from './ActionTypes';
import * as CONSTANTS from '../common/Constants';

export function submitForm(form) {
  return {
    type: actions.SUBMIT_FORM,
    form,
  };
}

export function requestAvailabilities(form) {
  return {
    type: actions.REQUEST_AVAILABILITY,
    form,
  };
}

export function receiveAvailabilities(form, json) {
  return {
    type: actions.RECEIVE_AVAILABILITY,
    form,
    availabilities: {
      id: json.list_id,
      availability_list: json.available_list,
      receivedAt: Date.now(),
    },
  };
}

export function receiveAvailabilitiesFailure(error) {
  return {
    type: actions.RECEIVE_AVAILABILITY_FAILURE,
    err: error,
  };
}

export function fetchAvailabilities(form) {
  return (dispatch) => {
    dispatch(submitForm(form));
    dispatch(requestAvailabilities(form));
    return fetch(`${CONSTANTS.API_ENDPOINT}/submit_form`, {
      headers: {
        duration: form.duration,
        date_range_start: form.startDate,
        date_range_end: form.endDate,
        meeting_buffer: form.buffer,
        earliest_meeting_time: form.earliestTime,
        latest_meeting_time: form.latestTime,
        email_creator: 'redezvouscpen321@gmail.com',
        email_responder: form.recipientEmail,
        code: form.code,
      },
    })
      .then(
        response => response.json(),
        (error) => {
          dispatch(receiveAvailabilitiesFailure(error));
          throw error;
        },
      )
      .then(
        json => dispatch(receiveAvailabilities(form, json)),
        () => {}, // API call failed, do not process Availabilities
      );
  };
}

export function requestRespondingMeetings(authToken) {
  return {
    type: actions.REQUEST_RESPONDING_MEETINGS,
    authToken,
  };
}

export function receiveRespondingMeetingsSuccess(response) {
  return {
    type: actions.RECEIVE_RESPONDING_MEETINGS_SUCCESS,
    response,
  };
}

export function receiveRespondingMeetingsFailure(error) {
  return {
    type: actions.RECEIVE_RESPONDING_MEETINGS_FAILURE,
    error,
  };
}

export function fetchRespondingMeetings(authToken) {
  return async (dispatch) => {
    dispatch(requestRespondingMeetings(authToken));
    try {
      const response = await fetch(`${CONSTANTS.API_ENDPOINT}/get_available_lists`, {
        headers: {
          code: authToken,
        },
      });
      const json = await response.json();
      console.log(json);
      dispatch(receiveRespondingMeetingsSuccess(json));
    } catch (error) {
      dispatch(receiveRespondingMeetingsFailure(error));
    }
  };
}
