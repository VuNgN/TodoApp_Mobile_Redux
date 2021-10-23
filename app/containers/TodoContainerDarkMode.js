import {connect} from 'react-redux';
import TodoScreenDarkMode from '../components/TodoScreenDarkMode';
import {
  addTodo,
  completeTodo,
  removeTodo,
  updateTodo,
} from '../redux/actions/actions';

const mapStateToProps = state => {
  return {
    incomplete: state.todos.todos.filter(data => !data.isCompleted),
    completed: state.todos.todos.filter(data => data.isCompleted),
  };
};

const mapActionToProps = {
  addTodo,
  completeTodo,
  removeTodo,
  updateTodo,
};

export default connect(mapStateToProps, mapActionToProps)(TodoScreenDarkMode);
