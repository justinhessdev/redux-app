/*
count reducer
*/
const count = (state = 'HEY', action) => {
  switch (action.type) {
    case 'HEY':
      return action.value;
    default:
      return state;
  }
};

export default count;
