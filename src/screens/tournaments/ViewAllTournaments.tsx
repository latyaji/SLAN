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
import { ViewAllList } from '../../component/Loader';
import apiInstance from '../../utils/apiInstance';



const ViewAllTournaments = ({navigation: {goBack}}:any) => {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const [alltournamnet, setAllTournamnet] = useState({});

  const viewalltournamnetApiCall = async () => {
    dispatch(setIsloading(true))
    apiInstance.post(
        'Public/viewData/502/Alltournaments_Card',
      )
      .then(response => {
        dispatch(setIsloading(false))
        if (response.data) {
          setAllTournamnet(response.data.data.root.rowData_list);
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
      <ViewAllList data = {alltournamnet} />
    </View>
  );
};

export default ViewAllTournaments;
