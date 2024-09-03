import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../../component/Button';
import Header from '../../component/Header';
import TextField from '../../component/TextField';
import {
  clearLoginData,
  setIsloggedin,
  setLoginPassword,
  setLoginPhone,
} from '../../store/Slice/LoginSlice';
import {AppDispatch, RootState} from '../../store/Store';
import {lockIcon, phoneIcon, Warn} from '../../utils/assets';
import {Colors} from '../../utils/Colors';
import {Config} from '../../utils/Config';
import {globalStyles} from '../../utils/GlobalCss';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {s} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';

const Login = ({navigation: {goBack}}) => {
  const navigation = useNavigation();
  const [checked, setChecked] = React.useState('first');
  const [selectedValue, setSelectedValue] = useState('option1');
  // const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [loginMsg, setLoginMsg] = useState({text: '', type: ''});

  const dispatch = useDispatch<AppDispatch>();

  const {loginPhone, loginPassword, isLoggedin} = useSelector(
    (state: RootState) => state.login,
  );

  const apicall = () => {
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
        //navigation.navigate('Signup');
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
        setLoginMsg({text: '', type: ''}); // Hide the message after 2 seconds
        if (loginMsg.type === 'success') {
          dispatch(setIsloggedin(true));
          // navigation.navigate('NextScreen'); // Navigate to the next screen (replace 'NextScreen' with the actual screen name)
        }
      }, 3000);

      return () => clearTimeout(timer); // Cleanup the timer on component unmount or when message changes
    }
  }, [loginMsg, navigation]);

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
          mobilno={"+91-"}
        />
        <View style={styles.radioGroup}>
          <View style={styles.radioButton}>
            <RadioButton.Android
              value="option1"
              status={selectedValue === 'option1' ? 'checked' : 'unchecked'}
              onPress={() => setSelectedValue('option1')}
              color={Colors.Orange}
            />
            <Text style={styles.radioLabel}>Passcode</Text>
          </View>

          <View style={styles.radioButton}>
            <RadioButton.Android
              value="option2"
              status={selectedValue === 'option2' ? 'checked' : 'unchecked'}
              onPress={() => otpVerify()}
              color={Colors.Orange}
            />
            <Text style={styles.radioLabel}>OTP</Text>
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
          onPress={apicall}
          disabled={!isFormValid()}
        />
        <View
          style={[globalStyles.centerTxt, {marginTop: widthPercentageToDP(5)}]}>
          <Text style={globalStyles.regulareTxt}>
            {Config.newuser}{' '}
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
                size={25}
                color={'#FFCE31'}
                style={{marginTop: 16}}
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
  buttonTxt: {
    color: Colors.Orange,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  radioGroup: {
    flexDirection: 'row',
    marginTop: 20,
    borderRadius: 8,
    marginBottom: 20,
    //padding: 16,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  radioLabel: {
    // marginLefts: 8,
    fontSize: s(15),
    color: '#000000',
    fontFamily: Config.medium,
  },
  forgottxt: {
    fontFamily: Config.medium,
    fontSize: s(12),
    alignSelf: 'flex-end',
    color: Colors.lightOrange,
  },
});
