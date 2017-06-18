import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions/index';
import { increment } from '../actions/index';

let AddTodo = ({ dispatch }) => {
  let input;

  return (
    <div>
      <input ref={node => {
        input = node;
      }} />
      <button onClick={() => {
        dispatch(addTodo(input.value));
        dispatch(increment());
        input.value = '';
      }}>
        Add Todo
      </button>
    </div>
  );
};
AddTodo = connect()(AddTodo); // dispatch gets by default injected as prop if no args

export default AddTodo;
