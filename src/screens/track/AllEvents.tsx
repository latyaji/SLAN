import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {Header} from '../../component';
import {ViewAllList} from '../../component/Loader';
import {setIsloading} from '../../store/Slice/LoginSlice';
import {AppDispatch} from '../../store/Store';
import {Config} from '../../utils/Config';
import apiInstance from '../../utils/apiInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AllEvents = ({navigation: {goBack}}: any) => {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const [alltournamnet, setAllTournamnet] = useState({});

  const viewallEventsApiCall = async () => {
    dispatch(setIsloading(true));
    const getToken = AsyncStorage.getItem('TOKEN');
    apiInstance
      .post('Public/viewData/50203/all_Events', {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
      .then(response => {
        dispatch(setIsloading(false));
        if (response.data) {
          setAllTournamnet(response.data.data.root.rowData_list);
        }
      })
      .catch(error => {
        dispatch(setIsloading(false));
        console.log('Error message: ', error.message);
      });
  };

  useEffect(() => {
    viewallEventsApiCall();
  }, []);


  return (
    <View style={{flex: 1}}>
      <Header
        showImage={false}
        tittle={Config.allevents}
        backImage={true}
        onPress={() => goBack()}
      />
      <ViewAllList data={alltournamnet} />
    </View>
  );
};

export default AllEvents;
