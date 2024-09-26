// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Image,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
// } from 'react-native';
// import {Config} from '../../utils/Config';
// import {Header} from '../../component';
// import {useNavigation} from '@react-navigation/native';
// import {s, vs} from 'react-native-size-matters';
// import {Colors} from '../../utils/Colors';
// import {add, UnCheckTermsIcon} from '../../utils/assets';
// import {useDispatch} from 'react-redux';
// import apiInstance from '../../utils/apiInstance';
// import {setIsloading} from '../../store/Slice/LoginSlice';

// const SelectParticipants = ({route}) => {
//   const dispatch = useDispatch();
//   const navigation = useNavigation();
//   const [playerDataByTournamentId, setPlayerDataByTournamentId] = useState({});
//   const selectedSports = route.params.selectedItems;
//   console.log("selectedSports==@@@@@@@@@@=====",selectedSports)
//   // Counter for API calls
//   let apiCallCount = 0;

//   const SelectParticipantsApi = async tournamnetSportsId => {
//     // apiCallCount++; // Increment the counter
//     console.log(
//       `API call #${apiCallCount} initiated for Tournament ID: ${tournamnetSportsId}`,
//     );
//     dispatch(setIsloading(true));

//     try {
//       const response = await apiInstance.post(
//         'Public/viewData/21/TSD_SportandPlayers',
//         {
//           Tournaments_GroupBy: {
//             //TournamentSportId: 1490,
//           },
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImJiMTA5OTcwLWJlZjQtNDAxOS1iNTAwLThmZmFiN2E3ZThkMCIsIm5iZiI6MTcyNzI3ODczNiwiZXhwIjo4MDM4NTg3OTY4LCJpYXQiOjE3MjcyNzg3MzZ9.KeGQ6YDuEEXID6VN0eCNqWwLtComT4Dmvh-qdXWfPyc"}`, // Add the Bearer token here
//           },
//         }
        
//       );
//       console.log("t---------",typeof tournamnetSportsId)

//       dispatch(setIsloading(false));

//       if (response.data) {
//         console.log(
//           'api response000000000',
//           response.data.data.root.rowData_list,
//         );
//         const rowDataList = response.data.data.root.rowData_list;
//         console.log('api============', rowDataList);

//         // Log the received data for the current tournament ID
//         console.log(
//           `received for Tournament ID ${tournamnetSportsId}:`,
//           rowDataList,
//         );

//         return {tournamnetSportsId, rowDataList};
//       }
//     } catch (error) {
//       dispatch(setIsloading(false));
//       console.log('Error message: ', error.message);
//       return {tournamnetSportsId, rowDataList: []};
//     }
//   };

//   useEffect(() => {
//     const fetchAllParticipants = async () => {
//       dispatch(setIsloading(true));
//       try {
//         const results = await Promise.all(
//           selectedSports.map(item => {
//             console.log('i=====', item);
//             const {tournamnetSportsId} = item;
//             console.log("tournamnetSportsId=====>>>>>>>>>>>>",typeof tournamnetSportsId)
//             return SelectParticipantsApi(tournamnetSportsId);
//           }),
//         );

//         // Update state with results
//         const newPlayerDataByTournamentId = {};
//         results.forEach(({tournamnetSportsId, rowDataList}) => {
//           newPlayerDataByTournamentId[tournamnetSportsId] = rowDataList;
//         });

//         setPlayerDataByTournamentId(newPlayerDataByTournamentId);
//       } finally {
//         dispatch(setIsloading(false));
//       }
//     };

//     fetchAllParticipants();
//   }, [selectedSports]);

