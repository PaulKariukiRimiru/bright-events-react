import axios from 'axios';

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

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: localStorage.getItem(TOKEN) && `Bearer ${localStorage.getItem(TOKEN)}`
};
/**
 * login action
 * @param  {any} payload
 * @return {void}
 */
const loginAction = payload => ({ type: LOGIN_SUCCESS, payload });
/**
 * logout action
 * @param  {any} payload
 * @return {void}
 */
const logoutAction = payload => ({ type: LOGOUT_SUCCESS, payload });
/**
 * events creation action
 * @param  {any} payload
 * @return {void}
 */
const eventsPostAction = payload => ({ type: EVENT_POST_SUCCESS, payload });
/**
 * events fetch action
 * @param  {any} payload
 * @return {void}
 */
const eventsGetAction = payload => ({ type: EVENT_GET_SUCCESS, payload });
/**
 * events reserve action
 * @param  {any} payload
 * @return {void}
 */
const eventRsvpAction = payload => ({ type: RSVP_GET_SUCCESS, payload });
/**
 * reservation status change action
 * @param  {any} payload
 * @return {void}
 */
const eventManageRsvpAction = payload => ({ type: RSVP_MANAGE_SUCCESS, payload });
/**
 * events deletion action
 * @param  {any} payload
 * @return {void}
 */
const eventDeleteAction = payload => ({ type: DELETE_EVENT_SUCCESS, payload });
/**
 * Events edit action
 * @param  {any} payload
 * @return {void}
 */
const eventEditAction = payload => ({ type: EDIT_EVENT_SUCCESS, payload });
/**
 * reservation fetch failed action
 * @param  {any} payload
 * @return {void}
 */
const rsvpGetFailed = payload => ({ type: RSVP_MANAGE_FAILED });
/**
 * events search action
 * @param  {any} payload
 * @return {void}
 */
const eventSearchAction = payload => ({ type: EVENT_SEARCH, payload });
/**
 * user reservation fetch action
 * @param  {any} payload
 * @return {void}
 */
const userRsvpsGetAction = payload => ({ type: USER_RSVPS_GET_SUCCESS, payload });
/**
 * user reservation attendance change action
 * @param  {any} payload
 * @return {void}
 */
const userRsvpAttendanceAction = payload => ({ type: USER_RSVP_ATTENDANCE_CHANGE, payload });
/**
 * user delete reservation action
 * @param  {any} payload
 * @return {void}
 */
const userDeleteRsvpAction = payload => ({ type: USER_DELETE_RSVP, payload });
/**
 * user reservation delete thunk
 * @param  {any} payload
 * @param {Function} callBack
 * @return {Function} dispatch
 */
export const userDeleteRsvp = (payload, callBack) => (dispatch) => {
  dispatch(fetchingAction(true));
  const newHeader = { ...headers, Authorization: `Bearer ${localStorage.getItem(TOKEN)}` };
  axios({
    method: 'delete', url: `${BASE_URL}/api/v2/events/rsvp`, headers: newHeader, data: payload
  })
    .then((resp) => {
      dispatch(userDeleteRsvpAction(resp.data.payload));
    })
    .then(() => dispatch(fetchedAction(true, 'Events fetched')))
    .then(() => callBack('deleteRsvp'))
    .catch((error) => {
      if (error.response) {
        return (dispatch(erroredAction(error.response.data.message)));
      }
      return (dispatch(erroredAction(error.message)));
    });
};
/**
 * user attendance change thunk
 * @param  {any} payload
 * @param  {Function} callBack
 * @return {Function} dispatch
 */
export const userAttendanceChange = (payload, callBack) => (dispatch) => {
  dispatch(fetchingAction(true));
  const newHeader = { ...headers, Authorization: `Bearer ${localStorage.getItem(TOKEN)}` };
  axios({
    method: 'put', url: `${BASE_URL}/api/v2/events/rsvp`, headers: newHeader, data: payload
  })
    .then((resp) => {
      dispatch(userRsvpAttendanceAction(resp.data.payload));
    })
    .then(() => dispatch(fetchedAction(true, 'Events fetched')))
    .then(() => callBack())
    .catch((error) => {
      if (error.response) {
        return (dispatch(erroredAction(error.response.data.message)));
      }
      return (dispatch(erroredAction(error.message)));
    });
};
/**
 * user reservations fetch thunk
 * @return {Function} dispatch
 */
export const userRsvpsGet = () => (dispatch) => {
  dispatch(fetchingAction(true));
  const newHeader = { ...headers, Authorization: `Bearer ${localStorage.getItem(TOKEN)}` };
  axios({ method: 'get', url: `${BASE_URL}/api/v2/events/rsvp`, headers: newHeader })
    .then((resp) => {
      dispatch(userRsvpsGetAction(resp.data.payload.events));
    })
    .then(() => dispatch(fetchedAction(true, 'User reservations fetched')))
    .catch((error) => {
      if (error.response) {
        return (dispatch(erroredAction(error.response.data.message)));
      }
      return (dispatch(erroredAction(error.message)));
    });
};
/**
 * user events search thunk
 * @param  {any} [params={}]
 * @param  {any} [body={}]
 * @return {Function} dispatch
 */
