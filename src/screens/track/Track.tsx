import React from 'react';
import {Text, View} from 'react-native';
import Header from '../../component/Header';
import {Config} from '../../utils/Config';
import {globalStyles} from '../../utils/GlobalCss';

const Track = () => {
  return (
    <View>
      <Header showImage={true} tittle={Config.otpVerfication} backImage={false}/>
      <View style={globalStyles.screenSpacing}>
        <Text style={globalStyles.largeTxt}>Track Screen</Text>
      </View>
    </View>
  );
};
export default Track;
