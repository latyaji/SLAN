import React from 'react';
import {
    Text,
    View
} from 'react-native';
import { Header } from '../../component';
import { Config } from '../../utils/Config';
import { globalStyles } from '../../utils/GlobalCss';

const AddTeam = () => {
  

  return (
    <View>
      <Header
        showImage={false}
        tittle={Config.addteam}
        backImage={true}
        onPress={() => navigation.goBack()}
      />
      <Text style={globalStyles.largeTxt}>{Config.addteam}</Text>
      
    </View>
  );
};

export default AddTeam;
