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

const OtpVerification = () => {
  const [otp, setOtp] = useState('');
  const [success, setSuccess] = useState(false);
  const [inValid, setInValid] = useState('');

  const navigation = useNavigation();
  const checkOtp = useCallback(() => {
    return otp.length === 6;
  }, [otp]);

  return (
    <View style={styles.container}>
      <Header showImage={false} tittle={Config.otpVerfication} />
      <View style={globalStyles.screenSpacing}>
        <Text style={globalStyles.largeTxt}>{Config.enterotp}</Text>
        <Text style={globalStyles.smallTxt}>{Config.verifysendmsg}</Text>
        <OTPTextInput
          handleTextChange={code => setOtp(code)}
          containerStyle={styles.otpContainer}
          textInputStyle={styles.otpTextInput}
          tintColor={"#bfbbbb"}
          offTintColor={inValid ? "#FF0000":"transparent"}
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
                Alert.alert("SignUp Successfully")
                navigation.navigate("Login")
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
            style={globalStyles.greenMsg}>
            {Config.otpVerifiedSuccess}
          </Text>
        )}
      </View>
    </View>
  );
};

export default OtpVerification;

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
