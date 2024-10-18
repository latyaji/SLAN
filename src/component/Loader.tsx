import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {View} from 'react-native';
import {Colors} from '../utils/Colors';
import {globalStyles} from '../utils/GlobalCss';
import {Text} from 'react-native-paper';
import {Config} from '../utils/Config';
import {s, vs} from 'react-native-size-matters';
import {calender, location, noImage} from '../utils/assets';
import { colors } from 'react-native-swiper-flatlist/src/themes';

interface MatcherProps {
  tittle: string;
  onPress: () => void;
  nodatafound: string;
}

interface ViewAllListProps {
  data: any;
  onPress: () => any;
}
interface MatchesCardtProps {
  matchedcarddata: any;
}
interface EventScheduleAllMatchesDataProps {
  data: any;
}

interface ListCardDetailsProps {
  img: any;
  name: any;
  date: any;
  location: any;
}


const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={Colors.Orange} size={'large'} />
    </View>
  );
};

export default Loader;

export const Matcher = (MatcherProps: any) => {
  return (
    <>
      <View style={globalStyles.matchesView}>
        <Text style={globalStyles.matchesTxt}>{MatcherProps.tittle}</Text>
        <TouchableOpacity onPress={MatcherProps.onPress}>
          <Text style={globalStyles.trackViewallbtntxt}>{Config.viewall}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export const Matchescard = (MatchesCardtProps: any) => {
  return (
    <View style={globalStyles.trackcardview}>
      <Text style={globalStyles.trackleaguename}>
        {MatchesCardtProps.matchedcarddata.LeagueName}
      </Text>
      <View style={globalStyles.trackplayernameview}>
        <Text style={globalStyles.trackplayername}>
          {MatchesCardtProps.matchedcarddata.Player1_Name}
        </Text>
        <Text style={globalStyles.vstxt}>VS</Text>
        <Text style={globalStyles.trackplayername}>
          {MatchesCardtProps.matchedcarddata.Player2_Name}
        </Text>
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={globalStyles.trackgroupname}>
          {MatchesCardtProps.matchedcarddata.GroupName}
        </Text>
        <Text style={globalStyles.tracklocation}>
          {MatchesCardtProps.matchedcarddata.Location}
        </Text>
        <Text style={globalStyles.trackdate}>
          {MatchesCardtProps.matchedcarddata.StartDate}
        </Text>
      </View>
    </View>
  );
};

export const EventScheduleMatchesCard = (EventScheduleAllMatchesDataProps:any) =>{
  return (
    <View style={{padding:12,borderWidth:1,borderColor:Colors.lightbordergrey}}>
    <View style={globalStyles.matchesContainer}>
      <Text style={globalStyles.eventsPlayerName}>{EventScheduleAllMatchesDataProps.data.Player1_Name}</Text>
      <Text style={[globalStyles.eventsPlayerName,{color:Colors.Orange}]}>VS</Text>
      <Text style={globalStyles.eventsPlayerName}>{EventScheduleAllMatchesDataProps.data.Player2_Name}</Text>
      <Text style={globalStyles.trackgroupname}>{EventScheduleAllMatchesDataProps.data.MactchName}</Text>
      <Text style={globalStyles.trackdate}>{EventScheduleAllMatchesDataProps.data.StartDate}</Text>
    </View>
  </View>
  )
}

export const ViewAllList = (ViewAllListProps: any) => {
  return (
    <FlatList
      data={ViewAllListProps.data}
      horizontal={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={globalStyles.listContainer}
      renderItem={({item}) => (
        <TouchableOpacity
          style={{
            borderBottomWidth: 1,
            padding: s(5),
            flexDirection: 'row',
            borderColor: '#BDCAD9',
          }}
          onPress={() => ViewAllListProps.onPress(item)}>
          <View>
            <Image
              source={
                item.Tournament_Image ? {uri: item.Tournament_Image} : noImage
              }
              style={{width: s(50), height: vs(50), resizeMode: 'cover'}}
            />
          </View>
          <View style={{marginLeft: s(12)}}>
            <Text style={globalStyles.cardtittletxt}>
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
        </TouchableOpacity>
      )}
      ListEmptyComponent={() => (
        <View style={{padding: 20, alignItems: 'center'}}>
          <Text style={{fontSize: 16, color: 'gray'}}>No data found</Text>
        </View>
      )}
    />
  );
};

export const ListCardDetails = (ListCardDetailsProps: any) => {
  return (
    <>
      <Image
        source={{uri: ListCardDetailsProps.img}}
        style={globalStyles.playcarsimg}
      />

      <Text style={[globalStyles.cardtittletxt, {marginTop: vs(12)}]}>
        {ListCardDetailsProps.name}
      </Text>

      <View style={globalStyles.playcarddate}>
        <Image source={calender} />
        <Text
          style={[
            styles.cardLocationtxt,
            {fontFamily: Config.regular, color: Colors.Orange},
          ]}>
          {ListCardDetailsProps.date}
        </Text>
      </View>

      <View style={globalStyles.playcardlocation}>
        <Image source={location} style={globalStyles.locationimg} />

        <Text style={styles.cardLocationtxt}>
          {ListCardDetailsProps.location}
        </Text>
      </View>

      <View style={globalStyles.topborder} />
    </>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    zIndex: 1000,
  },
  cardLocationtxt: {
    marginLeft: 6,
    fontFamily: Config.bold,
    color: Colors.lesslightgrey,
    fontSize: s(13),
  },
});
