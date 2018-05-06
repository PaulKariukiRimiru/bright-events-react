import { combineReducers } from 'redux';

import account from './AccountReducer';
import transaction from './TransactionReducer';
import calls from './CallsReducer';

import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

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
