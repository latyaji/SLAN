import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useDispatch } from 'react-redux';
import { Cards, CardTittle } from '../../component';
import Header from '../../component/Header';
import { clearLoginData, setIsloading } from '../../store/Slice/LoginSlice';
import { Banner } from '../../utils/assets';
import { Colors } from '../../utils/Colors';
import { Config } from '../../utils/Config';
import { globalStyles } from '../../utils/GlobalCss';

const Play = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [tournamnet, setTournamnet] = useState({});
  const [leagues, setleagues] = useState({});

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('TOKEN');
    } catch (exception) {
      console.log('exception====>>>', exception);
    }
    dispatch(clearLoginData());
  };

  useEffect(() => {
    tournamnetApiCall();
    leaguesApiCall();
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

  const leaguesApiCall = async () => {
    axios
      .post(
        'https://dev-slansports.azurewebsites.net/Public/viewData/5001/Alltournaments_Card',
      )
      .then(response => {
        if (response.data) {
          setleagues(response.data.data.root.rowData);
        }
      })
      .catch(error => {
        console.log('Error message: ', error.message);
      });
  };

  const viewall = () =>{
    navigation.navigate("ViewAllTournaments")
  }

  const fetchCardDetails = (id : string) =>{
    // console.log("seeeee card id-------",id)
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

