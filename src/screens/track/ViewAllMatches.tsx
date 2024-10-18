import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { vs } from 'react-native-size-matters';
import { useDispatch } from 'react-redux';
import { Header } from '../../component';
import { Matchescard } from '../../component/Loader';
import { setIsloading } from '../../store/Slice/LoginSlice';
import apiInstance from '../../utils/apiInstance';
import { Config } from '../../utils/Config';
import { globalStyles } from '../../utils/GlobalCss';

const ViewAllMatches = ({navigation: {goBack}}: any) => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState('upcoming');
  const dispatch = useDispatch<AppDispatch>();
  const [alltournamnet, setAllTournamnet] = useState([]);

  const viewallMatchesApiCall = async () => {
    dispatch(setIsloading(true));
    const getToken = AsyncStorage.getItem('TOKEN');
    apiInstance
      .post('Public/viewData/50202/all_matches', {
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

  const renderMatches = (item: any) => {
    return <Matchescard matchedcarddata={item.item} />;
  };

  useEffect(() => {
    viewallMatchesApiCall();
  }, []);

  return (
    <View style={{flex: 1}}>
      <Header
        showImage={false}
        tittle={Config.viewallmatches}
        backImage={true}
        onPress={() => goBack()}
      />

      <View style={globalStyles.toggleContainer}>
        <TouchableOpacity
          onPress={() => setSelectedTab('upcoming')}
          style={[
            globalStyles.button,
            selectedTab === 'upcoming'
              ? globalStyles.selectedButton
              : globalStyles.unselectedButton,
            {borderTopLeftRadius: 20, borderBottomLeftRadius: 20},
          ]}>
          <Text
            style={
              selectedTab === 'upcoming'
                ? globalStyles.selectedText
                : globalStyles.unselectedText
            }>
            Upcoming Matches
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab('previous')}
          style={[
            globalStyles.button,
            selectedTab === 'previous'
              ? globalStyles.selectedButton
              : globalStyles.unselectedButton,
            {borderTopRightRadius: 20, borderBottomRightRadius: 20},
          ]}>
          <Text
            style={
              selectedTab === 'previous'
                ? globalStyles.selectedText
                : globalStyles.unselectedText
            }>
            Previous Matches
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data={alltournamnet}
          renderItem={renderMatches}
          ListFooterComponent={<View style={{height: vs(180)}} />}
        />
      </View>
    </View>
  );
};

export default ViewAllMatches;
