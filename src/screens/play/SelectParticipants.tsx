import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { s, vs } from 'react-native-size-matters';
import { useDispatch } from 'react-redux';
import { Header } from '../../component';
import { setIsloading } from '../../store/Slice/LoginSlice';
import { Colors } from '../../utils/Colors';
import { Config } from '../../utils/Config';
import apiInstance from '../../utils/apiInstance';
import { add, UnCheckTermsIcon } from '../../utils/assets';

const SelectParticipants = ({ route }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [playerDataByTournamentId, setPlayerDataByTournamentId] = useState({});
  const [userdependentTypeId , setUserDependentTypeId] = useState("")
  const selectedSports = route.params?.selectedItems;

  const SelectParticipantsApi = async (tournamnetSportsId) => {
    dispatch(setIsloading(true));

    try {
      const getToken = await AsyncStorage.getItem('TOKEN');
      const response = await apiInstance.post(
        'Public/viewData/21/TSD_SportandPlayers',
        {
          Tournaments_GroupBy: {
            TournamentSportId: tournamnetSportsId,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      );

      if (response.data) {
        const rowDataList = response.data.data.root.rowData_list || [];
        return { tournamnetSportsId, rowDataList };
      }
    } catch (error) {
      console.log('Error message: ', error.message);
      return { tournamnetSportsId, rowDataList: [] };
    } finally {
      dispatch(setIsloading(false));
    }
  };

  const handleAddPress = (tournamentSportsId) => {
    const playerData = playerDataByTournamentId[tournamentSportsId];

    if (playerData && playerData.length > 0) {
      const checkDependentID = playerData[0].DependentTypeId;
      const ispartner = playerData[0].ispartner;
      console.log("ispartner=========",ispartner)
      if(checkDependentID == 1003 || checkDependentID == 11){
        navigation.navigate("AddParticipant");
      }
      else if(checkDependentID == 1004 && ispartner == 1){
        navigation.navigate("AddPartner");
      }else if(checkDependentID == 1004 && ispartner == 0){
        navigation.navigate("AddTeam");
      }
      else {
        console.log('No player data available.');
      }
    }
  };
  
  useEffect(() => {
    const fetchAllParticipants = async () => {
      dispatch(setIsloading(true));
      try {
        const results = await Promise.all(
          selectedSports.map(item => SelectParticipantsApi(item.tournamnetSportsId))
        );

        const newPlayerDataByTournamentId = {};
        results.forEach(({ tournamnetSportsId, rowDataList }) => {
          newPlayerDataByTournamentId[tournamnetSportsId] = rowDataList;
        });

        setPlayerDataByTournamentId(newPlayerDataByTournamentId);
      } catch (error) {
        console.error('Error fetching participants:', error);
      } finally {
        dispatch(setIsloading(false));
      }
    };

    fetchAllParticipants();
  }, [selectedSports]);

  return (
    <View style={{ backgroundColor: '#fff', flex: 1 }}>
      <Header
        showImage={false}
        tittle={Config.selectparticipants}
        backImage={true}
        onPress={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {Object.keys(playerDataByTournamentId).map((tournamnetSportsId, index) => (
          <View key={index} style={styles.cardContainer}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTxt}>
                {selectedSports?.find(sport => sport.tournamnetSportsId === tournamnetSportsId)?.name}
              </Text>
              {playerDataByTournamentId[tournamnetSportsId]?.length > 0 && (
                <Text style={styles.cardTxt}>
                  INR {playerDataByTournamentId[tournamnetSportsId][0].Price}
                </Text>
              )}
            </View>
            <View style={styles.cardFooter}>
              <View style={{flex:1/3,justifyContent:"center",alignItems:"center",borderRightWidth:1,borderColor:Colors.bordergrey}}>
                <TouchableOpacity 
                  //onPress={() => navigation.navigate('AddParticipant')}
                  onPress={() => handleAddPress(tournamnetSportsId)}
                >
                  <Image source={add} style={styles.addImage} />
                </TouchableOpacity>
                <Text style={styles.addText}>{Config.add}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                  {playerDataByTournamentId[tournamnetSportsId]?.map((playerItem, playerIndex) => (
                    <View key={playerIndex} style={{  padding: 16 }}>
                      <Image source={UnCheckTermsIcon} style={{ marginLeft: 10 }} />
                      
                      <Text style={styles.addText}>
                        {playerItem.PlayerName || playerItem.TeamName || 'Unknown Player'}
                      </Text>
                      <Text>DependentTypeId : {playerItem.DependentTypeId}</Text>
                    </View>
                  ))}
                </ScrollView>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 20,
    marginTop:12
  },
  cardContainer: {
    backgroundColor: "#EFEFEF",
    borderTopLeftRadius:12,
    borderBottomLeftRadius:12,
    marginBottom: 15,
    padding: 5,
    marginLeft:12
    
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth:1,
    padding:12,
    borderColor:Colors.lightbordergrey
  },
  cardTxt: {
    fontSize: s(13),
    color: Colors.black,
    fontFamily:Config.medium
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent:"center",
    marginBottom:s(15)
  },
  addButtonContainer: {
    
    alignItems: 'center',
    flex:1
    },
  addImage: {
    width: s(20),
    height: s(20),
    resizeMode:"contain"
    //marginRight: 5,
  },
  addText: {
    fontSize: s(12),
    fontFamily:Config.regular,
    marginTop:vs(12),
    color:Colors.black

  },
});

export default SelectParticipants;
