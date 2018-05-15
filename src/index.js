import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { Route, Redirect, BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';

import { persistor, store } from './store';
import App from './App';
import newHome from './pages/NewHome';
import newLanding from './pages/NewLandingPage';
import registerServiceWorker from './registerServiceWorker';
import { TOKEN } from './Constants/action_type';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const state = store.getState();
  return (
    <Route {...rest} render={(props) => (
        state.account.user.token
          ? <Component {...props} />
          : <Redirect to='/' />
      )} 
      />
  );
};

ReactDOM.render(
  <Provider store={ store }>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div>
          <Route path='/' component={ App } />
          <Route exact path='/' component={ newLanding } />
          <PrivateRoute path='/home' component={ newHome } />
        </div>
      </BrowserRouter>
    </PersistGate>
  </Provider>
  , document.getElementById('root')
);

registerServiceWorker();
