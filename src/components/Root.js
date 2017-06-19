import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import createHistory from 'history/createBrowserHistory'
import App from './App';

const history = createHistory()
console.log(history);

const Root = ({ store }) => (
  <Provider store={store} >
    <Router history={history}>
      <Route path="/(:filter)" component={App} />
    </Router>
  </Provider>
);

export default Root;
