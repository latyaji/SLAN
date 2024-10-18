import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Header } from '../../component';
import { ViewAllList } from '../../component/Loader';
import { setIsloading } from '../../store/Slice/LoginSlice';
import { AppDispatch } from '../../store/Store';
import apiInstance from '../../utils/apiInstance';
import { Config } from '../../utils/Config';



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
