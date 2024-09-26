import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
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
  calender,
  CheckTermsIcon,
  lockIcon,
  phoneIcon,
  UnCheckTermsIcon,
  userIcon,
} from '../../utils/assets';
import { Colors } from '../../utils/Colors';
import { Config } from '../../utils/Config';
import { globalStyles } from '../../utils/GlobalCss';
import CalendarPicker from 'react-native-calendar-picker';


import HTMLView from 'react-native-htmlview';
import {
  scale as s,
  verticalScale as vh
} from 'react-native-size-matters';
import CustomModal from '../../component/CustomModal';
import { setIsloading } from '../../store/Slice/LoginSlice';
import Internet from '../InternetCheck/Internet';
import { initializeNetworkListener } from '../../store/Slice/NetworkSlice';
import moment from 'moment';
import { ScrollView } from 'react-native';
import apiInstance from '../../utils/apiInstance';


const Signup = ({navigation: {goBack}}:any) => {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const {name, phone, password, confirmPassword, checked, errorMessage} =
    useSelector((state: RootState) => state.signup);
   const isConnected = useSelector((state) => state.network.isConnected);

  const [isAlertVisible, setAlertVisible] = useState(false);
  const [terms, setterms] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedradio, setSelectedRadio] = useState(1);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);


  const isFormValid = () => {
    return (
      name.trim() !== '' &&
      phone.trim().length === 10 &&
      password.trim() !== '' &&
      confirmPassword.trim() !== '' &&
      choosedDate.trim() !== '' &&
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
    apiInstance
      .post(
        'Account/Register',
        {
          UserName: phone,
          Password: password,
          ConfirmPassword: confirmPassword,
          FirstName: name,
          DateofBirth: choosedDate,
          Genderid: selectedradio
        },
        // {
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        // },
       
      )
      .then(response => {
        dispatch(setIsloading(false))
        if (response.data) {
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
    dispatch(initializeNetworkListener());
  };

  const openCalendar = () => {
    setIsCalendarVisible(true);
  };

  const onDateChange = (date: React.SetStateAction<null>) => {
    setSelectedStartDate(date);
    setIsCalendarVisible(false); // Close calendar after date select
  };
  const choosedDate = selectedStartDate
  ? moment(selectedStartDate).format('YYYY-DD')
  : '';

 

  useEffect(()=>{termandcondition},[])

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
      <ScrollView style={globalStyles.screenSpacing}>
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
           <View style={globalStyles.radionbtnConatiner}>
          <View style={globalStyles.btncontainer}>
            <TouchableOpacity
              onPress={() => setSelectedRadio(1)}
              style={[globalStyles.btnbox,{borderColor: selectedradio == 1 ? Colors.Orange : Colors.bordergrey}]}>
              {selectedradio == 1 ? (
                <View style={globalStyles.btnboxbg}></View>
              ) : null}
            </TouchableOpacity>
            <Text style={globalStyles.radiotxt}>{Config.male}</Text>
          </View>
          <View style={[globalStyles.btncontainer,{marginLeft:s(40)}]}>
            <TouchableOpacity
              onPress={() => setSelectedRadio(2)}
              style={[globalStyles.btnbox,{borderColor: selectedradio == 2 ? Colors.Orange : Colors.bordergrey}]}>
              {selectedradio == 2 ? (
                <View style={globalStyles.btnboxbg}></View>
              ) : null}
            </TouchableOpacity>
            <Text style={globalStyles.radiotxt}>{Config.female}</Text>
          </View>
        </View>

          <View
            style={{flexDirection:"row",alignItems:"center",paddingVertical:vh(12)}}>
            <TouchableOpacity onPress={() => openCalendar()}>
              <Image
                source={calender}
                style={[globalStyles.textIcon, {tintColor: '#FE6725'}]}
              />
            </TouchableOpacity>
            <TextInput
              placeholder={Config.DOB}
              placeholderTextColor="#b1b5b2"
              style={globalStyles.regulareTxt}
             value={choosedDate}
             editable={false}
            />
          </View>

       
        {isCalendarVisible && (
          <CalendarPicker
            onDateChange={onDateChange}
            selectedDayTextColor="#FFF"
            startFromMonday={true}
            allowRangeSelection={true}
            todayBackgroundColor="#F15A2B"
            textStyle={{
              fontFamily: Config.regular,
              color: '#FE6725A1',
            }}
          />
        )}

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
        <View style={globalStyles.centerTxt}>
          <Text style={globalStyles.alreadyTxt}>
            {Config.AlreadyUser}{'  '}
            <Text
              style={globalStyles.smallbluetxt}
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
                <HTMLView value={terms} stylesheet={globalStyles.html} />
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={hideModal}>
                  <Text style={styles.closeButtonText}>{Config.close}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
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
  }
});
