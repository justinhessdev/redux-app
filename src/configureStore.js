import { createStore } from 'redux';
import throttle from 'lodash/throttle';
import todoApp from './reducers/index';
import { loadState, saveState } from './localStorage';

const configureStore = () => {
  /*
    removeItem('state') removes the savedState from localStorage
    Just use for testing if toooo many things are saved and it gets annoying...
  */
  // localStorage.removeItem('state');
  const persistedState = loadState();

  const store = createStore(
    todoApp,
    persistedState
  );

  store.subscribe(throttle(() => {
    saveState({
      todos: store.getState().todos,
    });
  }, 1000));

  return store;
}

export default configureStore;
