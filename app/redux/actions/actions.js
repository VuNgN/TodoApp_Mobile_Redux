export const ADD_TODO = 'ADD_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';

export const addTodo = (content, type) => ({
  type: ADD_TODO,
  content: content,
  typeTodo: type,
});

export const completeTodo = id => ({
  type: COMPLETE_TODO,
  id: id,
});

export const removeTodo = id => ({
  type: REMOVE_TODO,
  id: id,
});

export const updateTodo = todos => ({
  type: UPDATE_TODO,
  todos: todos,
});
