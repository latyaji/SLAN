// import React, {useEffect, useState} from 'react';
// import {
//   Text,
//   View,
//   ScrollView,
//   FlatList,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
// } from 'react-native';
// import {Button, Header, TextField} from '../../component';
// import {Config} from '../../utils/Config';
// import {globalStyles} from '../../utils/GlobalCss';
// import {CheckTermsIcon, phoneIcon, UnCheckTermsIcon, userIcon} from '../../utils/assets';
// import {useDispatch} from 'react-redux';
// import {useNavigation} from '@react-navigation/native';
// import {setIsloading} from '../../store/Slice/LoginSlice';
// import apiInstance from '../../utils/apiInstance';
// import {s, vs} from 'react-native-size-matters';

// const AddPartner = () => {
//   const dispatch = useDispatch();
//   const navigation = useNavigation();

//   const [sportsSelect, setSportSelect] = useState([]);
//   const [filedData, setFieldData] = useState({
//     EnterDetails: '',
//     EnterName: '',
//     EnterPhoneNo: '',
//   });

//   const sportDataGet = () => {
//     dispatch(setIsloading(true));
//     apiInstance.post('Public/viewData/1/Sport_MultiSelect').then(response => {
//       dispatch(setIsloading(false));
//       if (response.data) {
//         setSportSelect(response.data.data.root.rowData_list);
//       }
//     });
//   };

//   const checkSelectedItems = (sportId:any) =>{
//     // console.log("checkSelectedItems------",sportId)
//     const updatedSports = sportsSelect.map(sport => {
//                   if (sport.sportId === sportId) {
//                       return {
//                           ...sport,
//                           IsSportSelected: sport.IsSportSelected === "0" ? "1" : "0" // toggle selection
//                       };
//                   }
//                   return sport;
//               });
//               setSportSelect(updatedSports);

//   }

//   const renderSportsList = ({item}: any) => {
   
//     return (
//       <View style={styles.item}>
//         <TouchableOpacity onPress={()=> checkSelectedItems(item.SportId)}>
//           <Image
//             // source={UnCheckTermsIcon}
//             source={item.IsSportSelected === "1" ? CheckTermsIcon : UnCheckTermsIcon}
//             style={{marginLeft: 12, marginBottom: 12}}
//           />
//         </TouchableOpacity>
//         <Text style={globalStyles.twelFont}>{item.Sport_Name}</Text>
//       </View>
//     );
//   };

//  const handleChange = (field:any) => (text:any) =>{
//   setFieldData(prevState=>({
//     ...prevState,
//     [field] : text
//   }))

//  } 

//   useEffect(() => {
//     sportDataGet();
//   }, []);

//   console.log('sportsSelect----=', JSON.stringify(sportsSelect,null,4));

//   return (
//     <View>
//       <Header
//         showImage={false}
//         tittle={Config.addpartner}
//         backImage={true}
//         onPress={() => navigation.goBack()}
//       />
//       <ScrollView style={[globalStyles.screenSpacing, {marginBottom: 150}]}>
//         <TextField
//           placeholder={Config.enterdetails}
//           source={userIcon}
//           value={filedData.EnterDetails}
//           onChangeTxt={handleChange("EnterDetails")}
//         />
//         <TextField
//           placeholder={Config.entername}
//           source={userIcon}
//           value={filedData.EnterName}
//           onChangeTxt={handleChange("EnterName")}
//           maxLength={25}
//         />
//         <TextField
//           placeholder={Config.enterPhone}
//           source={phoneIcon}
//           keyboardType={'phone-pad'}
//           value={filedData.EnterPhoneNo}
//           onChangeTxt={handleChange("EnterPhone")}
//           maxLength={10}
//           mobilno={'+91-'}
//         />
//         <View style={styles.container}>
//           <FlatList
//             data={sportsSelect}
//             renderItem={renderSportsList}
//             numColumns={3}
//             // keyExtractor={(item) => item.id.toString()} // Ensure unique key
//             keyExtractor={(item, index) => index.toString()}
//             showsVerticalScrollIndicator={false} // Optional: hide scroll indicator
//             scrollEnabled={true}
//             contentContainerStyle={globalStyles.listContainer}
//           />
//         </View>
//         <Button
//           tittle={Config.save}
//           // onPress={sportDataGet}
//           //disabled={!isFormValid()}
//         />
//       </ScrollView>
//     </View>
//   );
// };

