import React from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '../../component/Button';
import Header from '../../component/Header';
import TextField from '../../component/TextField';
import { phoneIcon } from '../../utils/assets';
import { Colors } from '../../utils/Colors';
import { Config } from '../../utils/Config';
import { globalStyles } from '../../utils/GlobalCss';

const Forgot = ({ navigation: { goBack }}) => {
  return (
    <View>
      <Header showImage={false} tittle={Config.forgotpass} onPress={() => goBack()} />
      <View style={globalStyles.screenSpacing}>
        <TextField
          placeholder={Config.enterPhone}
          source={phoneIcon}
          keyboardType={'phone-pad'}
          // value={phone}
          // onChangeTxt={text => dispatch(setPhone(text))}
          maxLength={10}
        />

        <Button tittle={Config.next} />
      </View>
    </View>
  );
};

export default Forgot;

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
    padding: 16,
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
