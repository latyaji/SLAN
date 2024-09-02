import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
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
import {lockIcon, phoneIcon} from '../../utils/assets';
import {Colors} from '../../utils/Colors';
import {Config} from '../../utils/Config';
import {globalStyles} from '../../utils/GlobalCss';

const Login = ({navigation: {goBack}}) => {
  const navigation = useNavigation();
  const [checked, setChecked] = React.useState('first');
  const [selectedValue, setSelectedValue] = useState('option1');

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
            dispatch(setIsloggedin(true));
          } else {
            Alert.alert('Invalid Credientials');

            navigation.navigate('Signup');
          }
        }
      })
      .catch(error => {
        Alert.alert('Invalid Credientials');
        navigation.navigate('Signup');
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
          <Text style={globalStyles.errormsg}>{Config.forgotpassword}</Text>
        </TouchableOpacity>
        <Button
          tittle={Config.login}
          onPress={apicall}
          disabled={!isFormValid()}
        />
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
    fontSize: 16,
    color: '#333',
  },
});
