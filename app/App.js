import React from 'react';
import MyProviderContext from './context/context';
import ProviderStore from './ProviderStore';

const App = () => {
  return (
    <MyProviderContext>
      <ProviderStore />
    </MyProviderContext>
  );
};

export default App;
