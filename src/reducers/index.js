import { combineReducers } from 'redux';
import account  from './AccountReducer';
import transaction from './TransactionReducer';

const rootReducer = combineReducers({
  account,
  transaction
});

export default rootReducer;