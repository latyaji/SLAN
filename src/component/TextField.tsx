import React from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  View,
  Text
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { Colors } from '../utils/Colors';
import { globalStyles } from '../utils/GlobalCss';
import { s } from 'react-native-size-matters';
import { Config } from '../utils/Config';

interface TextFieldProps  {
  placeholder: string;
  source: any;
  keyboardType?: string;
  value: string; 
  onChangeTxt: (text: string) => void;
  secureTextEntry?: boolean;
  maxLength:number;
  mobilno:string
}

const TextField = ({ placeholder, source, keyboardType, value, onChangeTxt,secureTextEntry,maxLength,mobilno }:TextFieldProps) => {
  return (
    <View style={styles.textInputContainer}>
      <Image 
       source={source} 
       style={styles.textIcon} />
       <Text style={{color:Colors.black,fontSize:s(16),fontFamily:Config.medium}}>{mobilno}</Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#b1b5b2"
        style={globalStyles.regulareTxt}
        keyboardType={keyboardType}
        onChangeText={onChangeTxt} 
        value={value} 
        secureTextEntry={secureTextEntry}
        maxLength={maxLength}
        
       />
    </View>
  );
};

export default TextField;

const styles = StyleSheet.create({
  textInputContainer: {
    borderBottomWidth: 2,
    borderColor: Colors.lightgrey,
    flexDirection: 'row',
    alignItems: 'center',
    width: hp(90),
    height:wp(17)
  },
  textIcon: {
    marginRight: 12,
    width: hp(4),
    height: wp(5),
    resizeMode: 'contain',
  },
});
