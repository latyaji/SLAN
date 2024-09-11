import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  View
} from 'react-native';
import { Cards, CardTittle } from '../../component';
import Header from '../../component/Header';
import { clearLoginData, setIsloading } from '../../store/Slice/LoginSlice';
import { Banner } from '../../utils/assets';
import { Config } from '../../utils/Config';
import { globalStyles } from '../../utils/GlobalCss';

const Play = () => {
  const navigation = useNavigation();
  const [tournamnet, setTournamnet] = useState({});

  useEffect(() => {
    tournamnetApiCall();
  }, []);

  const tournamnetApiCall = async () => {
    setIsloading(true)
    axios
      .post(
        'https://dev-slansports.azurewebsites.net/Public/viewData/5/Home_Tournaments',
      )
      .then(response => {
        setIsloading(false)

        if (response.data) {
          setTournamnet(response.data.data.root.rowData_list);
        }
      })
      .catch(error => {
        setIsloading(false)
        console.log('Error message: ', error.message);
      });
  };



  const viewall = () =>{
    navigation.navigate("ViewAllTournaments")
  }

  const fetchCardDetails = (id : string) =>{
    navigation.navigate("Esporttournamnet",{ tournamentId: id })
  }

  return (
    <View>
      <Header
        showImage={true}
        tittle={Config.otpVerfication}
        backImage={false}
      />
      <ScrollView
        style={globalStyles.screenSpacing}>
        <View style={{alignItems: 'center'}}>
          <Image source={Banner} style={{resizeMode: 'cover', width: '100%'}} />
        </View>
        <CardTittle title={Config.tournaments} onPress={viewall} />
        <Cards carddata={tournamnet} onPress={fetchCardDetails} />
        
      </ScrollView>
    </View>
  );
};
export default Play;

