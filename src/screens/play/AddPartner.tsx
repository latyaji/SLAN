import React from 'react';
import {
    Text,
    View
} from 'react-native';
import { Header } from '../../component';
import { Config } from '../../utils/Config';
import { globalStyles } from '../../utils/GlobalCss';

const AddPartner = () => {
  

  return (
    <View>
      <Header
        showImage={false}
        tittle={Config.addpartner}
        backImage={true}
        onPress={() => navigation.goBack()}
      />
      <Text style={globalStyles.largeTxt}>{Config.addpartner}</Text>
      
    </View>
  );
};

export default AddPartner;
