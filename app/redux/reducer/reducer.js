import todoInit from '../init/todoInit';
import {ADD_TODO} from '../actions/actions';
import {COMPLETE_TODO} from '../actions/actions';

export default (state = todoInit, action) => {
  switch (action.type) {
    case ADD_TODO:
      return state;
    case COMPLETE_TODO:
      const newState = state.map(todo => {
        if (todo.id === action.id) {
          todo.isCompleted = !todo.isCompleted;
        }
        return todo;
      });
      console.log(newState);
      return newState;
    default:
      return state;
  }
};
