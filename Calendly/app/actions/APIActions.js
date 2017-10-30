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
  return function (dispatch) {
    dispatch(submitForm(form));
    dispatch(requestAvailabilities(form));
    return fetch(`${CONSTANTS.API_ENDPOINT}`, {
      headers: {
        duration: form.duration,
        date_range_start: form.startDate,
        date_range_end: form.endDate,
        meeting_buffer: form.buffer,
        earliest_meeting_time: form.earliestTime,
        latest_meeting_time: form.latestTime,
        email: form.recipientEmail,
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
