import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useLayoutEffect } from 'react';

import {
  AddParticipant,
  AddPartner,
  AddTeam,
  AllEvents,
  DrawerNavigation,
  Esporttournamnet,
  Forgot,
  Login,
  Onboarding,
  OtpVerfication,
  SelectParticipants,
  Signup,
  SplashScreen,
  ViewAllMatches,
  ViewAllTournaments
} from '../index';
import LoginOtpVerification from '../login/LoginOtpVerification';
import LoginWithOtp from '../login/LoginWithOtp';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { setIsloggedin, setLogintoken,setfirstInstallSplashScreen } from '../../store/Slice/LoginSlice';
import { AppDispatch, RootState } from '../../store/Store';

import BottomTab from '../BottomNavigation/BottomTab';
import Loader from '../../component/Loader';

const Stack = createNativeStackNavigator();

function StackNavigation() {
  const dispatch = useDispatch<AppDispatch>();
  const {isLoggedin, loader,firstInstallSplashScreen} = useSelector(
    (state: RootState) => state.login,
  );

  const tokenStore = async () => {
    const getToken = await AsyncStorage.getItem('TOKEN');
    if (getToken) {
      dispatch(setLogintoken(getToken));
      dispatch(setIsloggedin(true));
    } else {
      dispatch(setIsloggedin(false));
    }
  };
  useEffect(() => {
    tokenStore();
  }, []);

 

  useLayoutEffect(() => {
     tokenStore();
    AsyncStorage.getItem('Spalshscreenshowfirsttime').then(value => {
      value && dispatch(setfirstInstallSplashScreen(true));
    });
  }, []);

  return (
    <NavigationContainer>
       {loader && <Loader/>}
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!isLoggedin ? (
          <>
           {!firstInstallSplashScreen && (<Stack.Screen name="SplashScreen" component={SplashScreen} />)}
            <Stack.Screen name="Onboarding" component={Onboarding} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="OtpVerfication" component={OtpVerfication} />
            <Stack.Screen name="Forgot" component={Forgot} />
            <Stack.Screen name="LoginWithOtp" component={LoginWithOtp} />
            <Stack.Screen
              name="LoginOtpVerification"
              component={LoginOtpVerification}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="BottomTab" component={BottomTab} />
            <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} />
            <Stack.Screen
              name="ViewAllTournaments"
              component={ViewAllTournaments}
            />
              <Stack.Screen
              name="Esporttournamnet"
              component={Esporttournamnet}
            />
              <Stack.Screen
              name="SelectParticipants"
              component={SelectParticipants}
            />
              <Stack.Screen
              name="AddParticipant"
              component={AddParticipant}
            />
              <Stack.Screen
              name="AddTeam"
              component={AddTeam}
            />
              <Stack.Screen
              name="AddPartner"
              component={AddPartner}
            />
              <Stack.Screen
              name="AllEvents"
              component={AllEvents}
            />
              <Stack.Screen
              name="ViewAllMatches"
              component={ViewAllMatches}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigation;
