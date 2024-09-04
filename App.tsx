import React,{useEffect} from 'react';
import StackNavigation from './src/screens/StackNavigation/StackNavigation';
import {Provider} from 'react-redux';
import {store} from './src/store/Store';
import {PaperProvider} from 'react-native-paper';
import { StatusBar } from 'react-native';
import { initializeNetworkListener } from './src/store/Slice/NetworkSlice';

function App() {
  
  useEffect(() => {
    // Start network listener
    const unsubscribe = store.dispatch(initializeNetworkListener());

    // Cleanup on unmount
    return () => unsubscribe();
  }, []);

  return (
    <Provider store={store}>
       <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle={'dark-content'}
      />
      <PaperProvider>
        <StackNavigation />
      </PaperProvider>
    </Provider>
  );
}

export default App;
