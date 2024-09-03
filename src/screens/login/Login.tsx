import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {
  scale as s,
  verticalScale as vh,
  moderateScale as ms,
} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../../component/Button';
import Header from '../../component/Header';
import TextField from '../../component/TextField';
import {
  setIsloggedin,
  setLoginPassword,
  setLoginPhone,
} from '../../store/Slice/LoginSlice';
import {AppDispatch, RootState} from '../../store/Store';
import {lockIcon, phoneIcon} from '../../utils/assets';
import {Colors} from '../../utils/Colors';
import {Config} from '../../utils/Config';
import {globalStyles} from '../../utils/GlobalCss';

const Login = ({navigation: {goBack}}: any) => {
  const navigation = useNavigation();
  const [selectedValue, setSelectedValue] = useState('option1');
  const [loginMsg, setLoginMsg] = useState({text: '', type: ''});

  const dispatch = useDispatch<AppDispatch>();

  const {loginPhone, loginPassword} = useSelector(
    (state: RootState) => state.login,
  );

  const loginapi = () => {
    axios
      .post(
        'https://dev-slansports.azurewebsites.net/Account/LogOn/primary',
        {
          UserName: loginPhone,
          Password: loginPassword,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(response => {
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
        setLoginMsg({text: 'Incorrect User Name (or) Passcode', type: 'error'});
        console.log('Error message: ', error.message);
      });
  };

  const isFormValid = () => {
    return loginPhone.trim().length === 10 && loginPassword.trim().length === 4;
  };

  const otpVerify = () => {
    setSelectedValue('option2');
    navigation.navigate('LoginWithOtp');
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
        
        <View style={styles.radioGroup}>
          <View style={styles.radioButton}>
            <RadioButton.Android
              value="option1"
              status={selectedValue === 'option1' ? 'checked' : 'unchecked'}
              onPress={() => setSelectedValue('option1')}
              color={Colors.Orange}
            />
            <Text style={styles.radioLabel}>{Config.passcode}</Text>
          </View>

          <View style={styles.radioButton}>
            <RadioButton.Android
              value="option2"
              status={selectedValue === 'option2' ? 'checked' : 'unchecked'}
              onPress={() => otpVerify()}
              color={Colors.Orange}
            />
            <Text style={styles.radioLabel}>{Config.otp}</Text>
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
          <Text style={styles.forgottxt}>{Config.forgotpassword}</Text>
        </TouchableOpacity>
        <Button
          tittle={Config.login}
          onPress={loginapi}
          disabled={!isFormValid()}
        />
        <View style={[globalStyles.centerTxt, {marginTop: vh(5)}]}>
          <Text style={globalStyles.regulareTxt}>
            {Config.newuser}
            {'  '}
            <Text
              style={globalStyles.boldblueTxt}
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
              
            }}>
            {loginMsg.type !== 'success' && (
              <Icon
                name="warning"
                size={22}
                color={'#FFCE31'}
              />
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

const styles = StyleSheet.create({
  radioGroup: {
    flexDirection: 'row',
    marginTop: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  radioLabel: {
    fontSize: s(15),
    color: Colors.black,
    fontFamily: Config.medium,
  },
  forgottxt: {
    fontFamily: Config.medium,
    fontSize: s(12),
    alignSelf: 'flex-end',
    color: Colors.lightOrange,
  },
});