// export default AddPartner;

// const styles = StyleSheet.create({
//   container: {
//     borderWidth: 1,
//     borderColor: '#000',
//     borderRadius: 5,
//     //padding: 10,
//     //margin: 10,
//   },
//   item: {
//     flex: 1,
//     padding: s(9),
//     marginTop: vs(1),
//     borderRadius: 5,
//     justifyContent: 'center',
//   },
// });




import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Button, Header, TextField } from '../../component';
import { Config } from '../../utils/Config';
import { globalStyles } from '../../utils/GlobalCss';
import { CheckTermsIcon, phoneIcon, UnCheckTermsIcon, userIcon } from '../../utils/assets';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { setIsloading } from '../../store/Slice/LoginSlice';
import apiInstance from '../../utils/apiInstance';
import { s, vs } from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddPartner = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [sportsSelect, setSportSelect] = useState([]);
  const [filedData, setFieldData] = useState({
    EnterDetails: '',
    EnterName: '',
    EnterPhoneNo: '',
  });

  const sportDataGet = () => {
    dispatch(setIsloading(true));
    apiInstance.post('Public/viewData/1/Sport_MultiSelect').then(response => {
      dispatch(setIsloading(false));
      if (response.data) {
        setSportSelect(response.data.data.root.rowData_list);
      }
    });
  };

  const checkSelectedItems = (sportId:any) => {
    const updatedSports = sportsSelect.map(sport => {
      if (sport.SportId === sportId) {
        return {
          ...sport,
          IsSportSelected: sport.IsSportSelected === "0" ? "1" : "0" // toggle selection
        };
      }
      return sport;
    });
    setSportSelect(updatedSports);
  };

  const renderSportsList = ({ item }) => {
    return (
      <View style={styles.item}>
        <TouchableOpacity onPress={() => checkSelectedItems(item.SportId)}>
          <Image
            source={item.IsSportSelected === "1" ? CheckTermsIcon : UnCheckTermsIcon}
            style={{ marginLeft: 12, marginBottom: 12 }}
          />
        </TouchableOpacity>
        <Text style={globalStyles.twelFont}>{item.Sport_Name}</Text>
      </View>
    );
  };

  const handleChange = (field) => (text) => {
    setFieldData(prevState => ({
      ...prevState,
      [field]: text
    }));
  };

  const AddPartnerApi = async() => {
    const getToken = await AsyncStorage.getItem('TOKEN');
   const response =  await apiInstance.post('private/data/403/default',
    {
      Leagues_AddPartner: [
          {
              partner_Detailstype: 1,
              MobileNumber: filedData.EnterPhoneNo,
              action: null,
              Name: filedData.EnterName,
              PageId: null,
              UserTeamId: null,
              ResourceId: null
          }
      ],
      Leagues_Partner: [
          {
              IsSportSelected: false,
              SportName: "Tennis",
              SportId: "1"
          },
          {
              IsSportSelected: false,
              SportName: "VolleyBall",
              SportId: "2"
          },
          {
              IsSportSelected: 1,
              SportName: "Badminton",
              SportId: "3"
          },
          {
              IsSportSelected: false,
              SportName: "Snooker",
              SportId: "4"
          },
          {
              IsSportSelected: false,
              SportName: "Dribble Football",
              SportId: "5"
          },
          {
              IsSportSelected: 1,
              SportName: "Table Tennis",
              SportId: "6"
          },
          {
              IsSportSelected: false,
              SportName: "Cricket",
              SportId: "7"
          },
          {
              IsSportSelected: false,
              SportName: "Basketball",
              SportId: "8"
          },
          {
              IsSportSelected: false,
              SportName: "Football",
              SportId: "9"
          },
          {
              IsSportSelected: false,
              SportName: "Carroms",
              SportId: "10"
          },
          {
              IsSportSelected: false,
              SportName: "Bowling",
              SportId: "11"
          },
          {
              IsSportSelected: false,
              SportName: "Pool",
              SportId: "12"
          },
          {
              IsSportSelected: false,
              SportName: "Squash",
              SportId: "13"
          },
          {
              IsSportSelected: false,
              SportName: "Chess",
              SportId: "14"
          },
          {
              IsSportSelected: false,
              SportName: "Box Cricket",
              SportId: "15"
          },
          {
              IsSportSelected: false,
              SportName: "Archery (3 Slots)",
              SportId: "26"
          },
          {
              IsSportSelected: false,
              SportName: "Carroms",
              SportId: "30"
          },
          {
              IsSportSelected: false,
              SportName: "Shoot the Stumps",
              SportId: "31"
          },
          {
              IsSportSelected: false,
              SportName: "Bowl at the Stumps",
              SportId: "32"
          },
          {
              IsSportSelected: false,
              SportName: "Kho Kho",
              SportId: "33"
          },
          {
              IsSportSelected: false,
              SportName: "Throwball",
              SportId: "34"
          },
          {
              IsSportSelected: false,
              SportName: "Scrabble",
              SportId: "35"
          },
          {
              IsSportSelected: false,
              SportName: "Swimming-Freestyle",
              SportId: "36"
          },
          {
              IsSportSelected: false,
              SportName: "Soccer",
              SportId: "37"
          },
          {
              IsSportSelected: false,
              SportName: "PUBG",
              SportId: "38"
          },
          {
              IsSportSelected: false,
              SportName: "Tennikoit",
              SportId: "39"
          },
          {
              IsSportSelected: false,
              SportName: "LUDO",
              SportId: "40"
          }
      ],
      Leagues_buttonGroup: [
          {
              Save: null
          }
      ],
      geolocation: {
          lat: 13.6547078,
          lon: 79.4354937
      },
      serialNumber: "0db0edf30cd01110",
      type: "Android",
      appContext: {
          location: null,
          profile: {
              FirstName: "Als",
              imageUrl: "http://www.stg.slansports.com/assets/images/san/default.png",
              editUrl: "http://www.stg.slansports.com/assets/images/san/edit-profile.png",
              share: [
                  "WhatsApp",
                  "Facebook",
                  "Instagram",
                  "Twitter"
              ],
              ResourceId: "file/1068"
          }
      },
      version: "M201810251014"
  },
  {
    headers: {
      Authorization: `Bearer ${getToken}`,
    },
  } 
   )
   if(response.data){
   console.log("response.data--------",response.data)
    //navigation.navigate("Play")
   }

  }

  const logSelectedSports = () => {
    const selectedSports = sportsSelect.filter(sport => sport.IsSportSelected === "1");
    console.log("Selected Sports:", selectedSports);
  };

  useEffect(() => {
    sportDataGet();
  }, []);

  return (
    <View>
      <Header
        showImage={false}
        tittle={Config.addpartner}
        backImage={true}
        onPress={() => navigation.goBack()}
      />
      <ScrollView style={[globalStyles.screenSpacing, { marginBottom: 150 }]}>
        <TextField
          placeholder={Config.enterdetails}
          source={userIcon}
          value={filedData.EnterDetails}
          onChangeTxt={handleChange("EnterDetails")}
        />
        <TextField
          placeholder={Config.entername}
          source={userIcon}
          value={filedData.EnterName}
          onChangeTxt={handleChange("EnterName")}
          maxLength={25}
        />
        <TextField
          placeholder={Config.enterPhone}
          source={phoneIcon}
          keyboardType={'phone-pad'}
          value={filedData.EnterPhoneNo}
          onChangeTxt={handleChange("EnterPhoneNo")}
          maxLength={10}
          mobilno={'+91-'}
        />
        <View style={styles.container}>
          <FlatList
            data={sportsSelect}
            renderItem={renderSportsList}
            numColumns={3}
            keyExtractor={(item) => item.SportId.toString()} // Ensure unique key
            showsVerticalScrollIndicator={false} // Optional: hide scroll indicator
            scrollEnabled={true}
            contentContainerStyle={globalStyles.listContainer}
          />
        </View>
        <Button
          tittle={Config.save}
          // onPress={logSelectedSports} // Log selected sports on button press
          onPress={AddPartnerApi}
        />
      </ScrollView>
    </View>
  );
};

