import {ADD_TODO} from '../actions/actions';
import {Alert} from 'react-native';

export default store => next => action => {
  if (action.type === ADD_TODO) {
    if (action.content.trim() !== '') {
      if (action.typeTodo.trim() === '') action.typeTodo = '✏️ New task';
      return next(action);
    } else {
      Alert.alert('Oops📢', 'Looks like the task is empty💬', [
        {text: 'OK', onPress: () => null},
      ]);
    }
  } else return next(action);
};
