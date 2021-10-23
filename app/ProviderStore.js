import React, {useContext, useEffect} from 'react';
import TodoContainer from './containers/TodoContainer';
import TodoContainerDarkMode from './containers/TodoContainerDarkMode';
import store from './redux/store/store';
import {Provider} from 'react-redux';
import {MyContext} from './context/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProviderStore = () => {
  const {isDarkMode, changeIsDarkMode} = useContext(MyContext);
  useEffect(() => {
    (async isDarkMode => {
      try {
        const value = await AsyncStorage.getItem('darkMode');
        if (value !== null) {
          changeIsDarkMode(value === 'true');
        }
      } catch (e) {
        console.log(e);
      }
    })(isDarkMode);
  }, []);
  return (
    <Provider store={store}>
      {isDarkMode ? <TodoContainerDarkMode /> : <TodoContainer />}
    </Provider>
  );
};

export default ProviderStore;
