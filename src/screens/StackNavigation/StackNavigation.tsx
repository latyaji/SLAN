import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';

import Home from '../homedashboard/Home';
import {
  Forgot,
  Internet,
  Login,
  Onboarding,
  OtpVerfication,
  Play,
  Settings,
  Signup,
  SplashScreen,
  Track,
} from '../index';
import LoginWithOtp from '../login/LoginWithOtp';
import LoginOtpVerification from '../login/LoginOtpVerification';

import {setIsloggedin, setLogintoken} from '../../store/Slice/LoginSlice';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/Store';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BottomTab from '../BottomNavigation/BottomTab';

const Stack = createNativeStackNavigator();

function StackNavigation() {
  const dispatch = useDispatch<AppDispatch>();
  const {isLoggedin, accesstoken} = useSelector(
    (state: RootState) => state.login,
  );

  const tokenStore = async () => {
    const getToken = await AsyncStorage.getItem('TOKEN');
    if(getToken){
      dispatch(setLogintoken(getToken));
      dispatch(setIsloggedin(true))
    }else{
      dispatch(setIsloggedin(false))
    }
    
  };
  useEffect(() => {
    tokenStore();
    console.log('calleeddd', isLoggedin);
  },[]);

  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!isLoggedin ? (
          <>
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="Onboarding" component={Onboarding} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="OtpVerfication" component={OtpVerfication} />
            <Stack.Screen name="Forgot" component={Forgot} />
            <Stack.Screen name="LoginWithOtp" component={LoginWithOtp} />
            <Stack.Screen name="LoginOtpVerification" component={LoginOtpVerification} />
            <Stack.Screen name="Internet" component={Internet} />
          </>
        ) : (
          <>
            <Stack.Screen name="BottomTab" component={BottomTab} />
            
            
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );


}

export default StackNavigation;
