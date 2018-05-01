import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import { Route, BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from './store';
import newHome from './pages/NewHome';

ReactDOM.render(
  <Provider store={ store }>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div>
          <Route path="/" component={ App } />
          <Route exact path="/" component={ newHome } />
        </div>
      </BrowserRouter>
    </PersistGate>
  </Provider>
  , document.getElementById('root')
);

registerServiceWorker();
