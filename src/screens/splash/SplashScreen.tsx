import React, {useEffect} from 'react';
import {Image, StyleSheet, StatusBar, View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import {RootState, AppDispatch} from '../../store/Store';
import {setConnectionStatus} from '../../store/Slice/NetworkSlice';
import {Colors} from '../../utils/Colors';
import {dot, Slan} from '../../utils/assets';
import {Config} from '../../utils/Config';
import {useNavigation} from '@react-navigation/native';
import {
  scale as s,
  verticalScale as vh,
  moderateScale as ms,
} from 'react-native-size-matters';


const SplashScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isConnected = useSelector(
    (state: RootState) => state.network.isConnected,
  );
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      dispatch(setConnectionStatus(state.isConnected));
    });

    const timer = setTimeout(() => {
      navigation.navigate('Onboarding');
    }, 3000);

    return () => {
      unsubscribe();
      clearTimeout(timer);
    };
  }, [dispatch, navigation]);

  return (
    <View style={styles.container}>
      {!isConnected && (
        <Text style={styles.ConnectionTxt}>{Config.InternetTxt}</Text>
      )}

      <StatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        hidden={false}
        translucent={true}
      />

      <Image source={Slan} />
      {!isConnected && (
        <Image source={dot} style={{height: vh(50), resizeMode: 'cover'}} />
      )}
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
