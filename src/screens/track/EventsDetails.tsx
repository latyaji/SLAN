import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Header } from '../../component';
import {
  EventScheduleMatchesCard,
  ListCardDetails,
} from '../../component/Loader';
import { setIsloading } from '../../store/Slice/LoginSlice';
import { AppDispatch } from '../../store/Store';
import apiInstance from '../../utils/apiInstance';
import { Colors } from '../../utils/Colors';
import { globalStyles } from '../../utils/GlobalCss';

const EventsDetails = ({navigation: {goBack}}: any) => {
  const route = useRoute();
  const {eventsdetails} = route.params;

  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const [alltournamnet, setAllTournamnet] = useState({});
  const [allMatches, setAllMatches] = useState({});
  const [myMatchesdata, setMyMatches] = useState({});
  const [scroedata, setScoreData] = useState([]);
  const [selectedradio, setSelectedRadio] = useState(1);
  const [selectedTab, setSelectedTab] = useState('pointstable');

  const viewallEventsApiCall = async () => {
    const getToken = AsyncStorage.getItem('TOKEN');
    dispatch(setIsloading(true));
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

  const tableScroreApiCall = async () => {
    const getToken = AsyncStorage.getItem('TOKEN');
    dispatch(setIsloading(true));
    apiInstance
      .post('Public/viewData/2001/GroupA_dataGrid', {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
        categoryId: eventsdetails.categoryId,
        tournamentId: eventsdetails.tournamentId,
        version: 'M201810251014',
      })
      .then(response => {
        dispatch(setIsloading(false));
        if (response.data) {
          setScoreData(response.data.data.root.rowData_list);
        }
      })
      .catch(error => {
        dispatch(setIsloading(false));
        console.log('Error message: ', error.message);
      });
  };

  const viewAllMatches = async () => {
    dispatch(setIsloading(true));
    const getToken = AsyncStorage.getItem('TOKEN');
    apiInstance
      .post('Public/viewData/2001/Match2_dataGrid', {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
      .then(response => {
        dispatch(setIsloading(false));
        if (response.data) {
          setAllMatches(response.data.data.root.rowData_list);
        }
      })
      .catch(error => {
        dispatch(setIsloading(false));
        console.log('Error message: ', error.message);
      });
  };

  const myMatches = async () => {
    dispatch(setIsloading(true));
    const getToken = AsyncStorage.getItem('TOKEN');
    apiInstance
      .post('Public/viewData/2001/Match2_dataGrid', {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
      .then(response => {
        dispatch(setIsloading(false));
        if (response.data) {
          setMyMatches(response.data.data.root.rowData_list);
        }
      })
      .catch(error => {
        dispatch(setIsloading(false));
        console.log('Error message: ', error.message);
      });
  };

  const PointTable = () => {
    return (
      <View style={{paddingLeft: 12, alignContent: 'center'}}>
        <View style={globalStyles.topborder} />
        <View style={globalStyles.seventypercentcontainer}>
          <Text style={globalStyles.mediumorangetxt}>Carroms</Text>
        </View>
        <View style={globalStyles.topborder} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 12,
          }}>
          <View style={{width: '30%'}}>
            <Text style={globalStyles.mediumorangetxt}>Name</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              width: '70%',
            }}>
            <Text style={globalStyles.mediumorangetxt}>P</Text>
            <Text style={globalStyles.mediumorangetxt}>W</Text>
            <Text style={globalStyles.mediumorangetxt}>N/R</Text>
            <Text style={globalStyles.mediumorangetxt}>L</Text>
            <Text style={globalStyles.mediumorangetxt}>Pts</Text>
          </View>
        </View>
        <View style={globalStyles.topborder} />
        {scroedata.map((item: any, index) => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderBottomWidth: 1,
              padding: 10,
              borderColor: Colors.bordergrey,
            }}>
            <View style={{width: '30%'}}>
              <Text style={globalStyles.mediumBlacktxt}>
                <Text>{index + 1}.</Text> {item.playerName}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                width: '70%',
              }}>
              <Text style={globalStyles.mediumBlacktxt}>{item.Played}</Text>
              <Text style={globalStyles.mediumBlacktxt}>{item.Win}</Text>
              <Text style={globalStyles.mediumBlacktxt}>{item.noResults}</Text>
              <Text style={globalStyles.mediumBlacktxt}>{item.Loss}</Text>
              <Text style={globalStyles.mediumBlacktxt}>{item.Points}</Text>
            </View>
          </View>
        ))}
      </View>
    );
  };

  const AllMatches = () => {
    return (
      <FlatList
        data={allMatches}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => <EventScheduleMatchesCard data={item} />}
      />
    );
  };

  const MyMatches = () => {
    console.log("my matchessssssss")
    return (
      <FlatList
        data={myMatchesdata}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => <EventScheduleMatchesCard data={item} />}
      />
    );
  };

  const ScheduleTable = () => {
    return (
      <View style={[globalStyles.seventypercentcontainer, {paddingLeft: 12}]}>
        <View style={globalStyles.btncontainer}>
          <TouchableOpacity
            onPress={() => setSelectedRadio(1)}
            style={[
              globalStyles.btnbox,
              {
                borderColor:
                  selectedradio == 1 ? Colors.Orange : Colors.bordergrey,
              },
            ]}>
            {selectedradio == 1 ? (
              <View style={globalStyles.btnboxbg}></View>
            ) : null}
          </TouchableOpacity>
          <Text style={globalStyles.radiotxt}>All Matches</Text>
        </View>
        <View style={globalStyles.btncontainer}>
          <TouchableOpacity
            onPress={() => setSelectedRadio(2)}
            style={[
              globalStyles.btnbox,
              {
                borderColor:
                  selectedradio == 2 ? Colors.Orange : Colors.bordergrey,
              },
            ]}>
            {selectedradio == 2 ? (
              <View style={globalStyles.btnboxbg}></View>
            ) : null}
          </TouchableOpacity>
          <Text style={globalStyles.radiotxt}>My Matches</Text>
        </View>
      </View>
    );
  };

  const toggleBtn = () => {
    return (
      <View style={globalStyles.toggleContainer}>
        <TouchableOpacity
          onPress={() => setSelectedTab('pointstable')}
          style={[
            globalStyles.button,
            selectedTab === 'pointstable'
              ? globalStyles.selectedButton
              : globalStyles.unselectedButton,
            {borderTopLeftRadius: 20, borderBottomLeftRadius: 20},
          ]}>
          <Text
            style={
              selectedTab === 'pointstable'
                ? globalStyles.selectedText
                : globalStyles.unselectedText
            }>
            Points Table
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab('schedules')}
          style={[
            globalStyles.button,
            selectedTab === 'schedules'
              ? globalStyles.selectedButton
              : globalStyles.unselectedButton,
            {borderTopRightRadius: 20, borderBottomRightRadius: 20},
          ]}>
          <Text
            style={
              selectedTab === 'schedules'
                ? globalStyles.selectedText
                : globalStyles.unselectedText
            }>
            Schedules
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const eventsection = () => {
    return (
      <View style={{margin: 12}}>
        <ListCardDetails
          img={eventsdetails.Tournament_Image}
          name={eventsdetails.Tournament_Name}
          date={eventsdetails.startDate}
          location={eventsdetails.TrnmtSpclType}
        />
        <View style={globalStyles.seventypercentcontainer}>
          <Text style={globalStyles.mediumorangetxt}>Events</Text>
          <Text style={globalStyles.mediumorangetxt}>Player Name</Text>
        </View>
        <View style={globalStyles.topborder} />
        <View style={globalStyles.seventypercentcontainer}>
          <Text style={globalStyles.mediumBlacktxt}>Carrom-Singles</Text>
          <Text style={globalStyles.mediumBlacktxt}>Subbu-SP</Text>
        </View>
        <View style={globalStyles.topborder} />
      </View>
    );
  };

  useEffect(() => {
    viewallEventsApiCall();
    tableScroreApiCall();
    viewAllMatches();
    myMatches();
  }, []);

  return (
    <View style={{flex: 1}}>
      <Header
        showImage={false}
        tittle={eventsdetails.Tournament_Name}
        backImage={true}
        onPress={() => goBack()}
      />
      <ScrollView>
        {eventsection()}
        {toggleBtn()}
        {selectedTab === 'pointstable' ? <PointTable /> : <ScheduleTable />}
        {selectedradio == 1 ? <AllMatches /> : <MyMatches />}
      </ScrollView>
    </View>
  );
};

export default EventsDetails;
