import React, {useState, useCallback} from 'react';
import {Alert, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Header from '../../component/Header';
import {Config} from '../../utils/Config';
import {globalStyles} from '../../utils/GlobalCss';
import OTPTextInput from 'react-native-otp-textinput';
import Button from '../../component/Button';
import {Colors} from '../../utils/Colors';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import TextField from '../../component/TextField';
import {phoneIcon} from '../../utils/assets';
import {setIsloggedin, setLoginPhone} from '../../store/Slice/LoginSlice';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/Store';

const LoginWithOtp = ({navigation: {goBack}}) => {
  const [otp, setOtp] = useState('');
  const [success, setSuccess] = useState(false);
  const [inValid, setInValid] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const {loginPhone} = useSelector((state: RootState) => state.login);

  const navigation = useNavigation();
  const checkOtp = useCallback(() => {
    return otp.length === 6;
  }, [otp]);

  return (
    <View style={styles.container}>
      <Header showImage={true} onPress={() => goBack()}/>
      <View style={globalStyles.screenSpacing}>
        <Text style={globalStyles.largeTxt}>{Config.loginwithotp}</Text>
        <TextField
          placeholder={Config.enterPhone}
          source={phoneIcon}
          keyboardType={'phone-pad'}
          value={loginPhone}
          onChangeTxt={text => dispatch(setLoginPhone(text))}
          maxLength={10}
        />
        <Text style={globalStyles.smallTxt}>{Config.verifysendmsg}</Text>
        <OTPTextInput
          handleTextChange={code => setOtp(code)}
          containerStyle={styles.otpContainer}
          textInputStyle={styles.otpTextInput}
          tintColor={'#bfbbbb'}
          offTintColor={inValid ? '#FF0000' : 'transparent'}
          inputCount={6}
        />
        {inValid && <Text style={globalStyles.errormsg}>{inValid}</Text>}

        <Button
          tittle={Config.verify}
          disabled={!checkOtp()}
          onPress={() => {
            if (checkOtp()) {
              if (otp == '123456') {
                setSuccess(true);
                setInValid('');
                Alert.alert("Otp successfully")
              } else {
                setInValid('*Invalid OTP');
              }
            }
          }}
        />
        <Text
          style={[
            globalStyles.regulareTxt,
            {color: Colors.blue, alignSelf: 'center', marginTop: wp(3)},
          ]}>
          {Config.resendOtp}
        </Text>
        {success && (
          <Text
            style={[
              globalStyles.regulareTxt,
              {alignSelf: 'center', color: Colors.success, marginTop: wp(3)},
            ]}>
            {Config.otpVerifiedSuccess}
          </Text>
        )}
      </View>
    </View>
  );
};

export default LoginWithOtp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  otpContainer: {
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  otpTextInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: '#D9D9D9',
  },
  otpText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
});
