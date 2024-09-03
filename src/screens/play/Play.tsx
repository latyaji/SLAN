import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {scale as s, verticalScale as vh} from 'react-native-size-matters';
import {useDispatch} from 'react-redux';
import Header from '../../component/Header';
import {clearLoginData} from '../../store/Slice/LoginSlice';
import {Banner} from '../../utils/assets';
import {Colors} from '../../utils/Colors';
import {Config} from '../../utils/Config';
import {globalStyles} from '../../utils/GlobalCss';
import {Cards, CardTittle} from '../../component';
import { useNavigation } from '@react-navigation/native';

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
    axios
      .post(
        'https://dev-slansports.azurewebsites.net/Public/viewData/5/Home_Tournaments',
      )
      .then(response => {
        if (response.data) {
          setTournamnet(response.data.data.root.rowData_list);
        }
      })
      .catch(error => {
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
    console.log("calleddd---------->>>>>")
    navigation.navigate("ViewAllTournaments")
  }

  const fetchCardDetails = () =>{
    Alert.alert("coming soon")
  }

  return (
    <View>
      <Header
        showImage={true}
        tittle={Config.otpVerfication}
        backImage={false}
      />
      <ScrollView
        // contentContainerStyle={{flexGrow: 1,paddingBottom: 20,justifyContent: 'center'}}
        style={globalStyles.screenSpacing}>
        <View style={{alignItems: 'center'}}>
          <Image source={Banner} style={{resizeMode: 'cover', width: '100%'}} />
        </View>
        <CardTittle title={Config.tournaments} onPress={viewall} />
        <Cards carddata={tournamnet} onPress={fetchCardDetails} />

        <TouchableOpacity
          onPress={logout}
          style={{
            backgroundColor: Colors.Orange,
            justifyContent: 'flex-end',
            padding: 20,
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Text style={globalStyles.regulareTxt}>Testing Logout</Text>
        </TouchableOpacity>

        
      </ScrollView>
    </View>
  );
};
export default Play;

const styles = StyleSheet.create({
  viewBtn: {
    color: Colors.lightOrange,
    fontSize: s(15),
    fontFamily: Config.medium,
  },
  cardImg: {
    height: vh(90),
    width: s(160),
    borderRadius: 12,
  },
  listContainer: {
    paddingHorizontal: 5,
  },
});
