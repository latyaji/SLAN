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







// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
// } from 'react-native';

// const App = () => {
//   const [selectedradio, setSelectedRadio] = useState(1);
//   return (
//     <View style={styles.container}>
//       <TouchableOpacity
//         onPress={() => setSelectedRadio(1)}
//         style={styles.btncontainer}>
//         <View style={styles.btnbox}>
//           {selectedradio == 1 ? <View style={styles.btnboxbg}></View> : null}
//         </View>
//         <Text style={styles.radiotxt}>By Events</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         onPress={() => setSelectedRadio(2)}
//         style={styles.btncontainer}>
//         <View style={styles.btnbox}>
//           {selectedradio == 2 ? <View style={styles.btnboxbg}></View> : null}
//         </View>
//         <Text style={styles.radiotxt}>By Sports</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         onPress={() => setSelectedRadio(3)}
//         style={styles.btncontainer}>
//         <View style={styles.btnbox}>
//           {selectedradio == 3 ? <View style={styles.btnboxbg}></View> : null}
//         </View>
//         <Text style={styles.radiotxt}>By Month</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };
// export default App;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "space-evenly",
//     alignItems: 'center',
//     flexDirection:"row"
//   },

//   btncontainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   btnbox: {
//     width: 20,
//     height: 20,
//     borderWidth: 2,
//     borderColor: '#000',
//     borderRadius: 20,
//   },
//   btnboxbg: {
//     width: 10,
//     height: 10,
//     backgroundColor: 'red',
//     borderRadius: 20,
//     margin: 3,
//   },
//   radiotxt: {
//     marginLeft: 20,
//   },
// });



























// import * as React from 'react';
// import { List } from 'react-native-paper';

// const App = () => {
//   const [expanded, setExpanded] = React.useState(true);

//   const handlePress = () => setExpanded(!expanded);

//   return (
//     <List.Section>
//       <List.Accordion
//         title="Rules & Regulations"
//         // left={props => <List.Icon {...props} icon="folder" />}
//         expanded={expanded}
//         onPress={handlePress}>
//         <List.Item
//         //title="First item"
//         description="Lorem ipsum dolor sit amet . The graphic and typographic operators know this well, in reality all the professions dealing with the universe of communication have a stable relationship with these words, but what is it? Lorem ipsum is a dummy text without any sense."
//         />
//         {/* <List.Item title="Second item" /> */}
//       </List.Accordion>
//     </List.Section>
//   );
// };

// export default App;
