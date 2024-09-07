import * as React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Header } from '../../component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { clearLoginData } from '../../store/Slice/LoginSlice';
import { globalStyles } from '../../utils/GlobalCss';
import { Colors } from '../../utils/Colors';
import { about, Banner, contact, logo, logoutIcon, notification, password, payment, preference, profileuser, sports, userIcon } from '../../utils/assets';
import { s, vs } from 'react-native-size-matters';
import DrawerListContainer from '../../component/DrawerListContainer';
import { Config } from '../../utils/Config';
import { ScrollView } from 'react-native-gesture-handler';

function Myprofile() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Myprofile Screen</Text>
    </View>
  );
}


function CustomDrawerContent(props) {
  const dispatch = useDispatch();

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('TOKEN');
    } catch (exception) {
      console.log('exception====>>>', exception);
    }
    dispatch(clearLoginData());
    // Optionally navigate to a login screen or home screen after logout
    props.navigation.navigate('Login'); // Adjust based on your navigation setup
  };

  return (
    <View style={{flex:1}}>
      <View style={styles.topContainer}>
        <Image source={logo} style={styles.profileLogo}/>
      <Text style={[globalStyles.regulareTxt,{color:Colors.White,marginLeft:12}]}>GouthamK</Text>
      </View>
     <ScrollView>
     <DrawerListContainer tittle={Config.myprofile} Icon={profileuser}/>
      <DrawerListContainer tittle={Config.sportskilllevel} Icon={sports}/>
      <DrawerListContainer tittle={Config.mypreferences} Icon={preference}/>
      <DrawerListContainer tittle={Config.contactus} Icon={contact}/>
      <DrawerListContainer tittle={Config.about} Icon={about}/>
      <DrawerListContainer tittle={Config.mypayments} Icon={payment}/>
      <DrawerListContainer tittle={Config.setpasscode} Icon={password}/>
      <DrawerListContainer tittle={Config.notifications} Icon={notification}/>
      <DrawerListContainer tittle={Config.logout} Icon={logoutIcon} onPress={logout}/>
     </ScrollView>
     
      
    </View>
  );
}





const Drawer = createDrawerNavigator();


export default function DrawerNavigation() {
  return (
      <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="My Profile" component={Myprofile} />
      {/* <Drawer.Screen name="Logout" component={Logout} /> */}
    </Drawer.Navigator>
  );
}



const styles = StyleSheet.create({
  topContainer:{height:vs(150),backgroundColor:Colors.Orange,alignItems:"center",flexDirection:"row"},
  profileLogo:{resizeMode:"contain",width:50,height:50,marginLeft:12}
 
})




































// import * as React from 'react';
// import { Drawer } from 'react-native-paper';
// import { Header } from '../../component';
// import { Config } from '../../utils/Config';

// const DrawerNavigation = () => {
//   const [active, setActive] = React.useState('');

//   return (
//    <>
   
//    <Header showImage={true} tittle={Config.otpVerfication} backImage={false}/>
//     <Drawer.Section title="Profile" theme={{ colors: { primary: 'green' } }} showDivider={true}>
     
//       <Drawer.Item
//       style={{ borderBottomWidth:1 }}
//       icon="camera"
//       label="My Profile"
       
//         active={active === 'first'}
//         onPress={() => setActive('first')}
//       />
//       <Drawer.Item
//         label="Second Item"
        
//         //active={active === 'second'}
//         onPress={() => setActive('second')}
//       />
//       <Drawer.Item
//         label="Second Item"
//         //active={active === 'second'}
//         onPress={() => setActive('second')}
//       />
//       <Drawer.Item
//         label="Second Item"
//         //active={active === 'second'}
//         onPress={() => setActive('second')}
//       />
//       <Drawer.Item
//         label="Second Item"
//        // active={active === 'second'}
//         onPress={() => setActive('second')}
//       />
//       <Drawer.Item
//         label="Second Item"
//         //active={active === 'second'}
//         onPress={() => setActive('second')}
//       />
//     </Drawer.Section>
//    </>
//   );
// };

// export default DrawerNavigation;





















// import React from 'react';
// import { View, StyleSheet } from 'react-native';
// import {
//   DrawerItem,
//   DrawerContentScrollView,
// } from '@react-navigation/drawer';
// import {
//   useTheme,
//   Avatar,
//   Title,
//   Caption,
//   Paragraph,
//   Drawer,
//   Text,
//   TouchableRipple,
//   Switch,
// } from 'react-native-paper';
// import Icon from 'react-native-vector-icons/EvilIcons';
// // import Icon from 'react-native-vector-icons/EvilIcons';


// const DrawerNavigation = ({props}:any) => {
//   return (
//     <DrawerContentScrollView {...props}>
//       <View
//         style={
//           styles.drawerContent
//         }
//       >
//         <View style={styles.userInfoSection}>
//           <Avatar.Image
//             source={{
//               uri:
//                 'https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg',
//             }}
//             size={50}
//           />
//           <Title style={styles.title}>Dawid Urbaniak</Title>
//           <Caption style={styles.caption}>@trensik</Caption>
//           <View style={styles.row}>
//             <View style={styles.section}>
//               <Paragraph style={[styles.paragraph, styles.caption]}>
//                 202
//               </Paragraph>
//               <Caption style={styles.caption}>Following</Caption>
//             </View>
//             <View style={styles.section}>
//               <Paragraph style={[styles.paragraph, styles.caption]}>
//                 159
//               </Paragraph>
//               <Caption style={styles.caption}>Followers</Caption>
//             </View>
//           </View>
//         </View>
//         <Drawer.Section style={styles.drawerSection}>
//           <DrawerItem
//             icon={({ color, size }) => (
//               <Icon
//                 name="user"
//                 color={"#000"}
//                 size={size}
//               />
//             )}
//             label="My Profile"
//             onPress={() => {}}
//           />
//           <DrawerItem
//             // icon={({ color, size }) => (
//             //   <Icon name="tune" color={color} size={size} />
//             // )}
//             label="Preferences"
//             onPress={() => {}}
//           />
//           <DrawerItem
//             icon={({ color, size }) => (
//               <Icon name="delete" size={20} color={'#000'} />
//             )}
//             label="Bookmarks"
//             onPress={() => {}}
//           />
//         </Drawer.Section>
//         <Drawer.Section title="Preferences">
//           <TouchableRipple onPress={() => {}}>
//             <View style={styles.preference}>
//               <Text>Dark Theme</Text>
//               <View pointerEvents="none">
//                 <Switch value={false} />
//               </View>
//             </View>
//           </TouchableRipple>
//           <TouchableRipple onPress={() => {}}>
//             <View style={styles.preference}>
//               <Text>RTL</Text>
//               <View pointerEvents="none">
//                 <Switch value={false} />
//               </View>
//             </View>
//           </TouchableRipple>
//         </Drawer.Section>
//       </View>
//     </DrawerContentScrollView>
//   );
// }

// export default DrawerNavigation

// const styles = StyleSheet.create({
//   drawerContent: {
//     flex: 1,
//     width:"70%",
//     backgroundColor:"#fff"
//   },
//   userInfoSection: {
//     paddingLeft: 20,
//   },
//   title: {
//     marginTop: 20,
//     fontWeight: 'bold',
//   },
//   caption: {
//     fontSize: 14,
//     lineHeight: 14,
//   },
//   row: {
//     marginTop: 20,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   section: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginRight: 15,
//   },
//   paragraph: {
//     fontWeight: 'bold',
//     marginRight: 3,
//   },
//   drawerSection: {
//     marginTop: 15,
//   },
//   preference: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//   },
// });