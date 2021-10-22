import {connect} from 'react-redux';
import TodoScreen from '../components/TodoScreen';
import {addTodo, completeTodo, removeTodo} from '../redux/actions/actions';

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
};

export default connect(mapStateToProps, mapActionToProps)(TodoScreen);
