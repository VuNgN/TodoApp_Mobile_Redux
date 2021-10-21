export const ADD_TODO = 'ADD_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';

export const addTodo = (content, type) => ({
  type: ADD_TODO,
  content: content,
  typeTodo: type,
});

export const completeTodo = id => ({
  type: COMPLETE_TODO,
  id: id,
});
