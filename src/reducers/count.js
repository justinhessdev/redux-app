/*
count reducer
*/
const count = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return action.value;
    default:
      return state;
  }
};

export default count;
