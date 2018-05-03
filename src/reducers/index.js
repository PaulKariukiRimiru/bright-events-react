import { combineReducers } from 'redux';

import account from './AccountReducer';
import transaction from './TransactionReducer';
import calls from './CallsReducer';

const rootReducer = combineReducers({
  account,
  transaction,
  calls
});

export default rootReducer;
