import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import { Route, BrowserRouter } from 'react-router-dom';

import store from './store';

import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import DashBoard from './pages/DashBoard';

ReactDOM.render(
  <Provider store={ store }>
    <BrowserRouter>
      <div >
        <Route path="/" component={ App } />
        <Route exact path="/" component={ LandingPage } />
        <Route path="/home" component={ HomePage } />
        <Route path="/dashboard" component={ DashBoard } />
      </div>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
