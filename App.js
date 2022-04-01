import React from 'react';
import AuthLoading from './src/navigation';
import {store, persistor } from './src/store';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';


const App= () => {
  return (
     <Provider store={store}>
     <PersistGate persistor={persistor}>
     <AuthLoading  />
      
     </PersistGate>
     </Provider>
  );
};

export default App;
