import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, StatusBar, StyleSheet, View } from 'react-native';
import {
  scale as s,
  verticalScale as vh
} from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/Store';
import { Slan } from '../../utils/assets';
import { Colors } from '../../utils/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SplashScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isConnected = useSelector(
    (state: RootState) => state.network.isConnected,
  );
  const [isCheckingConnection, setIsCheckingConnection] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    // const unsubscribe = NetInfo.addEventListener(state => {
    //   dispatch(setConnectionStatus(state.isConnected));
    // });
    AsyncStorage.setItem('Spalshscreenshowfirsttime', 'true');

    const timer = setTimeout(() => {
      navigation.navigate('Onboarding');
    }, 3000);

    return () => {
      //unsubscribe();
      clearTimeout(timer);
    };
  }, [dispatch, navigation]);


 
  return (
    <View style={styles.container}>
      {/* {!isConnected && (
        <Text style={styles.ConnectionTxt}>{Config.InternetTxt}</Text>
      )} */}

      <StatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        hidden={false}
        translucent={true}
      />

      <Image source={Slan} />
      {/* {!isConnected && (
        <Image source={dot} style={{height: vh(50), resizeMode: 'cover'}} />
      )} */}
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.Orange,
  },
  ConnectionTxt: {
    position: 'absolute',
    bottom: 0,
    color: Colors.White,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: vh(20),
    fontSize: s(17),
  },
});
