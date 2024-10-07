import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { s, vs } from 'react-native-size-matters';
import { useDispatch } from 'react-redux';
import { Button, Header, TextField } from '../../component';
import { setIsloading } from '../../store/Slice/LoginSlice';
import { Config } from '../../utils/Config';
import { globalStyles } from '../../utils/GlobalCss';
import apiInstance from '../../utils/apiInstance';
import { CheckTermsIcon, UnCheckTermsIcon, uploaddoc, userIcon } from '../../utils/assets';
import { Colors } from '../../utils/Colors';
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';


const AddTeam = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [sportsSelect, setSportSelect] = useState([]);
  const [selectedradio, setSelectedRadio] = useState(1);
  const [file, setFile] = useState(null);
  const [teamName,setTeamName] = useState("")


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

  const renderSportsList = ({item}: any) => {
    return (
      <View style={styles.item}>
        <TouchableOpacity onPress={() => checkSelectedItems(item.SportId)}>
        <Image
          source={item.IsSportSelected === "1" ? CheckTermsIcon : UnCheckTermsIcon}
          style={{marginLeft: 12, marginBottom: 12}}
        />
        </TouchableOpacity>
        <Text style={globalStyles.twelFont}>{item.Sport_Name}</Text>
      </View>
    );
  };

  const pickDocument = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles], // You can specify types here
      });
      setFile(res[0]); // Access the first file from the array
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User canceled the picker');
      } else {
        console.error('Error picking document: ', err);
      }
    }
  };

  const isFormValid = () => {
    return (
      teamName.trim() !== '' &&
      file  !== null 
     
    );
  };

  const AddTeamApi = async () => {
    const getToken = await AsyncStorage.getItem('TOKEN');

    const selectedSports = sportsSelect.filter(sport => sport.IsSportSelected === "1");

    const leaguesPartner = selectedSports.map(sport => ({
      IsSportSelected: true,
      SportName: sport.Sport_Name,
      SportId: sport.SportId,
    }));

    const response = await apiInstance.post(
      'private/data/40202/default',
      {
        AddTeam_TeamName: [
            {
                TeamName: teamName,
                Pfl_Image: null,
                kidteam: true, 
                coach: false,
                pflkidteam: false,
                ResourceId: null,
                pflCoach: false,
                TeamId: "2563",
                isKidLeague: null,
                pageId: null,
                mobileNumber: null,
                isCallFrom: null
            }
        ],
        AddTeam_selectSports: leaguesPartner,
        AddTeam_buttonGroup: [
            {
                SaveTeam: null
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
      console.log("team response.data-@@@@@@@@@@@@@@@@-------", response.data);
     navigation.navigate("Play");
    }
  };

  useEffect(() => {
    sportDataGet();
  }, []);

  return (
    <View>
      <Header
        showImage={false}
        tittle={Config.addteam}
        backImage={true}
        onPress={() => navigation.goBack()}
      />
      <ScrollView style={[globalStyles.screenSpacing,{marginBottom:150}]}>
        <TextField
          placeholder={Config.addteamname}
          source={userIcon}
          value={teamName}
          onChangeTxt={text => setTeamName(text)}
        />
          <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: vs(12),
          }}>
          <TouchableOpacity onPress={pickDocument}>
            <Image source={uploaddoc} />
          </TouchableOpacity>
          <Text
            style={{fontSize: s(13), color: Colors.Orange, paddingLeft: 12}}>
            {/* Upload ID Proof */}
            {file ? `${file.name}` : "Upload Team Logo"}
          </Text>
          
        </View>

         <View
          style={{
            flexDirection: 'row',
            marginTop: vs(20),
            marginBottom: vs(20),
          }}>
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
            <Text style={globalStyles.radiotxt}>{Config.childteam}</Text>
          </View>
          <View style={[globalStyles.btncontainer, {marginLeft: s(40)}]}>
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
            <Text style={globalStyles.radiotxt}>{Config.nonchildteam}</Text>
          </View>
        </View>
      
       
        <View style={styles.container}>
          <FlatList
            data={sportsSelect}
            renderItem={renderSportsList}
            numColumns={3}
            keyExtractor={(item) => item.SportId.toString()}
            showsVerticalScrollIndicator={false} // Optional: hide scroll indicator
            scrollEnabled={true}
            contentContainerStyle={globalStyles.listContainer}
          />
        </View>
        <Button
          tittle={Config.save}
          onPress={AddTeamApi}
          disabled={!isFormValid()}
        />
      </ScrollView>
    </View>
  );
};

export default AddTeam;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    //padding: 10,
    //margin: 10,
  },
  item: {
    flex: 1,
    padding: s(9),
    marginTop: vs(1),
    borderRadius: 5,
    justifyContent: 'center',
  },
});

// export default AddPartner;
