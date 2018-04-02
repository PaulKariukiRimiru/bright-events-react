import { LOGIN_SUCCESS, EVENT_POST_SUCCESS, EVENT_GET_SUCCESS } from '../Constants/action_type';
import { initialState } from '../Constants/initialState';

const AccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, user: action.payload };
    case EVENT_POST_SUCCESS:
      return {...state, events: [...state.events, action.payload]}
    case EVENT_GET_SUCCESS:
      return {...state, events: [...state.events, ...action.payload]}
    default:
      return state
  };
};

export default AccountReducer;