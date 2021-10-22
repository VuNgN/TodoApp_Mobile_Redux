import todoInit from '../init/todoInit';
import {ADD_TODO, COMPLETE_TODO, REMOVE_TODO} from '../actions/actions';
import uuid from 'react-native-uuid';

export default (state = todoInit, action) => {
  const todoId = uuid.v4();
  console.log(state);
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          id: todoId,
          content: action.content,
          type: action.typeTodo,
          isCompleted: false,
        },
      ];
    case COMPLETE_TODO:
      const newState = state.map(todo => {
        if (todo.id === action.id) {
          todo.isCompleted = !todo.isCompleted;
        }
        return todo;
      });
      console.log(newState);
      return newState;
    case REMOVE_TODO:
      return state.filter(todo => todo.id !== action.id);
    default:
      return state;
  }
};
