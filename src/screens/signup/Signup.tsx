import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useState } from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../component/Button';
import Header from '../../component/Header';
import TextField from '../../component/TextField';
import {
  clearSignupData,
  setChecked,
  setConfirmPassword,
  setErrorMessage,
  setName,
  setPassword,
  setPhone,
} from '../../store/Slice/SignupSlice';
import { AppDispatch, RootState } from '../../store/Store';
import {
  alertIcon,
  CheckTermsIcon,
  lockIcon,
  phoneIcon,
  UnCheckTermsIcon,
  userIcon
} from '../../utils/assets';
import { Colors } from '../../utils/Colors';
import { Config } from '../../utils/Config';
import { globalStyles } from '../../utils/GlobalCss';

const CustomAlert = ({visible, onClose, title}: any) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <View style={styles.alertContainer}>
          <Text style={styles.heading}>Alert</Text>
          <View style={globalStyles.alertBorder} />
          <Image
            source={alertIcon}
            style={{
              width: hp(10),
              height: wp(10),
              resizeMode: 'contain',
              marginBottom: hp(2),
              marginTop: hp(1),
            }}
          />
          <Text style={styles.title}>{title}</Text>
          <View style={globalStyles.alertBorder} />
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const Signup = ({navigation: {goBack}}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const {name, phone, password, confirmPassword, checked, errorMessage} =
    useSelector((state: RootState) => state.signup);
  const [isAlertVisible, setAlertVisible] = useState(false);

  const isFormValid = () => {
    return (
      name.trim() !== '' &&
      phone.trim().length === 10 &&
      password.trim() !== '' &&
      confirmPassword.trim() !== '' &&
      checked
    );
  };

  const apicall = () => {
    if (password !== confirmPassword) {
      dispatch(setErrorMessage('*Passcode mismatch'));
      return;
    }

    dispatch(setErrorMessage(''));
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
        if (response.data) {
          console.log("res------",response.data)
          navigation.navigate('OtpVerfication');
          // dispatch(clearSignupData())
        }
      })
      .catch(error => {
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
  return (
    <View>
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
          <Text style={[globalStyles.regulareTxt, {color: Colors.blue}]}>
            {Config.termsTxt}
          </Text>
        </View>
        <Button
          tittle={Config.signupTxt}
          onPress={apicall}
          disabled={!isFormValid()}
        />
        <View style={[globalStyles.centerTxt, {marginTop: wp(5)}]}>
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
          {/* <Button title="Show Alert" onPress={showAlert} /> */}
          <CustomAlert
            visible={isAlertVisible}
            onClose={hideAlert}
            title="This mobile number is already
               registered. Please signup with
              different mobile number."
          />
        </View>
      </View>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  textInputContainer: {
    borderBottomWidth: 2,
    borderColor: Colors.Orange,
    flexDirection: 'row',
    alignItems: 'center',
    width: hp(90),
  },
  textIcon: {
    marginRight: 12,
    width: hp(4),
    height: wp(5),
    resizeMode: 'contain',
  },

  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: wp(3),
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
  alertContainer: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  icon: {
    marginBottom: 15,
  },
  title: {
    fontSize: 16,
    marginBottom: 20,
  },
  cancelButton: {
    // backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: '#FE6725',
    fontSize: 16,
  },
});




















// App.js

// import React, { useState } from 'react';
// import { Modal, View, Text, TouchableOpacity, StyleSheet, Button, Image } from 'react-native';
// import { globalStyles } from '../../utils/GlobalCss';
// import { alertIcon } from '../../utils/assets';
// import { heightPercentageToDP as hp , widthPercentageToDP as wp } from 'react-native-responsive-screen';

// const CustomAlert = ({ visible, onClose, title }:any) => {
//   return (
//     <Modal
//       transparent={true}
//       visible={visible}
//       animationType="slide"
//       onRequestClose={onClose}
//     >
//       <View style={styles.modalBackground}>
//         <View style={styles.alertContainer}>
//           <Text style={styles.heading}>Alert</Text>
//           <View style={globalStyles.alertBorder}/>
//           <Image source={alertIcon} style={{width:hp(10),height:wp(10),resizeMode:"contain",marginBottom:hp(2),marginTop:hp(1)}}/>
//           <Text style={styles.title}>{title}</Text>
//           <View style={globalStyles.alertBorder}/>
//           <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
//             <Text style={styles.cancelButtonText}>Cancel</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const Signup = () => {
//   const [isAlertVisible, setAlertVisible] = useState(false);

//   const showAlert = () => {
//     setAlertVisible(true);
//   };

//   const hideAlert = () => {
//     setAlertVisible(false);
//   };

//   return (
//     <View style={styles.container}>
//       <Button title="Show Alert" onPress={showAlert} />
//       <CustomAlert
//         visible={isAlertVisible}
//         onClose={hideAlert}
//         title="This mobile number is already
//                registered. Please signup with
//               different mobile number."
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalBackground: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   alertContainer: {
//     width: 300,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 20,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOpacity: 0.2,
//     shadowRadius: 10,
//     elevation: 5,
//   },
//   heading: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   icon: {
//     marginBottom: 15,
//   },
//   title: {
//     fontSize: 16,
//     marginBottom: 20,
//   },
//   cancelButton: {
//     // backgroundColor: '#007bff',
//     padding: 10,
//     borderRadius: 5,
//   },
//   cancelButtonText: {
//     color: '#FE6725',
//     fontSize: 16,
//   },
// });

// export default Signup;
