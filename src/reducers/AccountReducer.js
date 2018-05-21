import jwtDecode from 'jwt-decode';
import {
  LOGIN_SUCCESS,
  EVENT_POST_SUCCESS,
  EVENT_GET_SUCCESS,
  TOKEN,
  RSVP_GET_SUCCESS,
  EDIT_EVENT_SUCCESS,
  DELETE_EVENT_SUCCESS,
  RSVP_MANAGE_SUCCESS,
  RSVP_MANAGE_FAILED,
  EVENT_SEARCH,
  USER_RSVPS_GET_SUCCESS,
  USER_RSVP_ATTENDANCE_CHANGE,
  USER_DELETE_RSVP,
  LOGOUT_SUCCESS
} from '../Constants/action_type';

import initialState from '../Constants/initialState';

let myUser = {};

const AccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem(TOKEN, action.payload.payload.token);
      myUser = jwtDecode(action.payload.payload.token);
      return {
        ...state,
        user: {
          ...state.user,
          email: myUser.identity.email,
          username: myUser.identity.username,
          id: myUser.identity.id,
          token: action.payload.payload.token
        }
      };
    case LOGOUT_SUCCESS:
      localStorage.removeItem(TOKEN);
      return {
        ...state,
        user: {}
      };
    case EVENT_POST_SUCCESS:
      return {
        ...state,
        events: [
          ...state.events,
          action.payload
        ],
        userEvents: [
          ...state.userEvents,
          action.payload
        ]
      };
    case EVENT_GET_SUCCESS:
      return {
        ...state,
        events: [...action.payload.event_list],
        userEvents: action.payload.users_list
          ? [...action.payload.users_list]
          : [...state.userEvents]
      };
    case RSVP_GET_SUCCESS:
      return {
        ...state,
        rsvps: [...action.payload]
      };
    case EDIT_EVENT_SUCCESS:
      return {
        ...state,
        userEvents: state
          .userEvents
          .map((event, i) => (event.id === action.payload.id
            ? {
              ...event,
              ...action.payload
            }
            : event)),
        events: state
          .events
          .map((event, i) => (event.id === action.payload.id
            ? {
              ...event,
              ...action.payload
            }
            : event))
      };
    case DELETE_EVENT_SUCCESS:
      return {
        ...state,
        events: state
          .events
          .filter(event => event.id !== action.payload),
        userEvents: state
          .userEvents
          .filter(event => event.id !== action.payload)
      };
    case RSVP_MANAGE_SUCCESS:
      return {
        ...state,
        rsvps: state
          .rsvps
          .map((rsvp, i) => (rsvp.id === action.payload.id
            ? {
              ...rsvp,
              accepted: action.payload.status
            }
            : rsvp))
      };
    case RSVP_MANAGE_FAILED:
      return {
        ...state,
        rsvps: []
      };
    case EVENT_SEARCH:
      return {
        ...state,
        events: [...action.payload],
        userEvents: action.payload
      };
    case USER_RSVPS_GET_SUCCESS:
      return {
        ...state,
        userRsvps: [...action.payload]
      };
    case USER_RSVP_ATTENDANCE_CHANGE:
      return {
        ...state,
        userRsvps: state
          .userRsvps
          .map((event, i) => (event.id === action.payload.event_id
            ? {
              ...event,
              attendance: action.payload.attendance
            }
            : event))
      };
    case USER_DELETE_RSVP:
      return {
        ...state,
        userRsvps: state
          .userRsvps
          .filter(event => event.id !== action.payload.event_id)
      };
    default:
      return state;
  }
};

export default AccountReducer;