export default AddPartner;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
  },
  item: {
    flex: 1,
    padding: s(9),
    marginTop: vs(1),
    borderRadius: 5,
    justifyContent: 'center',
  },
});




// import React, { useState } from 'react';
// import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
// import { CheckTermsIcon, UnCheckTermsIcon } from '../../utils/assets';


// const sportsData = [
//   {
//       RowNum: "1",
//       SportId: "1",
//       Sport_Name: "Tennis",
//       Sport_Image: "/assets/images/san/sports/tennis.jpg",
//       IsSportSelected: "0",
//       RangeLabel: "How would you rate yourself?"
//   },
//   {
//       RowNum: "2",
//       SportId: "2",
//       Sport_Name: "VolleyBall",
//       Sport_Image: "/assets/images/san/sports/volleyball.jpg",
//       IsSportSelected: "0",
//       RangeLabel: "How would you rate yourself?"
//   },
//   {
//       RowNum: "3",
//       SportId: "3",
//       Sport_Name: "Badminton",
//       Sport_Image: "/assets/images/san/sports/badminton.jpg",
//       IsSportSelected: "0",
//       RangeLabel: "How would you rate yourself?"
//   },
//   {
//       RowNum: "4",
//       SportId: "4",
//       Sport_Name: "Snooker",
//       Sport_Image: "/assets/images/san/sports/snooker.jpg",
//       IsSportSelected: "0",
//       RangeLabel: "How would you rate yourself?"
//   },
//   {
//       RowNum: "5",
//       SportId: "5",
//       Sport_Name: "Dribble Football",
//       Sport_Image: "/assets/images/san/sports/football.jpg",
//       IsSportSelected: "0",
//       RangeLabel: "How would you rate yourself?"
//   },
//   {
//       RowNum: "6",
//       SportId: "6",
//       Sport_Name: "Table Tennis",
//       Sport_Image: "/assets/images/san/sports/table-tennis.jpg",
//       IsSportSelected: "0",
//       RangeLabel: "How would you rate yourself?"
//   },
//   {
//       RowNum: "7",
//       SportId: "7",
//       Sport_Name: "Cricket",
//       Sport_Image: "/assets/images/san/sports/cricket.jpg",
//       IsSportSelected: "0",
//       RangeLabel: "How would you rate yourself?"
//   },
//   {
//       RowNum: "8",
//       SportId: "8",
//       Sport_Name: "Basketball",
//       Sport_Image: "/assets/images/san/sports/basketball.jpg",
//       IsSportSelected: "0",
//       RangeLabel: "How would you rate yourself?"
//   },
//   {
//       RowNum: "9",
//       SportId: "9",
//       Sport_Name: "Football",
//       Sport_Image: "/assets/images/san/tournaments/SoccerKidsLeagueseason4.png",
//       IsSportSelected: "0",
//       RangeLabel: "How would you rate yourself?"
//   },
//   {
//       RowNum: "10",
//       SportId: "10",
//       Sport_Name: "Carroms",
//       Sport_Image: "/assets/images/san/sports/carroms.jpg",
//       IsSportSelected: "0",
//       RangeLabel: "How would you rate yourself?"
//   },
//   {
//       RowNum: "11",
//       SportId: "11",
//       Sport_Name: "Bowling",
//       Sport_Image: "/assets/images/san/sports/bowling.jpg",
//       IsSportSelected: "0",
//       RangeLabel: "How would you rate yourself?"
//   },
//   {
//       RowNum: "12",
//       SportId: "12",
//       Sport_Name: "Pool",
//       Sport_Image: "/assets/images/san/sports/pool.jpg",
//       IsSportSelected: "0",
//       RangeLabel: "How would you rate yourself?"
//   },
//   {
//       RowNum: "13",
//       SportId: "13",
//       Sport_Name: "Squash",
//       Sport_Image: "/assets/images/san/sports/Squash.jpg",
//       IsSportSelected: "0",
//       RangeLabel: "How would you rate yourself?"
//   },
//   {
//       RowNum: "14",
//       SportId: "14",
//       Sport_Name: "Chess",
//       Sport_Image: "/assets/images/san/tournaments/StreetChess.png",
//       IsSportSelected: "0",
//       RangeLabel: "How would you rate yourself?"
//   },
//   {
//       RowNum: "15",
//       SportId: "15",
//       Sport_Name: "Box Cricket",
//       Sport_Image: "/assets/images/san/sports/cricket.jpg",
//       IsSportSelected: "0",
//       RangeLabel: "How would you rate yourself?"
//   },
//   {
//       RowNum: "16",
//       SportId: "26",
//       Sport_Name: "Archery (3 Slots)",
//       IsSportSelected: "0",
//       RangeLabel: "How would you rate yourself?"
//   },
//   {
//       RowNum: "17",
//       SportId: "28",
//       Sport_Name: "Badminton",
//       Sport_Image: "/assets/images/san/sports/badminton.jpg",
//       IsSportSelected: "0",
//       RangeLabel: "How would you rate yourself?"
//   },
//   {
//       RowNum: "18",
//       SportId: "30",
//       Sport_Name: "Carroms",
//       Sport_Image: "/assets/images/san/sports/carroms.jpg",
//       IsSportSelected: "0",
//       RangeLabel: "How would you rate yourself?"
//   },
//   {
//       RowNum: "19",
//       SportId: "31",
//       Sport_Name: "Shoot the Stumps",
//       IsSportSelected: "0",
//       RangeLabel: "How would you rate yourself?"
//   },
//   {
//       RowNum: "20",
//       SportId: "32",
//       Sport_Name: "Bowl at the Stumps",
//       IsSportSelected: "0",
//       RangeLabel: "How would you rate yourself?"
//   },
//   {
//       RowNum: "21",
//       SportId: "33",
//       Sport_Name: "Kho Kho",
//       IsSportSelected: "0",
//       RangeLabel: "How would you rate yourself?"
//   },
//   {
//       RowNum: "22",
//       SportId: "34",
//       Sport_Name: "Throwball",
//       IsSportSelected: "0",
//       RangeLabel: "How would you rate yourself?"
//   },
//   {
//       RowNum: "23",
//       SportId: "35",
//       Sport_Name: "Scrabble",
//       IsSportSelected: "0",
//       RangeLabel: "How would you rate yourself?"
//   },
//   {
//       RowNum: "24",
//       SportId: "36",
//       Sport_Name: "Swimming-Freestyle",
//       IsSportSelected: "0",
//       RangeLabel: "How would you rate yourself?"
//   },
//   {
//       RowNum: "25",
//       SportId: "37",
//       Sport_Name: "Soccer",
//       Sport_Image: "/assets/images/san/tournaments/SoccerKidsLeagueseason4.png",
//       IsSportSelected: "0",
//       RangeLabel: "How would you rate yourself?"
//   },
//   {
//       RowNum: "26",
//       SportId: "38",
//       Sport_Name: "PUBG",
//       IsSportSelected: "0",
//       RangeLabel: "How would you rate yourself?"
//   },
//   {
//       RowNum: "27",
//       SportId: "39",
//       Sport_Name: "Tennikoit",
//       IsSportSelected: "0",
//       RangeLabel: "How would you rate yourself?"
//   },
//   {
//       RowNum: "28",
//       SportId: "40",
//       Sport_Name: "LUDO",
//       IsSportSelected: "0",
//       RangeLabel: "How would you rate yourself?"
//   }
// ]

