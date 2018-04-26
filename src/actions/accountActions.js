import axios from 'axios';
import React from 'react';

import { fetchingAction, fetchedAction, erroredAction, displayMessageAction } from '../actions/index';
import { REGISTER_SUCCESS_MESSAGE, LOGIN_SUCCESS_MESSAGE, EVENT_ADDED_SUCCESSFULLY } from '../Constants/messages';

import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  EVENT_POST_SUCCESS,
  EVENT_GET_SUCCESS,
  RSVP_GET_SUCCESS,
  RSVP_MANAGE_FAILED,
  RSVP_MANAGE_SUCCESS,
  DELETE_EVENT_SUCCESS,
  EDIT_EVENT_SUCCESS,
  EVENT_SEARCH,
  USER_RSVPS_GET_SUCCESS,
  USER_RSVP_ATTENDANCE_CHANGE,
  TOKEN,
  USER_DELETE_RSVP,
  BASE_URL
} from '../Constants/action_type';
import { push } from 'react-router-redux';
import { Redirect } from 'react-router-dom';

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: localStorage.getItem(TOKEN)
    ? `Bearer ${localStorage.getItem(TOKEN)}`
    : ''
};

const loginAction = payload => ({ type: LOGIN_SUCCESS, payload });

const logoutAction = payload => ({ type: LOGOUT_SUCCESS, payload });

const eventsPostAction = payload => ({ type: EVENT_POST_SUCCESS, payload });

const eventsGetAction = payload => ({ type: EVENT_GET_SUCCESS, payload });

const eventRsvpAction = payload => ({ type: RSVP_GET_SUCCESS, payload });

const eventManageRsvpAction = payload => ({ type: RSVP_MANAGE_SUCCESS, payload });

const eventDeleteAction = payload => ({ type: DELETE_EVENT_SUCCESS, payload });

const eventEditAction = payload => ({ type: EDIT_EVENT_SUCCESS, payload });

const rsvpGetFailed = payload => ({ type: RSVP_MANAGE_FAILED });

const eventSearchAction = payload => ({ type: EVENT_SEARCH, payload });

const userRsvpsGetAction = payload => ({ type: USER_RSVPS_GET_SUCCESS, payload });

const userRsvpAttendanceAction = payload => ({ type: USER_RSVP_ATTENDANCE_CHANGE, payload });

const userDeleteRsvpAction = payload => ({ type: USER_DELETE_RSVP, payload });

export const userDeleteRsvp = payload => function (dispatch) {
  dispatch(fetchingAction(true));
  axios({
    method: 'delete', headers, url: `${BASE_URL}/api/v2/events/rsvp`, data: payload
  })
    .then((resp) => {
      dispatch(userDeleteRsvpAction(resp.data.payload));
    })
    .catch((error) => {
      if (error.response) {
        return (dispatch(erroredAction(error.response.data.message)));
      }
      return (dispatch(erroredAction(error.message)));
    });
};

export const userAttendanceChange = payload => function (dispatch) {
  dispatch(fetchingAction(true));
  axios({
    method: 'put', headers, url: `${BASE_URL}/api/v2/events/rsvp`, data: payload
  })
    .then((resp) => {
      dispatch(userRsvpAttendanceAction(resp.data.payload));
    })
    .catch((error) => {
      if (error.response) {
        return (dispatch(erroredAction(error.response.data.message)));
      }
      return (dispatch(erroredAction(error.message)));
    });
};

export const userRsvpsGet = () => function (dispatch) {
  dispatch(fetchingAction(true));
  axios({
    method: 'get', headers, url: `${BASE_URL}/api/v2/events/rsvp`
  })
    .then((resp) => {
      dispatch(userRsvpsGetAction(resp.data.payload.events));
    })
    .catch((error) => {
      if (error.response) {
        return (dispatch(erroredAction(error.response.data.message)));
      }
      return (dispatch(erroredAction(error.message)));
    });
};

export const eventSearch = (params = {}, body = {}) => function (dispatch) {
  dispatch(fetchingAction(true));
  axios({
    method: 'get', url: `${BASE_URL}/api/v2/events/search`, headers, params, body
  })
    .then(resp => (dispatch(eventSearchAction(resp.data.payload.event_list))))
    .catch((error) => {
      if (error.response) {
        return (dispatch(erroredAction(error.response.data.message)));
      }
      return (dispatch(erroredAction(error.message)));
    });
};

export const eventFilter = body => function (dispatch) {
  dispatch(fetchingAction(true));
  axios({
    method: 'get', url: `${BASE_URL}/api/v2/events/search`, params: { q: body.q }, headers, body
  })
    .then(resp => (dispatch(eventSearchAction(resp.data.payload.event_list))))
    .catch((error) => {
      if (error.response) {
        return (dispatch(erroredAction(error.response.data.message)));
      }
      return (dispatch(erroredAction(error.message)));
    });
};

export const eventRsvpGet = id => function (dispatch) {
  dispatch(fetchingAction(true));
  axios({
    method: 'get', url: `${BASE_URL}/api/v2/event/${id}/rsvp`, headers
  })
    .then(resp => (dispatch(eventRsvpAction(resp.data.payload))))
    .catch((error) => {
      if (error.response) {
        return (dispatch(rsvpGetFailed(error.response.data.message)));
      }
      return (dispatch(rsvpGetFailed(error.message)));
    });
};

