import * as React from 'react';
import StackNavigation from './src/screens/StackNavigation/StackNavigation';
import {Provider} from 'react-redux';
import {store} from './src/store/Store';
import {PaperProvider} from 'react-native-paper';

function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <StackNavigation />
      </PaperProvider>
    </Provider>
  );
}

export default App;
