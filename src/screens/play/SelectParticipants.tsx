import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Config } from '../../utils/Config';
import { Header } from '../../component';
import { useNavigation } from '@react-navigation/native';
import { s, vs } from 'react-native-size-matters';
import { Colors } from '../../utils/Colors';
import { add, UnCheckTermsIcon } from '../../utils/assets';
import { useDispatch } from 'react-redux';
import apiInstance from '../../utils/apiInstance';
import { setIsloading } from '../../store/Slice/LoginSlice';

const SelectParticipants = ({ route }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [playerDataByTournamentId, setPlayerDataByTournamentId] = useState({});
  const selectedSports = route.params.selectedItems;

  const SelectParticipantsApi = async (tournamnetSportsId) => {
    dispatch(setIsloading(true));

    try {
      const response = await apiInstance.post(
        'Public/viewData/21/TSD_SportandPlayers',
        {
          Tournaments_GroupBy: {
            TournamentSportId: tournamnetSportsId,
          },
        },
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImJiMTA5OTcwLWJlZjQtNDAxOS1iNTAwLThmZmFiN2E3ZThkMCIsIm5iZiI6MTcyNzI3ODczNiwiZXhwIjo4MDM4NTg3OTY4LCJpYXQiOjE3MjcyNzg3MzZ9.KeGQ6YDuEEXID6VN0eCNqWwLtComT4Dmvh-qdXWfPyc`,
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
                {selectedSports.find(sport => sport.tournamnetSportsId === tournamnetSportsId)?.name}
              </Text>
              {playerDataByTournamentId[tournamnetSportsId]?.length > 0 && (
                <Text style={styles.cardTxt}>
                  INR {playerDataByTournamentId[tournamnetSportsId][0].Price}
                </Text>
              )}
            </View>
            <View style={styles.cardFooter}>
              <View style={{flex:1/3,justifyContent:"center",alignItems:"center",borderRightWidth:1,borderColor:Colors.bordergrey}}>
                <TouchableOpacity onPress={() => navigation.navigate('AddParticipant')}>
                  <Image source={add} style={styles.addImage} />
                </TouchableOpacity>
                <Text style={styles.addText}>Add</Text>
              </View>
              <View style={{ flex: 1 }}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                  {playerDataByTournamentId[tournamnetSportsId]?.map((playerItem, playerIndex) => (
                    <View key={playerIndex} style={{  padding: 16 }}>
                      <Image source={UnCheckTermsIcon} style={{ marginLeft: 10 }} />
                      
                      <Text style={styles.addText}>
                        {playerItem.PlayerName || playerItem.TeamName || 'Unknown Player'}
                      </Text>
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
  // Your styles go here
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
