import { combineReducers } from 'redux';
import { AccountReducer } from './AccountReducer';

const rootReducer = combineReducers({
  auth : AccountReducer
});

export default rootReducer;