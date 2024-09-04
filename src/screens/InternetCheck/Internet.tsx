import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { s } from 'react-native-size-matters';
import Header from '../../component/Header';
import { Config } from '../../utils/Config';
import { globalStyles } from '../../utils/GlobalCss';
import { WifiIcon } from '../../utils/assets';

interface InternetProps{
  onRetry: ()=> void
}

const Internet = ({onRetry}:InternetProps) => {
  return (
    <View style={{flex:1}}>
      <Header
        showImage={true}
        tittle={Config.otpVerfication}
        backImage={false}
      />
      <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
        <Image source={WifiIcon}/>
        <Text style={globalStyles.noConectiontxt}>{Config.noConnection}</Text>
        <Text style={{fontSize:s(15)}}>{Config.CheckIntrenet}</Text>
        <Text style={{fontSize:s(15)}}>{Config.tryAgain}</Text>
        <TouchableOpacity 
         onPress={onRetry}
         style={globalStyles.smallButton}>
          <Text style={globalStyles.whiteTxt}>{Config.retry}</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );
};
export default Internet;
