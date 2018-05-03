import { FETCHING, FETCHED, ERRORED } from '../Constants/action_type';
import initialState from '../Constants/initialState';

const CallsReducer = (state = initialState.activeCalls, action) => {
  if (action.type === FETCHING) {
    return state + 1;
  } else if (action.type === FETCHED || action.type === ERRORED) {
    return state - 1;
  }
  return state;
};

export default CallsReducer;
