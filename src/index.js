import React from 'react';
import { render } from 'react-dom';
import configureStore from './configureStore';
import Root from './components/Root';
import './index.css';

export const store = configureStore();
console.log('App starting -- in Root index.js -- logging state');
console.log(store.getState());

render(
  <Root store={store}/>,
  document.getElementById('root')
);
