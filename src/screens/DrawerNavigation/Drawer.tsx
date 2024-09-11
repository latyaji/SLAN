import AsyncStorage from '@react-native-async-storage/async-storage';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { vs } from 'react-native-size-matters';
import { useDispatch } from 'react-redux';
import DrawerListContainer from '../../component/DrawerListContainer';
import { clearLoginData } from '../../store/Slice/LoginSlice';
import { Colors } from '../../utils/Colors';
import { Config } from '../../utils/Config';
import { globalStyles } from '../../utils/GlobalCss';
import { about, contact, logo, logoutIcon, notification, password, payment, preference, profileuser, sports } from '../../utils/assets';

function Myprofile() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Myprofile Screen</Text>
    </View>
  );
}


function CustomDrawerContent() {
  const dispatch = useDispatch();

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('TOKEN');
    } catch (exception) {
      console.log('exception====>>>', exception);
    }
    dispatch(clearLoginData());
    // props.navigation.navigate('Login'); 
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
