import React from 'react';
import {View,Text} from 'react-native';
import Header from '../../component/Header';
import { Config } from '../../utils/Config';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const Internet = () => {
  return (
    <View>
      <Header
        showImage={true}
        tittle={Config.otpVerfication}
        backImage={false}
      />
      <Text>Check Internet</Text>
      <Icon name="delete" size={25} color={'#000'} />
    </View>
  );
};
export default Internet;
