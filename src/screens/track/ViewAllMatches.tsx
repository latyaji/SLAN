import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
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
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [previousMatches, setPreviousMatches] = useState([]);

  const viewallMatchesApiCall = async () => {
    dispatch(setIsloading(true));
    const getToken = await AsyncStorage.getItem('TOKEN');  
    apiInstance
      .post('Public/viewData/50202/all_matches', {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
      .then(response => {
        dispatch(setIsloading(false));
        if (response.data) {
          const allMatches = response.data.data.root.rowData_list;
          filterMatches(allMatches);  
        }
      })
      .catch(error => {
        dispatch(setIsloading(false));
        console.log('Error message: ', error.message);
      });
  };

  const filterMatches = (matches: any[]) => {
    const currentYear = moment().year(); 

    const upcoming = matches.filter(match => {
      const matchYear = moment(match.StartDate, "ddd, D MMM'YY -h:mmA").year();
      return matchYear >= currentYear;  
    });

    const previous = matches.filter(match => {
      const matchYear = moment(match.StartDate, "ddd, D MMM'YY -h:mmA").year();
      return matchYear < currentYear;  
    });

    setUpcomingMatches(upcoming);
    setPreviousMatches(previous);
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

      <View style={{ flex: 1 }}>
        {selectedTab === 'upcoming' && upcomingMatches.length === 0 ? (
          <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <Text>No Upcoming Matches Found</Text>
          </View>
        ) : selectedTab === 'previous' && previousMatches.length === 0 ? (
          <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <Text>No Previous Matches Found</Text>
          </View>
        ) : (
          <FlatList
            data={selectedTab === 'upcoming' ? upcomingMatches : previousMatches}
            renderItem={renderMatches}
            ListFooterComponent={<View style={{height: vs(180)}} />}
          />
        )}
      </View>
    </View>
  );
};

export default ViewAllMatches;
