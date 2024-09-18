import React from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  View,
  Text
} from 'react-native';
import { Colors } from '../utils/Colors';
import { globalStyles } from '../utils/GlobalCss';
import {
  scale as s,
  verticalScale as vh,
  moderateScale as ms,
} from 'react-native-size-matters';
import { Config } from '../utils/Config';

interface TextFieldProps  {
  placeholder: string;
  source?: any;
  keyboardType?: string;
  value?: string; 
  onChangeTxt?: (text: string) => void;
  secureTextEntry?: boolean;
  maxLength?:number;
  mobilno?:string
}

const TextField = ({ placeholder, source, keyboardType, value, onChangeTxt,secureTextEntry,maxLength,mobilno }:TextFieldProps) => {
  return (
    <View style={styles.textInputContainer}>
      <Image 
       source={source} 
       style={globalStyles.textIcon} />
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
    width: '100%',
    height:vh(57)
  },
 
});
