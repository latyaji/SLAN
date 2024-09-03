import React from 'react';
import {StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import {Colors} from '../utils/Colors';
import {Loader} from '../utils/assets';
import { globalStyles } from '../utils/GlobalCss';
import {
  scale as s,
  verticalScale as vh,
  moderateScale as ms,
} from 'react-native-size-matters';

interface ButtonProps {
  tittle: string;
  onPress: () => void; 
  disabled?: boolean;
  showImage?: boolean; 
}

const Button = ({tittle, onPress, disabled,showImage}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.buttonView, disabled && styles.buttonDisabled]}
      onPress={onPress}
      disabled={disabled}>
        {showImage && <Image source={Loader} />}
      
      <Text style={globalStyles.whiteTxt}>{tittle}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonView: {
    backgroundColor: Colors.lightOrange,
    padding: vh(13),
    borderRadius: s(30),
    marginTop: vh(15),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonDisabled: {
    backgroundColor: '#ed9c79',
    opacity: 0.6, 
  }
});
