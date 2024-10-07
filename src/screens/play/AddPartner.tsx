


// import React, { useEffect, useState } from 'react';
// import {
//   Text,
//   View,
//   ScrollView,
//   FlatList,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
// } from 'react-native';
// import { Button, Header, TextField } from '../../component';
// import { Config } from '../../utils/Config';
// import { globalStyles } from '../../utils/GlobalCss';
// import { CheckTermsIcon, phoneIcon, UnCheckTermsIcon, userIcon } from '../../utils/assets';
// import { useDispatch } from 'react-redux';
// import { useNavigation } from '@react-navigation/native';
// import { setIsloading } from '../../store/Slice/LoginSlice';
// import apiInstance from '../../utils/apiInstance';
// import { s, vs } from 'react-native-size-matters';
// import AsyncStorage from '@react-native-async-storage/async-storage';

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

//   const checkSelectedItems = (sportId:any) => {
//     const updatedSports = sportsSelect.map(sport => {
//       if (sport.SportId === sportId) {
//         return {
//           ...sport,
//           IsSportSelected: sport.IsSportSelected === "0" ? "1" : "0" // toggle selection
//         };
//       }
//       return sport;
//     });
//     setSportSelect(updatedSports);
//   };

//   const renderSportsList = ({ item }) => {
//     return (
//       <View style={styles.item}>
//         <TouchableOpacity onPress={() => checkSelectedItems(item.SportId)}>
//           <Image
//             source={item.IsSportSelected === "1" ? CheckTermsIcon : UnCheckTermsIcon}
//             style={{ marginLeft: 12, marginBottom: 12 }}
//           />
//         </TouchableOpacity>
//         <Text style={globalStyles.twelFont}>{item.Sport_Name}</Text>
//       </View>
//     );
//   };

//   const handleChange = (field) => (text) => {
//     setFieldData(prevState => ({
//       ...prevState,
//       [field]: text
//     }));
//   };

//   const AddPartnerApi = async() => {
//     const getToken = await AsyncStorage.getItem('TOKEN');
//    const response =  await apiInstance.post('private/data/403/default',
//     {
//       Leagues_AddPartner: [
//           {
//               partner_Detailstype: 1,
//               MobileNumber: filedData.EnterPhoneNo,
//               action: null,
//               Name: filedData.EnterName,
//               PageId: null,
//               UserTeamId: null,
//               ResourceId: null
//           }
//       ],
//       Leagues_Partner: [
//           {
//               IsSportSelected: false,
//               SportName: "Tennis",
//               SportId: "1"
//           },
//           {
//               IsSportSelected: false,
//               SportName: "VolleyBall",
//               SportId: "2"
//           },
//           {
//               IsSportSelected: 1,
//               SportName: "Badminton",
//               SportId: "3"
//           },
//           {
//               IsSportSelected: false,
//               SportName: "Snooker",
//               SportId: "4"
//           },
//           {
//               IsSportSelected: false,
//               SportName: "Dribble Football",
//               SportId: "5"
//           },
//           {
//               IsSportSelected: 1,
//               SportName: "Table Tennis",
//               SportId: "6"
//           },
//           {
//               IsSportSelected: false,
//               SportName: "Cricket",
//               SportId: "7"
//           },
//           {
//               IsSportSelected: false,
//               SportName: "Basketball",
//               SportId: "8"
//           },
//           {
//               IsSportSelected: false,
//               SportName: "Football",
//               SportId: "9"
//           },
//           {
//               IsSportSelected: false,
//               SportName: "Carroms",
//               SportId: "10"
//           },
//           {
//               IsSportSelected: false,
//               SportName: "Bowling",
//               SportId: "11"
//           },
//           {
//               IsSportSelected: false,
//               SportName: "Pool",
//               SportId: "12"
//           },
//           {
//               IsSportSelected: false,
//               SportName: "Squash",
//               SportId: "13"
//           },
//           {
//               IsSportSelected: false,
//               SportName: "Chess",
//               SportId: "14"
//           },
//           {
//               IsSportSelected: false,
//               SportName: "Box Cricket",
//               SportId: "15"
//           },
//           {
//               IsSportSelected: false,
//               SportName: "Archery (3 Slots)",
//               SportId: "26"
//           },
//           {
//               IsSportSelected: false,
//               SportName: "Carroms",
//               SportId: "30"
//           },
//           {
//               IsSportSelected: false,
//               SportName: "Shoot the Stumps",
//               SportId: "31"
//           },
//           {
//               IsSportSelected: false,
//               SportName: "Bowl at the Stumps",
//               SportId: "32"
//           },
//           {
//               IsSportSelected: false,
//               SportName: "Kho Kho",
//               SportId: "33"
//           },
//           {
//               IsSportSelected: false,
//               SportName: "Throwball",
//               SportId: "34"
//           },
//           {
//               IsSportSelected: false,
//               SportName: "Scrabble",
//               SportId: "35"
//           },
//           {
//               IsSportSelected: false,
//               SportName: "Swimming-Freestyle",
//               SportId: "36"
//           },
//           {
//               IsSportSelected: false,
//               SportName: "Soccer",
//               SportId: "37"
//           },
//           {
//               IsSportSelected: false,
//               SportName: "PUBG",
//               SportId: "38"
//           },
//           {
//               IsSportSelected: false,
//               SportName: "Tennikoit",
//               SportId: "39"
//           },
//           {
//               IsSportSelected: false,
//               SportName: "LUDO",
//               SportId: "40"
//           }
//       ],
//       Leagues_buttonGroup: [
//           {
//               Save: null
//           }
//       ],
//       geolocation: {
//           lat: 13.6547078,
//           lon: 79.4354937
//       },
//       serialNumber: "0db0edf30cd01110",
//       type: "Android",
//       appContext: {
//           location: null,
//           profile: {
//               FirstName: "Als",
//               imageUrl: "http://www.stg.slansports.com/assets/images/san/default.png",
//               editUrl: "http://www.stg.slansports.com/assets/images/san/edit-profile.png",
//               share: [
//                   "WhatsApp",
//                   "Facebook",
//                   "Instagram",
//                   "Twitter"
//               ],
//               ResourceId: "file/1068"
//           }
//       },
//       version: "M201810251014"
//   },
//   {
//     headers: {
//       Authorization: `Bearer ${getToken}`,
//     },
//   } 
//    )
//    if(response.data){
//    console.log("response.data--------",response.data)
//     //navigation.navigate("Play")
//    }