// const AddPartner = () => {
//     const [sportsSelect, setSportsSelect] = useState(sportsData);

//     const toggleCheckbox = (sportId:any) => {
//       console.log("sportid------",sportId)
//         const updatedSports = sportsSelect.map(sport => {
//             if (sport.SportId === sportId) {
//                 return {
//                     ...sport,
//                     IsSportSelected: sport.IsSportSelected === "0" ? "1" : "0" // toggle selection
//                 };
//             }
//             return sport;
//         });
//         setSportsSelect(updatedSports);
//     };

//     const renderItem = ({ item }) => (
//         <View style={styles.itemContainer}>
//             {/* <Image source={{ uri: item.Sport_Image }} style={styles.image} /> */}
//             <Text style={styles.sportName}>{item.Sport_Name}</Text>
//             <TouchableOpacity onPress={() => toggleCheckbox(item.SportId)}>
//                 <Image
//                     source={item.IsSportSelected === "1" ? CheckTermsIcon : UnCheckTermsIcon}
//                     style={styles.checkbox}
//                 />
//             </TouchableOpacity>
//         </View>
//     );

//     console.log("sportsSelect---------------",sportsSelect)
//     return (
//         <FlatList
//             data={sportsSelect}
//             renderItem={renderItem}
//             keyExtractor={item => item.SportId}
            
//         />
//     );
// };

// const styles = StyleSheet.create({
//     itemContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         padding: 10,
//     },
//     image: {
//         width: 50,
//         height: 50,
//         marginRight: 10,
//     },
//     sportName: {
//         flex: 1,
//         fontSize: 16,
//     },
//     checkbox: {
//         width: 24,
//         height: 24,
//         marginLeft: 12,
//         marginBottom: 12,
//     },
// });

// export default AddPartner;
