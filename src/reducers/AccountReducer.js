import { LOGIN_SUCCESS, EVENT_POST_SUCCESS, EVENT_GET_SUCCESS, TOKEN, RSVP_GET_SUCCESS} from '../Constants/action_type';
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
      return {...state, events: [...state.events, ...action.payload]};
    case RSVP_GET_SUCCESS:
      return {...state, message: {...state.message, status: true, message: "Event reserved successfully"}};
    default:
      return state
  };
};

export default AccountReducer;