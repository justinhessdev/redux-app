/*
setVisibilityFilter action creator
*/
export const setVisibilityFilter = (filter) => ({
    type: 'SET_VISIBILITY_FILTER',
    filter
});

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
let nextTodoId = 0;
export const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
});
