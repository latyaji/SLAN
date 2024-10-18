import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { s } from 'react-native-size-matters';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useDispatch } from 'react-redux';
import { Header } from '../../component';
import { Matcher, Matchescard } from '../../component/Loader';
import { setIsloading } from '../../store/Slice/LoginSlice';
import apiInstance from '../../utils/apiInstance';
import { Config } from '../../utils/Config';
import { globalStyles } from '../../utils/GlobalCss';

const Track = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const [eventsdata, seteventsdata] = useState([]);
  const [matchesdata, setmatchesdata] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const matchesViewall = () => {
    navigation.navigate('ViewAllMatches');
  };

  const eventsViewall = () => {
    navigation.navigate('AllEvents');
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
          seteventsdata(response.data.data.root.rowData_list);
        }
      })
      .catch(error => {
        dispatch(setIsloading(false));
        console.log('Error message: ', error.message);
      });
  };

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
          setmatchesdata(response.data.data.root.rowData_list);
        }
      })
      .catch(error => {
        dispatch(setIsloading(false));
        console.log('Error message: ', error.message);
      });
  };

  useEffect(() => {
    viewallMatchesApiCall();
    viewallEventsApiCall();
  }, []);




  const renderItem = ({item}) => (
    <View
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
    </View>
  );

  const handleScroll = event => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const viewSize = event.nativeEvent.layoutMeasurement.width;

    const activeIndex = Math.floor(contentOffsetX / viewSize);
    setCurrentIndex(activeIndex);
  };

  // Render scroll dots
  const renderDots = (data:any) => {
    return (
      <View style={styles.dotContainer}>
        {data.slice(0, 3).map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {backgroundColor: index === currentIndex ? "#FE6725" : '#D9D9D9'},
            ]}
          />
        ))}
      </View>
    );
  };
  const renderMatches = (item:any) =>{
    return (
      <Matchescard matchedcarddata={item.item}/>
    )
  }

  return (
    <ScrollView>
      <Header showImage={false} tittle={Config.mymatches} backImage={false} />
      <View style={globalStyles.screenSpacing}>
        <Matcher
          tittle={Config.mymatches}
          onPress={matchesViewall}
        />
        <FlatList
          data={matchesdata.slice(0, 3)}
          renderItem={renderMatches}
          horizontal
          showsHorizontalScrollIndicator={false}
         
         />
        <View style={globalStyles.borderBottomtrack} />
        {renderDots(matchesdata)} 
        <Matcher
          tittle={Config.myevents}
          onPress={eventsViewall}
        />
        <FlatList
          ref={flatListRef}
          data={eventsdata.slice(0, 3)} 
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={item => item.tournamentId}
          contentContainerStyle={styles.listContainer}
          pagingEnabled
          onScroll={handleScroll}
          scrollEventThrottle={16} 
        />
        {renderDots(eventsdata)} 
      </View>
    </ScrollView>
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
    color: '#595959',
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});

export default Track;
