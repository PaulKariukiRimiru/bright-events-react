import { FETCHING, FETCHED, ERRORED, RSVP_MANAGE_FAILED, LOGOUT_SUCCESS } from '../Constants/action_type';
import initialState from '../Constants/initialState';
/**
 * calls reducer handle the active calls value in the store
 * @param  {any} [state=initialState.activeCalls]
 * @param  {any} action
 * @return {Object} state
 */
const CallsReducer = (state = initialState.activeCalls, action) => {
  if (action.type === FETCHING) {
    return state + 1;
  } else if (action.type === FETCHED || action.type === ERRORED || action.type === RSVP_MANAGE_FAILED || action.type === LOGOUT_SUCCESS) {
    return state - 1;
  }
  return state;
};

export default CallsReducer;
