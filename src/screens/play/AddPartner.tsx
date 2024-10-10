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