export const eventSearch = (params = {}, body = {}) => (dispatch) => {
  dispatch(fetchingAction(true));
  const newHeader = { ...headers, Authorization: `Bearer ${localStorage.getItem(TOKEN)}` };
  axios({
    method: 'get', url: `${BASE_URL}/api/v2/events/search`, headers: newHeader, params, body
  })
    .then(resp => (dispatch(eventSearchAction(resp.data.payload.event_list))))
    .then(() => dispatch(fetchedAction(true, 'Events search successful')))
    .catch((error) => {
      if (error.response) {
        return (dispatch(erroredAction(error.response.data.message)));
      }
      return (dispatch(erroredAction(error.message)));
    });
};
/**
 * events filter thunk
 * @param  {any} body
 * @return {void}
 */
export const eventFilter = body => (dispatch) => {
  dispatch(fetchingAction(true));
  const newHeader = { ...headers, Authorization: `Bearer ${localStorage.getItem(TOKEN)}` };
  axios({
    method: 'get',
    url: `${BASE_URL}/api/v2/events/search`,
    params: {
      q: body.q
    },
    headers: newHeader,
    body
  })
    .then(resp => (dispatch(eventSearchAction(resp.data.payload.event_list))))
    .then(() => dispatch(fetchedAction(true, 'Events filtered')))
    .catch((error) => {
      if (error.response) {
        return (dispatch(erroredAction(error.response.data.message)));
      }
      return (dispatch(erroredAction(error.message)));
    });
};
/**
 * events reservation fetch thunk
 * @param  {any} id
 * @param  {Function} callBack
 * @return {Function} dispatch
 */
export const eventRsvpGet = (id, callBack) => (dispatch) => {
  dispatch(fetchingAction(true));
  const newHeader = { ...headers, Authorization: `Bearer ${localStorage.getItem(TOKEN)}` };
  axios({ method: 'get', url: `${BASE_URL}/api/v2/event/${id}/rsvp`, headers })
    .then(resp => (dispatch(eventRsvpAction(resp.data.payload))))
    .then(() => dispatch(fetchedAction(true, 'Events reservations fetched')))
    .then(() => callBack('requestRsvp'))
    .catch((error) => {
      if (error.response) {
        return (dispatch(rsvpGetFailed(error.response.data.message)));
      }
      return (dispatch(rsvpGetFailed(error.message)));
    });
};
/**
 * events edit thunk
 * @param  {any} id
 * @param  {any} payload
 * @param  {Function} callBack
 * @return {Function} dispatch
 */
export const eventEdit = (id, payload, callBack) => (dispatch) => {
  const newHeader = { ...headers, Authorization: `Bearer ${localStorage.getItem(TOKEN)}` };
  axios({
    method: 'put', url: `${BASE_URL}/api/v2/events/${id}`, data: payload, headers: newHeader
  })
    .then(resp => (dispatch(eventEditAction(resp.data.payload))))
    .then(() => dispatch(fetchedAction(true, 'Events edited')))
    .then(() => callBack('editEvent'))
    .catch((error) => {
      if (error.response) {
        return (dispatch(erroredAction(error.response.data.message)));
      }
      return (dispatch(erroredAction(error.message)));
    });
};
/**
 * events deletion thunk
 * @param  {any} eventId
 * @param  {Function} callBack
 * @return {Function} dispatch
 */
export const eventDelete = (eventId, callBack) => (dispatch) => {
  const newHeader = { ...headers, Authorization: `Bearer ${localStorage.getItem(TOKEN)}` };
  axios({ method: 'delete', url: `${BASE_URL}/api/v2/events/${eventId}`, headers: newHeader })
    .then(resp => (dispatch(eventDeleteAction(eventId))))
    .then(() => (dispatch(fetchedAction(true, 'Event deleted'))))
    .then(() => callBack('deleteEvent'))
    .catch((error) => {
      if (error.response) {
        return (dispatch(erroredAction(error.response.data.message)));
      }
      return (dispatch(erroredAction(error.message)));
    });
};
/**
 * events reservation status change thunk
 * @param  {any} id
 * @param  {any} details
 * @return {Function} dispatch
 */
export const eventManageRsvp = (id, details) => (dispatch) => {
  dispatch(fetchingAction(true));
  const newHeader = { ...headers, Authorization: `Bearer ${localStorage.getItem(TOKEN)}` };
  axios({
    method: 'put', url: `${BASE_URL}/api/v2/event/${id}/rsvp`, headers: newHeader, data: details
  })
    .then(resp => (dispatch(eventManageRsvpAction(resp.data.payload))))
    .then(() => dispatch(fetchedAction(true, 'success')))
    .catch((error) => {
      if (error.response) {
        return (dispatch(erroredAction(error.response.data.message)));
      }
      return (dispatch(erroredAction(error.message)));
    });
};
/**
 * events reservation thunk
 * @param  {any} event
 * @param  {any} email
 * @param  {Function} callBack
 * @return {Function} dispatch
 */
