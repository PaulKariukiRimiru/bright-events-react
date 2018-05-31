import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';

import account from './AccountReducer';
import calls from './CallsReducer';
import transaction from './TransactionReducer';

const accountConfig = {
  key: 'auth',
  storage,
  whitelist: ['user', 'events']
};

const rootConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ['account', 'transaction', 'calls']
};

const rootReducer = combineReducers({
  account: persistReducer(accountConfig, account),
  transaction,
  calls
});

const persistedReducer = persistReducer(rootConfig, rootReducer);

export default persistedReducer;
