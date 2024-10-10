import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {globalStyles} from '../../utils/GlobalCss';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Config} from '../../utils/Config';
import {s} from 'react-native-size-matters';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiInstance from '../../utils/apiInstance';
import {setIsloading} from '../../store/Slice/LoginSlice';
import { Header } from '../../component';
import { Matcher } from '../../component/Loader';
import { useNavigation } from '@react-navigation/native';

const Track = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const [alltournamnet, setAllTournamnet] = useState([]);

  const matchesViewall = () => {
    navigation.navigate('ViewAllMatches');
    // alert("matchessViewall checkkkkkk")
  };
  const eventsViewall = () => {
    navigation.navigate('AllEvents');
    // alert("eventsViewall checkkkkkk")
  };

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

  const renderItem = ({item}:any) => (
    <TouchableOpacity
      onPress={() => onPress(item.tournamentId)}
      style={globalStyles.cardContainer}>
      <View style={globalStyles.imgCard}>
        <Image
          source={{uri: item.Tournament_Image}}
          style={globalStyles.cardImg}
        />
      </View>
      <View style={{paddingLeft: s(20), width: s(200)}}>
        <Text style={styles.tournamentTittle}>{item.Tournament_Name}</Text>
        <Text style={styles.tournamentDuration}>{item.TrnmtPeriod}</Text>
        <Text style={styles.tournamnetType}>{item.TrnmtSpclType}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <Header showImage={false} tittle={Config.mymatches} backImage={false} />
      <View style={globalStyles.screenSpacing}>
        <Matcher
          tittle={Config.mymatches}
          onPress={matchesViewall}
          nodatafound={Config.nodataavailable}
        />
        <Matcher
          tittle={Config.myevents}
          onPress={eventsViewall}
          // nodatafound={Config.nodataavailable}
        />
      <FlatList
        data={alltournamnet.slice(0, 3)} // Display only the first 3 items
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={item => item.tournamentId}
        contentContainerStyle={styles.listContainer}
      />
       </View>
    </View>
  );
};

const styles = StyleSheet.create({

  listContainer: {
    paddingHorizontal: 10,
  },
  cardContainer: {
    width: 150,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
  },
  cardImg: {
    width: '100%',
    height: 100,
  },
  tournamentTittle: {
    fontSize: s(13),
    fontFamily: Config.medium,
    color: Colors.black,
  },
  tournamentDuration: {
    fontSize: s(12),
    fontFamily: Config.regular,
    color: Colors.Orange,
  },
  tournamnetType: {
    fontFamily: Config.regular,
    fontSize: s(11),
    color: '#595959'
  },
});

export default Track;
