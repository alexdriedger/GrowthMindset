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
        email_responder: form.recipientEmail,
        code: form.code,
        summary: form.eventName,
        description: form.description,
        location: form.location,
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
    meetings: response,
  };
}

export function receiveRespondingMeetingsFailure(error) {
  return {
    type: actions.RECEIVE_RESPONDING_MEETINGS_FAILURE,
    error,
  };
}

export function setActiveRespondingMeetings(ids) {
  return {
    type: actions.SET_ACTIVE_RESPONDING_MEETINGS,
    ids,
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
      console.log(response);
      const json = await response.json();
      console.log(json);
      const arrayIds = [];
      Object.keys(json.available_lists).forEach((meeting) => {
        console.log(meeting);
        arrayIds.push(meeting);
        dispatch(receiveRespondingMeetingsSuccess(json.available_lists[meeting]));
      });
      dispatch(setActiveRespondingMeetings(arrayIds));
    } catch (error) {
      dispatch(receiveRespondingMeetingsFailure(error));
    }
  };
}

export function requestConfirmAvailabilityList(confirmed) {
  return {
    type: actions.REQUEST_CONFIRM_AVAILABILITY_LIST,
    confirmed,
  };
}

export function receiveConfirmAvailabilityListSuccess() {
  return {
    type: actions.REQUEST_CONFIRM_AVAILABILITY_LIST_SUCCESS,
  };
}

export function receiveConfirmAvailabilityListFailure(error) {
  return {
    type: actions.REQUEST_CONFIRM_AVAILABILITY_LIST_FAILURE,
    error,
  };
}

export function confirmAvailability(confirmed, listId) {
  return async (dispatch) => {
    dispatch(requestConfirmAvailabilityList(confirmed));
    console.log('Confirmed is: ', confirmed);
    console.log('List ID is: ', listId);
    try {
      const response = await fetch(`${CONSTANTS.API_ENDPOINT}/confirm_form`, {
        headers: {
          listConfirmed: confirmed,
          list_id: listId,
        },
      });
      console.log(response);
      dispatch(receiveConfirmAvailabilityListSuccess());
    } catch (error) {
      dispatch(receiveConfirmAvailabilityListFailure(error));
    }
  };
}

export function requestConfirmMeeting() {
  return {
    type: actions.REQUEST_CONFIRM_MEETING,
  };
}

export function receiveConfirmMeetingSuccess(id) {
  return {
    type: actions.REQUEST_CONFIRM_MEETING_SUCCESS,
    id,
  };
}

export function receiveConfirmMeetingFailure() {
  return {
    type: actions.REQUEST_CONFIRM_MEETING_FAILURE,
  };
}

export function confirmMeeting(time, code, id) {
  return async (dispatch) => {
    dispatch(requestConfirmMeeting());
    try {
      const response = await fetch(`${CONSTANTS.API_ENDPOINT}/choose_meeting_time`, {
        headers: {
          chosen_time: time.substring(0, 16),
          code,
          list_id: id,
        },
      });
      console.log(response);
      console.log('confirm meeting', time, code, id);
      dispatch(receiveConfirmMeetingSuccess(id));
    } catch (error) {
      dispatch(receiveConfirmMeetingFailure());
    }
  };
}
