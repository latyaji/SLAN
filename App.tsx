// import React,{useEffect} from 'react';
// import StackNavigation from './src/screens/StackNavigation/StackNavigation';
// import {Provider} from 'react-redux';
// import {store} from './src/store/Store';
// import {PaperProvider} from 'react-native-paper';
// import { StatusBar, Text } from 'react-native';
// import { initializeNetworkListener } from './src/store/Slice/NetworkSlice';
// import {useNetInfo} from "@react-native-community/netinfo";

// function App() {
//   const netInfo = useNetInfo();
//   useEffect(() => {
//     const unsubscribe = store.dispatch(initializeNetworkListener());

//     return () => unsubscribe();
//   }, []);

//   return (
//     <Provider store={store}>
//        <StatusBar
//         backgroundColor="transparent"
//         translucent={true}
//         barStyle={'dark-content'}
//       />
//       <PaperProvider>
//         {netInfo.isConnected?.toString() === true ?  <StackNavigation /> : <Text>{netInfo.isConnected?.toString()}</Text>}

//       </PaperProvider>
//     </Provider>
//   );
// }

// export default App;

import React, {useEffect} from 'react';
import {StatusBar, Text, View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import StackNavigation from './src/screens/StackNavigation/StackNavigation';
import {Provider} from 'react-redux';
import {store} from './src/store/Store';
import {PaperProvider} from 'react-native-paper';
import {useNetInfo} from '@react-native-community/netinfo';
import {Internet, Onboarding, SplashScreen} from './src/screens';

const Stack = createNativeStackNavigator();

function App() {
  const netInfo = useNetInfo();
  console.log('netInfo----', netInfo.isInternetReachable);

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
            // <Text style={styles.networkText}>No internet connection</Text>
            <Internet/>
          )}
        </View>
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  networkText: {
    fontSize: 18,
    color: 'red',
    marginTop: 30,
  },
});

export default App;

// import React from "react";
// import {View,Text} from "react-native"
// import {useNetInfo} from "@react-native-community/netinfo";

// const App = () => {
//   const netInfo = useNetInfo();

//   return (
//     <View>
//       <Text>Check Connection</Text>
//       <View>
//       <Text>Type: {netInfo.type}</Text>
//       <Text>Is Connected? {netInfo.isConnected?.toString()}</Text>
//     </View>
//     </View>
//   )
// }

// export default App
