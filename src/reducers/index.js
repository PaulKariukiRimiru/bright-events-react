import { comnineReducers } from 'redux';
import AccounReducer from './AccountReducer';

const rootReducer = comnineReducers({
  auth : AccounReducer
});

export default rootReducer;