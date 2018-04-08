import { LOGIN_SUCCESS, 
         EVENT_POST_SUCCESS, 
         EVENT_GET_SUCCESS, 
         TOKEN, 
         RSVP_GET_SUCCESS, 
         EDIT_EVENT_SUCCESS,
         DELETE_EVENT_SUCCESS,
         RSVP_MANAGE_SUCCESS } from '../Constants/action_type';
import { initialState } from '../Constants/initialState';
import jwt_decode from 'jwt-decode';

const AccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem(TOKEN, action.payload.payload.token);
      const myUser = jwt_decode(action.payload.payload.token);
      return { ...state, user:  {...state.user, email: myUser.identity.email, id:myUser.identity.id}};
    case EVENT_POST_SUCCESS:
      return {...state, events: [...state.events, action.payload]};
    case EVENT_GET_SUCCESS:
      return {...state, events: [...action.payload]};
    case RSVP_GET_SUCCESS:
      const rsvpList = action.payload
      return {...state, rsvps: [...action.payload]};
    case EDIT_EVENT_SUCCESS:
      return {...state, events: state.events.map((event, i) => event.id === action.payload.id ? {...event, ...action.payload}: event)}
    case DELETE_EVENT_SUCCESS:
      return {...state, events: state.events.filter(event => event.id !== action.payload)}
    case RSVP_MANAGE_SUCCESS:
      return {...state, rsvps: state.rsvps.map((rsvp, i) => rsvp.id === action.payload.id ? {...rsvp, accepted:action.payload.status}: rsvp)};
    default:
      return state
  };
};

export default AccountReducer;