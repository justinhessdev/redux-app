import { connect } from 'react-redux';
import { toggleTodo } from '../actions/index';
import TodoList from './TodoList';
import { store } from '../index';

const getVisibleTodos = (
  todos,
  filter
) => {
  switch (filter) {
    case 'all':
      return todos;
    case 'active':
      return todos.filter(
        t => !t.completed
      );
    case 'completed':
      return todos.filter(
        t => t.completed
      );
    default: console.log('hmmmmmmm reached default. not expected behaviorrrrrr');
  }
}

const mapStateToProps = (state) => {
  console.log('in VisibleTodoList -- logging state');
  console.log(store.getState());
  return { todos: getVisibleTodos(state.todos, state.visibilityFilter) }
};

const mapDispatchToProps = (dispatch) => ({
  onTodoClick(id) {
    dispatch(toggleTodo(id));
  },
});

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);

export default VisibleTodoList;
