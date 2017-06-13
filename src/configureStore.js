import { createStore } from 'redux';
import todoApp from './reducers/index';

const configureStore = () => {
  const store = createStore(todoApp);

  return store;
}

export default configureStore;