export const eventEdit = (id, payload) => function (dispatch) {
  axios({
    method: 'put', url: `${BASE_URL}/api/v2/events/${id}`, data: payload, headers
  })
    .then(resp => (dispatch(eventEditAction(resp.data.payload))))
    .catch((error) => {
      if (error.response) {
        return (dispatch(erroredAction(error.response.data.message)));
      }
      return (dispatch(erroredAction(error.message)));
    });
};

export const eventDelete = eventId => function (dispatch) {
  axios({
    method: 'delete', headers, url: `${BASE_URL}/api/v2/events/${eventId}`
  })
    .then(resp => (dispatch(eventDeleteAction(eventId))))
    .catch((error) => {
      if (error.response) {
        return (dispatch(erroredAction(error.response.data.message)));
      }
      return (dispatch(erroredAction(error.message)));
    });
};

export const eventManageRsvp = (id, details) => function (dispatch) {
  dispatch(fetchingAction(true));
  axios({
    method: 'put', headers, url: `${BASE_URL}/api/v2/event/${id}/rsvp`, data: details
  })
    .then(resp => (dispatch(eventManageRsvpAction(resp.data.payload))))
    .catch((error) => {
      if (error.response) {
        return (dispatch(erroredAction(error.response.data.message)));
      }
      return (dispatch(erroredAction(error.message)));
    });
};

export const eventRsvp = (event, email) => {
  const clientDetails = {
    client_email: email
  };
  return function (dispatch) {
    dispatch(fetchingAction(true));
    axios({
      method: 'post', url: `${BASE_URL}/api/v2/event/${event}/rsvp`, data: clientDetails, headers
    })
      .then(resp => (dispatch(displayMessageAction({status: true, message: 'event reserved successfully'}))))
      .catch((error) => {
        if (error.response) {
          return (dispatch(erroredAction(error.response.data.message)));
        }
        return (dispatch(erroredAction(error.message)));
      });
  };
};

export const eventsGet = (payload) => {
  const message = '';
  return function (dispatch) {
    dispatch(fetchingAction(true));
    axios({ url: `${BASE_URL}/api/v2/events`, method: 'get', headers })
      .then(resp => (dispatch(eventsGetAction(resp.data.payload))))
      .catch((error) => {
        if (error.response) {
          return (dispatch(erroredAction(error.response.data.message)));
        }
        return (dispatch(erroredAction(error.message)));
      });
  };
};

export const eventPost = (payload) => {
  const message = '';
  const eventDetails = {
    name: payload.name,
    location: payload.location,
    category: payload.category,
    time: payload.time,
    host: payload.host
  };
  return (dispatch) => {
    dispatch(fetchingAction(true));
    axios({
      method: 'post', url: `${BASE_URL}/api/v2/events`, headers, data: eventDetails
    }).then((resp) => {
      eventDetails.id = resp.data.payload.event_id;
      return (dispatch(eventsPostAction(eventDetails)));
    }).then(() => (dispatch(fetchedAction(true, EVENT_ADDED_SUCCESSFULLY)))).catch((error) => {
      if (error.response) {
        return (dispatch(erroredAction(error.response.data.message)));
      }
      return (dispatch(erroredAction(error.message)));
    });
  };
};

export const registerUser = (payload) => {
  let message = '';
  const userDetails = {
    username: payload.username,
    email: payload.email,
    password: payload.password
  };
  return (dispatch) => {
    dispatch(fetchingAction(true));
    axios({
      method: 'post', url: `${BASE_URL}/api/v2/auth/register`, data: userDetails, headers
    }).then((resp) => {
      message = REGISTER_SUCCESS_MESSAGE;
      return (dispatch(fetchedAction(true, message)));
    }).catch((error) => {
      if (!error.response) {
        return (dispatch(erroredAction(error.message)));
      }
      return (dispatch(erroredAction(error.response.data.message)));
    });
  };
};

export const logoutUser = (payload, history) => {
  const data = {
    id: payload
  };
  return function (dispatch) {
    dispatch(fetchingAction(true));
    axios({
      method: 'post', url: `${BASE_URL}/api/v2/auth/logout`, headers, data
    }).then((resp) => {
      localStorage.clear();
      history.push('/');
      return (dispatch(logoutAction(resp.data.payload)));
    }).catch((error) => {
      if (!error.response) {
        return (dispatch(erroredAction(error.message)));
      }
      return (dispatch(erroredAction(error.response.data.message)));
    });
  };
};

export const loginUser = (payload, history) => {
  let message = '';
  const userDetails = {
    email: payload.email,
    password: payload.password
  };
  return function (dispatch) {
    dispatch(fetchingAction(true));
    axios({
      method: 'post', url: `${BASE_URL}/api/v2/auth/login`, header: headers, data: userDetails
    }).then((resp) => {
      message = LOGIN_SUCCESS_MESSAGE;
      return (dispatch(loginAction(resp.data)));
    }).then(() => dispatch(fetchedAction(true, LOGIN_SUCCESS_MESSAGE))).catch((error) => {
      if (error.response) {
        return (dispatch(erroredAction(error.response.data.message)));
      }
      return (dispatch(erroredAction(error.message)));
    });
  };
};
