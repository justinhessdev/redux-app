import { combineReducers } from 'redux';
import todos from './todos';
import visibilityFilter from './visibilityFilter';

/*
App top level combine reducer
*/
const todoApp = combineReducers({
  todos,
  visibilityFilter
});

export default todoApp;
