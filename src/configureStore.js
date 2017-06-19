import { createStore } from 'redux';
import todoApp from './reducers/index';

const persistedState = {
  todos: [{
    id: '0',
    text: 'Welcome back',
    completed: false,
  }],
};

const configureStore = () => {
  const store = createStore(
    todoApp,
    persistedState
  );

  return store;
}

export default configureStore;
