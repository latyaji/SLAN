import { useNetInfo } from '@react-native-community/netinfo';
import React from 'react';
import { StatusBar, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { Internet } from './src/screens';
import StackNavigation from './src/screens/StackNavigation/StackNavigation';
import { store } from './src/store/Store';

function App() {
  const netInfo = useNetInfo();
  // console.log("checkkkkkk",JSON.stringify(netInfo,null,2))
  // console.log('netInfo----', netInfo.isInternetReachable);

  return (
    <Provider store={store}>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle="dark-content"
      />
      <PaperProvider>
        <View style={{flex:1}}>
          {netInfo.isInternetReachable ? (
            <StackNavigation/>
          ) : (
            <Internet/>
          )}
        </View>
      </PaperProvider>
    </Provider>
  );
}

export default App;