//   return (
//     <View style={{backgroundColor: '#fff', flex: 1}}>
//       <Header
//         showImage={false}
//         tittle={Config.selectparticipants}
//         backImage={true}
//         onPress={() => navigation.goBack()}
//       />
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         {Object.keys(playerDataByTournamentId).map(
//           (tournamnetSportsId, index) => (
//             <View key={index} style={styles.cardContainer}>
//               <View style={styles.cardHeader}>
//                 <Text style={styles.cardTxt}>
//                   Sport:{' '}
//                   {
//                     selectedSports.find(
//                       sport => sport.tournamnetSportsId === tournamnetSportsId,
//                     )?.name
//                   }
//                 </Text>
//                 {playerDataByTournamentId[tournamnetSportsId]?.length > 0 && (
//                   <Text style={styles.cardTxt}>
//                     INR {playerDataByTournamentId[tournamnetSportsId][0].Price}
//                   </Text>
//                 )}
//               </View>
//               <View style={styles.cardFooter}>
//                 <View style={styles.addButtonContainer}>
//                   <TouchableOpacity
//                     onPress={() => navigation.navigate('AddParticipant')}>
//                     <Image source={add} style={styles.addImage} />
//                   </TouchableOpacity>
//                   <Text style={styles.addText}>Add Participant</Text>
//                 </View>
//                 <View style={{flex: 1}}>
//                   <ScrollView
//                     horizontal={true}
//                     showsHorizontalScrollIndicator={false}>
//                     {playerDataByTournamentId[tournamnetSportsId]?.map(
//                       (playerItem, playerIndex) => (
//                         <View
//                           key={playerIndex}
//                           style={{marginTop: 40, padding: 12}}>
//                           <Image
//                             source={UnCheckTermsIcon}
//                             style={{marginLeft: 10}}
//                           />
//                           <Text>{tournamnetSportsId}</Text>
//                           <Text
//                             style={{
//                               marginRight: 10,
//                               fontSize: s(14),
//                               color: Colors.black,
//                             }}>
//                             {playerItem.PlayerName ||
//                               playerItem.TeamName ||
//                               'Unknown Player'}
//                           </Text>
//                         </View>
//                       ),
//                     ) || null}
//                   </ScrollView>
//                 </View>
//               </View>
//             </View>
//           ),
//         )}
//       </ScrollView>
//     </View>
//   );
// };

// export default SelectParticipants;

// const styles = StyleSheet.create({
//   scrollContainer: {
//     paddingBottom: 20,
//   },
//   cardContainer: {
//     backgroundColor: '#EFEFEF',
//     marginTop: 12,
//     marginLeft: 12,
//     height: 200,
//     borderTopLeftRadius: 14,
//     borderBottomLeftRadius: 14,
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 8,
//     borderBottomWidth: 1,
//     margin: 11,
//     borderColor: Colors.bordergrey,
//   },
//   cardFooter: {
//     flex: 1,
//     flexDirection: 'row',
//   },
//   addButtonContainer: {
//     flex: 1 / 4,
//     justifyContent: 'space-evenly',
//     alignItems: 'center',
//     borderRightWidth: 1,
//     borderColor: Colors.bordergrey,
//     height: vs(80),
//   },
//   addImage: {
//     width: s(20),
//     height: vs(30),
//     resizeMode: 'contain',
//   },
//   addText: {
//     alignSelf: 'center',
//     fontFamily: Config.regular,
//     color: Colors.black,
//   },
//   cardTxt: {
//     fontFamily: Config.medium,
//     fontSize: s(13),
//     fontWeight: 'bold',
//     color: Colors.black,
//   },
// });




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
import { s } from 'react-native-size-matters';
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
              <View style={styles.addButtonContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('AddParticipant')}>
                  <Image source={add} style={styles.addImage} />
                </TouchableOpacity>
                <Text style={styles.addText}>Add Participant</Text>
              </View>
              <View style={{ flex: 1 }}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                  {playerDataByTournamentId[tournamnetSportsId]?.map((playerItem, playerIndex) => (
                    <View key={playerIndex} style={{ marginTop: 40, padding: 12 }}>
                      <Image source={UnCheckTermsIcon} style={{ marginLeft: 10 }} />
                      <Text>{tournamnetSportsId}</Text>
                      <Text style={{ marginRight: 10, fontSize: s(14), color: Colors.black }}>
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
  },
  cardContainer: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTxt: {
    fontSize: s(16),
    color: Colors.black,
  },
  cardFooter: {
    marginTop: 10,
  },
  addButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addImage: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  addText: {
    fontSize: s(14),
    color: Colors.primary,
  },
});

export default SelectParticipants;
