/*
This is Reducer Composition:
Different reducrs tell us how
different parts of the state tree are updated in response to actions
Reducers call other reducers

And reducers are normal JS functions so they can call other reducers to delegate
and anstract away handling of updates of some part of the state thy manage
This pattern can be applied many times ..
convenient to have many reducer calling each other
each contributing to a part of the application state tree
*/
const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      };
      return {
        ...state,
        completed: !state.completed
      };
    default:
      return state;
  }
}

/*
TODOS reducer
*/
const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ];
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));
    default:
      return state;
  }
};

export default todos;
