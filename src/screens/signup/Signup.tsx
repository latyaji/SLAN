import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useState } from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import Button from '../../component/Button';
import Header from '../../component/Header';
import TextField from '../../component/TextField';
import {
  setChecked,
  setConfirmPassword,
  setErrorMessage,
  setName,
  setPassword,
  setPhone
} from '../../store/Slice/SignupSlice';
import { AppDispatch, RootState } from '../../store/Store';
import {
  alertIcon,
  CheckTermsIcon,
  lockIcon,
  phoneIcon,
  UnCheckTermsIcon,
  userIcon,
} from '../../utils/assets';
import { Colors } from '../../utils/Colors';
import { Config } from '../../utils/Config';
import { globalStyles } from '../../utils/GlobalCss';


import HTMLView from 'react-native-htmlview';
import {
  scale as s,
  verticalScale as vh
} from 'react-native-size-matters';
import CustomModal from '../../component/CustomModal';
import { setIsloading } from '../../store/Slice/LoginSlice';
import Loader from '../../component/Loader';
import Internet from '../InternetCheck/Internet';
import { initializeNetworkListener } from '../../store/Slice/NetworkSlice';


const Signup = ({navigation: {goBack}}:any) => {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const {name, phone, password, confirmPassword, checked, errorMessage} =
    useSelector((state: RootState) => state.signup);
   const isConnected = useSelector((state) => state.network.isConnected);

  const [isAlertVisible, setAlertVisible] = useState(false);
  const [terms, setterms] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const isFormValid = () => {
    return (
      name.trim() !== '' &&
      phone.trim().length === 10 &&
      password.trim() !== '' &&
      confirmPassword.trim() !== '' &&
      checked
    );
  };

  const signupApi = () => {
    if (password !== confirmPassword) {
      dispatch(setErrorMessage('*Passcode mismatch'));
      return;
    }

    dispatch(setErrorMessage(''));
    dispatch(setIsloading(true))
    axios
      .post(
        'https://dev-slansports.azurewebsites.net/Account/Register',
        {
          UserName: phone,
          Password: password,
          ConfirmPassword: confirmPassword,
          FirstName: name,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(response => {
        dispatch(setIsloading(false))
        if (response.data) {
          console.log('res------', response.data);
          navigation.navigate('OtpVerfication');
          // dispatch(clearSignupData())
        }
      })
      .catch(error => {
        dispatch(setIsloading(false))
        console.log('Error message: ', error.message);
        showAlert();
      });
  };

  const showAlert = () => {
    setAlertVisible(true);
  };

  const hideAlert = () => {
    setAlertVisible(false);
  };

  const showModal = () => {
    termandcondition();
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const termandcondition = () => {
    dispatch(setIsloading(true))
    axios
      .post(
        'https://dev-slansports.azurewebsites.net/Public/viewData/901/TermsAndCons_Card',
      )
      .then(response => {
        dispatch(setIsloading(false))
        if (response.data) {
          setterms(response.data.data.root.rowData.TandC_Rules);
        }
      })
      .catch(error => {
        dispatch(setIsloading(false))
        console.log('Error message: ', error.message);
      });
  };
  const handleRetry = () => {
    // You can put your recheck logic here if needed
    // For example, you might dispatch a network check action again
    dispatch(initializeNetworkListener());
  };

  return (
    
    <View style={{flex:1}}>
        {!isConnected ? (
        <Internet onRetry={handleRetry} />
      ) : (
        <>
          <Header
        showImage={true}
        tittle={Config.otpVerfication}
        onPress={() => goBack()}
      />
      <View style={globalStyles.screenSpacing}>
        <Text style={globalStyles.largeTxt}>{Config.SignHeading}</Text>
        <TextField
          placeholder={Config.entername}
          source={userIcon}
          value={name}
          onChangeTxt={text => dispatch(setName(text))}
          maxLength={25}
        />
        <TextField
          placeholder={Config.enterPhone}
          source={phoneIcon}
          keyboardType={'phone-pad'}
          value={phone}
          onChangeTxt={text => dispatch(setPhone(text))}
          maxLength={10}
          mobilno={'+91-'}
        />
        <TextField
          placeholder={Config.enterPassword}
          source={lockIcon}
          value={password}
          onChangeTxt={text => dispatch(setPassword(text))}
          secureTextEntry={true}
          maxLength={4}
        />
        <TextField
          placeholder={Config.enterConfirmPassword}
          source={lockIcon}
          value={confirmPassword}
          onChangeTxt={text => dispatch(setConfirmPassword(text))}
          secureTextEntry={true}
          maxLength={4}
        />
        {errorMessage ? (
          <Text style={globalStyles.errormsg}>{errorMessage}</Text>
        ) : null}
        <View style={styles.termsContainer}>
          <TouchableOpacity onPress={() => dispatch(setChecked(!checked))}>
            <Image
              source={checked ? CheckTermsIcon : UnCheckTermsIcon}
              style={globalStyles.textIcon}
            />
          </TouchableOpacity>
          <Text
            style={[globalStyles.regulareTxt, {color: Colors.blue}]}
            onPress={showModal}>
            {Config.termsTxt}
          </Text>
        </View>
        <Button
          tittle={Config.signupTxt}
          onPress={signupApi}
          disabled={!isFormValid()}
        />
        <View style={[globalStyles.centerTxt, {marginTop: vh(5)}]}>
          <Text style={globalStyles.regulareTxt}>
            {Config.AlreadyUser}{' '}
            <Text
              style={globalStyles.boldblueTxt}
              onPress={() => navigation.navigate('Login')}>
              {Config.LoginTxt}
            </Text>
          </Text>
        </View>

        <View style={styles.container}>
          <CustomModal
            visible={isAlertVisible}
            onClose={hideAlert}
            title="This mobile number is already
               registered. Please signup with
              different mobile number."
            image={alertIcon}
          />
          <Modal
            transparent={true}
            visible={isModalVisible}
            animationType="slide"
            onRequestClose={hideModal}>
            <View style={styles.modalBackground}>
              <View style={styles.modalContainer}>
                <HTMLView value={terms} stylesheet={styles.html} />
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={hideModal}>
                  <Text style={styles.closeButtonText}>{Config.close}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </View>
        </>
       )
    
      }</View> 
  );
};

export default Signup;

const styles = StyleSheet.create({
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: vh(8),
    paddingLeft:s(2)
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: s(10),
    padding: s(20),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: s(10),
    elevation: 5,
  },
  closeButton: {
    marginTop: vh(20),
    padding: s(10),
    backgroundColor: '#007bff',
    borderRadius: s(5),
  },
  closeButtonText: {
    color: '#fff',
    fontSize: s(16),
  },
  html: {
    fontSize: s(16),
    color: '#333',
    a: {
      fontWeight: '300',
      color: '#FF3366', 
    },
  },
});
