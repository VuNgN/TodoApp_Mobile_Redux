import todoInit from '../init/todoInit';
import {
  ADD_TODO,
  COMPLETE_TODO,
  REMOVE_TODO,
  UPDATE_TODO,
} from '../actions/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

const storeData = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('todosData', jsonValue);
  } catch (e) {
    console.log(e);
  }
};
export default (state = todoInit, action) => {
  const todoId = uuid.v4();
  let newState = [];
  switch (action.type) {
    case ADD_TODO:
      newState = {
        ...state,
        todos: [
          ...state.todos,
          {
            id: todoId,
            content: action.content,
            type: action.typeTodo,
            isCompleted: false,
          },
        ],
      };
      storeData(newState);
      return newState;
    case COMPLETE_TODO:
      newState = {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === action.id) {
            todo.isCompleted = !todo.isCompleted;
          }
          return todo;
        }),
      };
      storeData(newState);
      return newState;
    case REMOVE_TODO:
      newState = {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.id),
      };
      storeData(newState);
      return newState;
    case UPDATE_TODO:
      newState = {
        ...state,
        todos: action.todos.todos,
      };
      return newState;
    default:
      return state;
  }
};
