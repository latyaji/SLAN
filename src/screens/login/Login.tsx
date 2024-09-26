import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import {
  scale as s,
  verticalScale as vh
} from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../component/Button';
import Header from '../../component/Header';
import TextField from '../../component/TextField';
import {
  setIsloading,
  setIsloggedin,
  setLoginPassword,
  setLoginPhone,
} from '../../store/Slice/LoginSlice';
import { AppDispatch, RootState } from '../../store/Store';
import apiInstance from '../../utils/apiInstance';
import { lockIcon, phoneIcon, warning } from '../../utils/assets';
import { Colors } from '../../utils/Colors';
import { Config } from '../../utils/Config';
import { globalStyles } from '../../utils/GlobalCss';

const Login = ({navigation: {goBack}}: any) => {
  const navigation = useNavigation();
  const [loginMsg, setLoginMsg] = useState({text: '', type: ''});
  const [selectedradio, setSelectedRadio] = useState(1);

  const dispatch = useDispatch<AppDispatch>();

  const {loginPhone, loginPassword} = useSelector(
    (state: RootState) => state.login,
  );

  const loginapi = () => {
    dispatch(setIsloading(true));
    apiInstance
      .post(
        'Account/LogOn/primary',
        {
          UserName: loginPhone,
          Password: loginPassword,
        }
      )
      .then(response => {
        dispatch(setIsloading(false));
        if (response.data) {
          if (response.data.access_token) {
            AsyncStorage.setItem('TOKEN', response.data.access_token);
            setLoginMsg({text: Config.loginSuccessmsg, type: 'success'});
          } else {
            setLoginMsg({text: Config.incorrectUser, type: 'failed'});
          }
        }
      })
      .catch(error => {
        dispatch(setIsloading(false));
        setLoginMsg({text: 'Incorrect User Name (or) Passcode', type: 'error'});
        console.log('Error message: ', error.message);
      });
  };

  const isFormValid = () => {
    return loginPhone.trim().length === 10 && loginPassword.trim().length === 4;
  };



  useEffect(() => {
    if (loginMsg.text) {
      const timer = setTimeout(() => {
        setLoginMsg({text: '', type: ''});
        if (loginMsg.type === 'success') {
          dispatch(setIsloggedin(true));
        }
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [loginMsg]);

  return (
    <View>
      <Header
        showImage={true}
        tittle={Config.otpVerfication}
        onPress={() => goBack()}
      />
      <View style={globalStyles.screenSpacing}>
        <Text style={globalStyles.largeTxt}>{Config.enterlogindetails}</Text>
        <TextField
          placeholder={Config.enterPhone}
          source={phoneIcon}
          keyboardType={'phone-pad'}
          value={loginPhone}
          onChangeTxt={text => dispatch(setLoginPhone(text))}
          maxLength={10}
          mobilno={'+91-'}
        />
        {/* {loginMsg.type !== 'success' && <Text style={globalStyles.errormsg}>{Config.entercorrectmobile}</Text> } */}

        <View style={globalStyles.radionbtnConatiner}>
          <View style={globalStyles.btncontainer}>
            <TouchableOpacity
              onPress={() => setSelectedRadio(1)}
              style={[globalStyles.btnbox,{borderColor: selectedradio == 1 ? Colors.Orange : Colors.bordergrey}]}>
              {selectedradio == 1 ? (
                <View style={globalStyles.btnboxbg}></View>
              ) : null}
            </TouchableOpacity>
            <Text style={globalStyles.radiotxt}>{Config.passcode}</Text>
          </View>
          <View style={[globalStyles.btncontainer,{marginLeft:s(40)}]}>
            <TouchableOpacity
              onPress={() => setSelectedRadio(2)}
              style={[globalStyles.btnbox,{borderColor: selectedradio == 2 ? Colors.Orange : Colors.bordergrey}]}>
              {selectedradio == 2 ? (
                <View style={globalStyles.btnboxbg}></View>
              ) : null}
            </TouchableOpacity>
            <Text style={globalStyles.radiotxt}>{Config.otp}</Text>
          </View>
        </View>

        <TextField
          placeholder={Config.enterpasscode}
          source={lockIcon}
          value={loginPassword}
          onChangeTxt={text => dispatch(setLoginPassword(text))}
          secureTextEntry={true}
          maxLength={4}
        />
        <TouchableOpacity onPress={() => navigation.navigate('Forgot')}>
          <Text style={globalStyles.forgottxt}>{Config.forgotpassword}</Text>
        </TouchableOpacity>
        <Button
          tittle={Config.login}
          onPress={loginapi}
          disabled={!isFormValid()}
        />
        <View style={globalStyles.centerTxt}>
          <Text style={globalStyles.alreadyTxt}>
            {Config.newuser}
            {'  '}
            <Text
              style={globalStyles.smallbluetxt}
              onPress={() => navigation.navigate('Signup')}>
              {Config.createaccount}
            </Text>
          </Text>
        </View>
        {loginMsg.text && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: vh(16),
            }}>
              
            {loginMsg.type !== 'success' && (
              <Image source={warning}/>
            )}
            <Text
              style={
                loginMsg.type === 'success'
                  ? globalStyles.loginSuccessMsg
                  : globalStyles.loginFailedMsg
              }>
              {loginMsg.text}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default Login;


