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




// import React from 'react';
// import {StyleSheet} from 'react-native';
// import HTMLView from 'react-native-htmlview';

// class App extends React.Component {
//   render() {
//     const htmlContent = `<p><a href="http://jsdf.co">&hearts; nice job!</a></p>`;

//     return (
//       <HTMLView
//         value={htmlContent}
//         stylesheet={styles}
//       />
//     );
//   }
// }

// const styles = StyleSheet.create({
//   a: {
//     fontWeight: '300',
//     color: '#FF3366', // make links coloured pink
//   },
// });

// export default App