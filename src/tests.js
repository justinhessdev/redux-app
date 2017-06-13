// import DeepFreeze from 'deep-freeze';
// import Expect from 'expect';

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
