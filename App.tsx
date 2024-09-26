import { useNetInfo } from '@react-native-community/netinfo';
import React from 'react';
import { LogBox, StatusBar, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { Internet } from './src/screens';
import StackNavigation from './src/screens/StackNavigation/StackNavigation';
import { store } from './src/store/Store';


LogBox.ignoreAllLogs();



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









// import React, { useState } from 'react';
// import { View, Button, Text } from 'react-native';
// import DocumentPicker from 'react-native-document-picker';

// const App = () => {
//   const [file, setFile] = useState(null);

//   const pickDocument = async () => {
//     try {
//       const res = await DocumentPicker.pick({
//         type: [DocumentPicker.types.allFiles], // You can specify types here
//       });
//       setFile(res[0]); // Access the first file from the array
//     } catch (err) {
//       if (DocumentPicker.isCancel(err)) {
//         console.log('User canceled the picker');
//       } else {
//         console.error('Error picking document: ', err);
//       }
//     }
//   };

//   console.log("file----", file);

//   return (
//     <View style={{ padding: 20 }}>
//       <Button title="Pick Document" onPress={pickDocument} />
//       {file && (
//         <Text>
//           Selected File: {file.name}
//         </Text>
//       )}
//     </View>
//   );
// };

// export default App;

