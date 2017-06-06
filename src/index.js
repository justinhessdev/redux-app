import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DeepFreeze from 'deep-freeze';
import Expect from 'expect';
import { createStore } from 'redux';
import { combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

// ReactDOM.render(<App />, document.getElementById('root'));

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

const visibilityFilter = (
  state = 'SHOW_ALL',
  action
) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};

const todoApp = combineReducers({
  todos,
  visibilityFilter
});

let nextTodoId = 0;
const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
  }
}

const setVisibilityFilter = (filter) => {
  return {
      type: 'SET_VISIBILITY_FILTER',
      filter
  };
}

const toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id
  };
}

const Link = ({
  active,
  children,
  onClick
}) => {
  if (active) {
    return <span>{children}</span>;
  }
  return (
    <a href='#'
      onClick={e => {
        e.preventDefault();
        onClick()
      }}
    >
    {children}
    </a>
  );
}

const mapStateToLinkProps = (
  state,
  ownProps
) => {
  return {
    active:
      ownProps.filter ===
      state.visibilityFilter
  };
}

const mapDispatchToLinkProps = (
  dispatch,
  ownProps
) => {
  return {
    onClick: () => {
      dispatch(
        setVisibilityFilter(ownProps.filter)
      );
    }
  };
}

const FilterLink = connect(
  mapStateToLinkProps,
  mapDispatchToLinkProps
)(Link);

const Footer = () => (
  <p>
    Show:
    {' '}
    <FilterLink filter='SHOW_ALL' >
      All
    </FilterLink>
    {' '}
    <FilterLink filter='SHOW_ACTIVE' >
      Active
    </FilterLink>
    {' '}
    <FilterLink filter='SHOW_COMPLETED' >
      Completed
    </FilterLink>
  </p>
);

const Todo = ({
  onClick,
  completed,
  text
}) => (
  <li
    onClick={onClick}
    style={{
      textDecoration:
        completed ?
          'line-through' :
          'none'
    }}
  >
    {text}
  </li>
);

const TodoList = ({
  todos,
  onTodoClick
}) => (
  <ul>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => onTodoClick(todo.id)}
      />
    )}
  </ul>
);

let AddTodo = ({ dispatch }) => {
  let input;

  return (
    <div>
      <input ref={node => {
        input = node;
      }} />
      <button onClick={() => {
        dispatch(addTodo(input.value));
        input.value = '';
      }}>
        Add Todo
      </button>
    </div>
  );
};
AddTodo = connect()(AddTodo); // dispatch gets by default injected as prop if no args

const getVisibleTodos = (
  todos,
  filter
) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_ACTIVE':
      return todos.filter(
        t => !t.completed
      );
    case 'SHOW_COMPLETED':
      return todos.filter(
        t => t.completed
      );
  }
}

const mapStateToTodoListProps = (state) => {
  return {
    todos: getVisibleTodos(
      state.todos,
      state.visibilityFilter
    )
  };
};

const mapDispatchToTodoListProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id))
    }
  };
};

const VisibleTodoList = connect(
  mapStateToTodoListProps,
  mapDispatchToTodoListProps
)(TodoList);

const TodoApp = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);

ReactDOM.render(
  <Provider store={createStore(todoApp)} >
    <TodoApp />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();

// const testAddTodo = () => {
//   const stateBefore = [];
//   const action = {
//     type: 'ADD_TODO',
//     id: 0,
//     text: 'Learn Redux'
//   };
//   const stateAfter = [
//     {
//         id: 0,
//         text: 'Learn Redux',
//         completed: false
//     }
//   ];
//
//   DeepFreeze(stateBefore);
//   DeepFreeze(action);
//
//   Expect(
//     todos(stateBefore, action)
//   ).toEqual(stateAfter);
// };
//
// const testToggleTodo = () => {
//   const stateBefore = [
//     {
//       id: 0,
//       text: 'Learn Redux',
//       completed: false
//     },
//     {
//       id: 1,
//       text: 'Go Shopping',
//       completed: false
//     }
//   ];
//   const action = {
//     type: 'TOGGLE_TODO',
//     id: 1
//   };
//   const stateAfter = [
//     {
//       id: 0,
//       text: 'Learn Redux',
//       completed: false
//     },
//     {
//       id: 1,
//       text: 'Go Shopping',
//       completed: true
//     }
//   ];
//
//   DeepFreeze(stateBefore);
//   DeepFreeze(action);
//
//   Expect(
//     todos(stateBefore, action)
//   ).toEqual(stateAfter);
//
// };
//
// testAddTodo();
// testToggleTodo();
// console.log('Tests all passed');
