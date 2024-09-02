import React,{useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
  StyleSheet,
  FlatList,
} from 'react-native';
import Header from '../../component/Header';
import {Config} from '../../utils/Config';
import {globalStyles} from '../../utils/GlobalCss';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Colors} from '../../utils/Colors';
import {clearLoginData} from '../../store/Slice/LoginSlice';
import {useDispatch} from 'react-redux';
import {Banner, card} from '../../utils/assets';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
  scale as s,
  verticalScale as vh,
  moderateScale as ms,
} from 'react-native-size-matters';
import axios from 'axios';

const Play = () => {
  const dispatch = useDispatch();
  const [tournamnet,setTournamnet] = useState({})

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('TOKEN');
    } catch (exception) {
      console.log('exception====>>>', exception);
    }
    dispatch(clearLoginData());
  };


  useEffect(()=>{
    apicall()
  },[])

  const apicall = async () => {
    axios
      .post(
        'https://dev-slansports.azurewebsites.net/Public/viewData/502/Alltournaments_Card',
      )
      .then(response => {
        if (response.data) {
          // console.log('res------', JSON.stringify(response.data.data.root,null,2));
          
          setTournamnet(response.data.data.root.rowData_list)
        }
      })
      .catch(error => {
        console.log('Error message: ', error.message);
      });
  };

  console.log("t-------->>>>>",tournamnet)
  return (
    <View>
      <Header
        showImage={true}
        tittle={Config.otpVerfication}
        backImage={false}
      />
      <View style={globalStyles.screenSpacing}>
        <Image source={Banner} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: vh(14),
          }}>
          <Text style={globalStyles.mediumTxt}>{Config.tournaments}</Text>
          <TouchableOpacity onPress={() => Alert.alert('Coming Soon')}>
            <Text style={styles.viewBtn}>{Config.viewall}</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          // data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]}
          data={tournamnet}
          //keyExtractor={item => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false} // Optional, hides the scrollbar
          contentContainerStyle={styles.listContainer}
          renderItem={({item}) => (
            // console.log("i----->>>>>>",item.Tournament_Name)
            
            <View
              style={{
                height: vh(200),
                width: s(200),
                borderWidth: 1,
                marginTop: vh(12),
                borderRadius: s(12),
                borderColor: Colors.grey,
                shadowColor: Colors.grey,
                shadowOpacity: 0.2,
                shadowRadius: 10,
                alignItems: 'center',
                backgroundColor: '#fff',
                marginRight: s(10),
              }}>
              <View
                style={{
                  height: vh(100),
                  width: s(160),
                  marginTop: vh(12),
                  borderRadius: s(12),
                  shadowColor: '#000',
                  shadowOpacity: 0.2,
                  shadowRadius: 10,
                  alignItems: 'center',
                }}>
                <Image source={{uri: item.Tournament_Image}} style={styles.cardImg} />
              </View>
              <Text style={globalStyles.regulareTxt}>
               {item.Tournament_Name}
              </Text>
              <Text style={styles.viewBtn}>{item.TrnmtPeriod}</Text>
              <Text
                style={{
                  fontFamily: Config.regular,
                  fontSize: hp(1.6),
                  color: '##595959',
                }}>
                {item.TrnmtSpclType}
              </Text>
            </View>
          )}
        />

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
      </View>
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
    // resizeMode:"contain",
    // marginTop:vh(12)
  },
  listContainer: {
    paddingHorizontal: 5,
  },
});
