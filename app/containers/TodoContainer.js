import {connect} from 'react-redux';
import TodoScreen from '../components/TodoScreen';
import {addTodo, completeTodo} from '../redux/actions/actions';

const mapStateToProps = state => {
  return {
    incomplete: state.todos.filter(data => !data.isCompleted),
    completed: state.todos.filter(data => data.isCompleted),
  };
};

const mapActionToProps = {
  addTodo,
  completeTodo,
};

export default connect(mapStateToProps, mapActionToProps)(TodoScreen);
