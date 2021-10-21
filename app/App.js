import React from 'react';
import {View, Text} from 'react-native';
import TodoContainer from './containers/TodoContainer';
import store from './redux/store/store';
import {Provider} from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <TodoContainer />
    </Provider>
  );
};

export default App;