export const eventRsvp = (event, email, callBack) => {
  const clientDetails = {
    client_email: email
  };
  return (dispatch) => {
    dispatch(fetchingAction(true));
    const newHeader = { ...headers, Authorization: `Bearer ${localStorage.getItem(TOKEN)}` };
    axios({
      method: 'post', url: `${BASE_URL}/api/v2/event/${event}/rsvp`, data: clientDetails, headers: newHeader
    })
      .then(resp => (dispatch(displayMessageAction({ status: true, message: 'event reserved successfully' }))))
      .then(() => dispatch(fetchedAction(true, 'Reserved event')))
      .then(() => callBack('eventRsvp'))
      .catch((error) => {
        if (error.response) {
          return (dispatch(erroredAction(error.response.data.message)));
        }
        return (dispatch(erroredAction(error.message)));
      });
  };
};
/**
 * events fetch thunk
 * @param  {Function} callBack
 * @return {Function} dispatch
 */
export const eventsGet = callBack => (dispatch) => {
  dispatch(fetchingAction(true));
  axios({ url: `${BASE_URL}/api/v2/events`, method: 'get', headers })
    .then(resp => (dispatch(eventsGetAction(resp.data.payload))))
    .then(() => dispatch(fetchedAction(true, 'Events fetched')))
    .then(() => callBack('fetchEvents'))
    .catch((error) => {
      if (error.response) {
        return (dispatch(erroredAction(error.response.data.message)));
      }
      return (dispatch(erroredAction(error.message)));
    });
};
/**
 * events creation thunk
 * @param  {any} payload
 * @param  {Function} callBack
 * @return {Function} dispatch
 */
export const eventPost = (payload, callBack) => {
  const eventDetails = {
    name: payload.name,
    location: payload.location,
    category: payload.category,
    time: payload.time,
    host: payload.host
  };
  return (dispatch) => {
    dispatch(fetchingAction(true));
    const newHeader = { ...headers, Authorization: `Bearer ${localStorage.getItem(TOKEN)}` };
    axios({
      method: 'post', url: `${BASE_URL}/api/v2/events`, headers: newHeader, data: eventDetails
    })
      .then((resp) => {
        eventDetails.id = resp.data.payload.event_id;
        eventDetails.host = eventDetails.host.toString();
        return (dispatch(eventsPostAction(eventDetails)));
      })
      .then(() => (dispatch(fetchedAction(true, EVENT_ADDED_SUCCESSFULLY))))
      .then(() => callBack('createEvent'))
      .catch((error) => {
        if (error.response) {
          return (dispatch(erroredAction(error.response.data.message)));
        }
        return (dispatch(erroredAction(error.message)));
      });
  };
};
/**
 * user registration thunk
 * @param  {any} payload
 * @param  {Function} callBack
 * @return {Function} dispatch
 */
export const registerUser = (payload, callBack) => {
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
    })
      .then((resp) => {
        message = REGISTER_SUCCESS_MESSAGE;
        return (dispatch(fetchedAction(true, message)));
      })
      .then(() => callBack())
      .catch((error) => {
        if (!error.response) {
          return (dispatch(erroredAction(error.message)));
        }
        return (dispatch(erroredAction(error.response.data.message)));
      });
  };
};
/**
 * user logout thunk
 * @param  {any} payload
 * @param  {Function} callBack
 * @return {Function} dispatch
 */
export const logoutUser = (payload, callBack) => {
  const data = {
    id: payload
  };
  return (dispatch) => {
    dispatch(fetchingAction(true));
    const newHeader = { ...headers, Authorization: `Bearer ${localStorage.getItem(TOKEN)}` };
    axios({
      method: 'post', url: `${BASE_URL}/api/v2/auth/logout`, headers: newHeader, data
    })
      .then(resp => (dispatch(logoutAction(resp.data.payload))))
      .then(() => callBack('logout'))
      .catch((error) => {
        if (!error.response) {
          return (dispatch(erroredAction(error.message)));
        }
        return (dispatch(erroredAction(error.response.data.message)));
      });
  };
};
/**
 * login user thunk
 * @param  {any} payload
 * @param  {Function} callBack
 * @return {Function} dispatch
 */
export const loginUser = (payload, callBack) => {
  const userDetails = {
    email: payload.email,
    password: payload.password
  };
  return (dispatch) => {
    dispatch(fetchingAction(true));
    axios({
      method: 'post', url: `${BASE_URL}/api/v2/auth/login`, headers, data: userDetails
    })
      .then(resp => (dispatch(loginAction(resp.data))))
      .then(() => dispatch(fetchedAction(true, LOGIN_SUCCESS_MESSAGE)))
      .then(() => callBack())
      .catch((error) => {
        if (error.response) {
          return (dispatch(erroredAction(error.response.data.message)));
        }
        return (dispatch(erroredAction(error.message)));
      });
  };
};
