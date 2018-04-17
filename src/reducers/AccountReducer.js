import { LOGIN_SUCCESS, 
         EVENT_POST_SUCCESS, 
         EVENT_GET_SUCCESS, 
         TOKEN, 
         RSVP_GET_SUCCESS, 
         EDIT_EVENT_SUCCESS,
         DELETE_EVENT_SUCCESS,
         RSVP_MANAGE_SUCCESS,
         RSVP_MANAGE_FAILED,
         EVENT_SEARCH } from '../Constants/action_type';
import { initialState } from '../Constants/initialState';
import jwt_decode from 'jwt-decode';

const AccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem(TOKEN, action.payload.payload.token);
      const myUser = jwt_decode(action.payload.payload.token);
      return { ...state, user:  {...state.user, email: myUser.identity.email, id:myUser.identity.id}};
    case EVENT_POST_SUCCESS:
      return {...state, events: [...state.events, action.payload], userEvents: [...state.userEvents, action.payload]};
    case EVENT_GET_SUCCESS:
      return {...state, events: [...action.payload.event_list], userEvents: action.payload.users_list ? [...action.payload.users_list] : [...state.userEvents]};
    case RSVP_GET_SUCCESS:
      const rsvpList = action.payload
      return {...state, rsvps: [...action.payload]};
    case EDIT_EVENT_SUCCESS:
      return {...state, userEvents: state.userEvents.map((event, i) => event.id === action.payload.id ? {...event, ...action.payload}: event), events: state.events.map((event, i) => event.id === action.payload.id ? {...event, ...action.payload}: event)}
    case DELETE_EVENT_SUCCESS:
      return {...state, events: state.events.filter(event => event.id !== action.payload), userEvents: state.userEvents.filter(event => event.id !== action.payload)}
    case RSVP_MANAGE_SUCCESS:
      return {...state, rsvps: state.rsvps.map((rsvp, i) => rsvp.id === action.payload.id ? {...rsvp, accepted:action.payload.status}: rsvp)};
    case RSVP_MANAGE_FAILED:
      return {...state, rsvps: []}
    case EVENT_SEARCH:
      return {...state, events: [...action.payload], userEvents: action.payload }
    default:
      return state
  };
};

export default AccountReducer;