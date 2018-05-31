import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';

import rootReducer from './reducers/index';

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger, thunk)));
export const persistor = persistStore(store);
