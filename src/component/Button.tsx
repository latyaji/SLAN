import React from 'react';
import {StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import {Colors} from '../utils/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Loader} from '../utils/assets';

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
      
      <Text style={styles.buttonTxt}>{tittle}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonView: {
    backgroundColor: Colors.Orange,
    padding: 13,
    borderRadius: 30,
    marginTop: wp(5),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonDisabled: {
    backgroundColor: '#ed9c79',
    opacity: 0.6, // Adjust color for disabled state
  },
  buttonTxt: {
    color: Colors.White,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: hp(0.5),
  },
});
