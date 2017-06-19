import { v4 } from 'node-uuid';

/*
toggleTodo action creator
*/
export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id
});

/*
addTodo action creator
*/
export const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: v4(),
  text
});

let val = 0;
export const increment = () => ({
  type: 'INCREMENT',
  value: ++val,
});
