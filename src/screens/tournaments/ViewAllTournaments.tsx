import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, Image, FlatList, Text} from 'react-native';
import {Header} from '../../component';
import {Config} from '../../utils/Config';
import {Banner, noImage} from '../../utils/assets';
import {globalStyles} from '../../utils/GlobalCss';
import {
  scale as s,
  verticalScale as vs,
  moderateScale as ms,
} from 'react-native-size-matters';
import {Colors} from '../../utils/Colors';
import axios from 'axios';
import { AppDispatch, RootState } from '../../store/Store';
import { useDispatch, useSelector } from 'react-redux';
import { setIsloading } from '../../store/Slice/LoginSlice';



const ViewAllTournaments = ({navigation: {goBack}}:any) => {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const [alltournamnet, setAllTournamnet] = useState({});

  const viewalltournamnetApiCall = async () => {
    dispatch(setIsloading(true))
    axios
      .post(
        'https://dev-slansports.azurewebsites.net/Public/viewData/5001/Alltournaments_Card',
      )
      .then(response => {
        dispatch(setIsloading(false))
        if (response.data) {
          setAllTournamnet(response.data.data.root.rowData);
        }
      })
      .catch(error => {
        dispatch(setIsloading(false))
        console.log('Error message: ', error.message);
      });
  };

  useEffect(() => {
    viewalltournamnetApiCall();
  }, []);
  return (
    <View style={{flex:1}}>
      <Header showImage={false} tittle={Config.tournaments} backImage={true}  onPress={() => goBack()} />
      <FlatList
        data={alltournamnet}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={globalStyles.listContainer}
        renderItem={({item}) => (
          <View
            style={{
              borderBottomWidth: 1,
              padding: s(5),
              flexDirection: 'row',
              borderColor: '#BDCAD9',
            }}>
            <View>
              <Image
                source={
                  item.Tournament_Image ? {uri: item.Tournament_Image} : noImage
                }
                style={{width: s(50), height: vs(50), resizeMode: 'cover'}}
              />
            </View>
            <View style={{marginLeft: s(12)}}>
              <Text
                style={{
                  fontFamily: Config.bold,
                  fontSize: s(16),
                  color: Colors.black,
                  width: s(280),
                }}>
                {item.Tournament_Name}
              </Text>

              <Text
                style={{
                  fontSize: s(13),
                  color: Colors.lightOrange,
                }}>
                {item.TrnmtPeriod}
              </Text>
              <Text
                style={{
                  fontSize: s(12),
                  color: Colors.lesslightgrey,
                }}>
                {item.TrnmtSpclType}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default ViewAllTournaments;