//   }

//   const logSelectedSports = () => {
//     const selectedSports = sportsSelect.filter(sport => sport.IsSportSelected === "1");
//     console.log("Selected Sports:", selectedSports);
//   };

//   useEffect(() => {
//     sportDataGet();
//   }, []);

//   return (
//     <View>
//       <Header
//         showImage={false}
//         tittle={Config.addpartner}
//         backImage={true}
//         onPress={() => navigation.goBack()}
//       />
//       <ScrollView style={[globalStyles.screenSpacing, { marginBottom: 150 }]}>
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
//           onChangeTxt={handleChange("EnterPhoneNo")}
//           maxLength={10}
//           mobilno={'+91-'}
//         />
//         <View style={styles.container}>
//           <FlatList
//             data={sportsSelect}
//             renderItem={renderSportsList}
//             numColumns={3}
//             keyExtractor={(item) => item.SportId.toString()} // Ensure unique key
//             showsVerticalScrollIndicator={false} // Optional: hide scroll indicator
//             scrollEnabled={true}
//             contentContainerStyle={globalStyles.listContainer}
//           />
//         </View>
//         <Button
//           tittle={Config.save}
//           // onPress={logSelectedSports} // Log selected sports on button press
//           onPress={AddPartnerApi}
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { s, vs } from 'react-native-size-matters';

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

  const checkSelectedItems = (sportId) => {
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

  const handleChange = (field:any) => (text:any) => {
    setFieldData(prevState => ({
      ...prevState,
      [field]: text
    }));
  };

  const AddPartnerApi = async () => {
    const getToken = await AsyncStorage.getItem('TOKEN');

    // Get selected sports
    const selectedSports = sportsSelect.filter(sport => sport.IsSportSelected === "1");

    // Create Leagues_Partner array based on selected sports
    const leaguesPartner = selectedSports.map(sport => ({
      IsSportSelected: true,
      SportName: sport.Sport_Name,
      SportId: sport.SportId,
    }));


    const response = await apiInstance.post(
      'private/data/403/default',
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
        Leagues_Partner: leaguesPartner, // Use dynamically created array
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
    );

    if (response.data) {
      // console.log("response.data--------", response.data);
      navigation.navigate("Play");
    }
  };

  const isFormValid = () => {
    return (
      filedData.EnterName.trim() !== '' &&
      filedData.EnterPhoneNo.trim() !== '' 
     
    );
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
          maxLength={1}
          keyboardType={'phone-pad'}
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
          onPress={AddPartnerApi}
          disabled={!isFormValid()}
        />
      </ScrollView>
    </View>
  );
};

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

export default AddPartner;
