import { combineReducers } from 'redux';
import todos from './todos';
import visibilityFilter from './visibilityFilter';
import count from './count';

/*
App top level combine reducer
*/
const todoApp = combineReducers({
  todos,
  visibilityFilter,
  count
});

export default todoApp;
