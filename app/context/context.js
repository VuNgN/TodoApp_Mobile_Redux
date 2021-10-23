import React, {useEffect, useState} from 'react';
export const MyContext = React.createContext();
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyProviderContext = props => {
  const [isDarkMode, changeIsDarkMode] = useState(false);
  useEffect(() => {
    (async value => {
      try {
        await AsyncStorage.setItem('darkMode', value ? 'true' : 'false');
      } catch (e) {
        console.log(e);
      }
    })(isDarkMode);
  }, [isDarkMode]);
  return (
    <MyContext.Provider
      value={{
        isDarkMode: isDarkMode,
        changeIsDarkMode,
      }}>
      {props.children}
    </MyContext.Provider>
  );
};

export default MyProviderContext;
