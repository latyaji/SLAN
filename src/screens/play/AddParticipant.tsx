import React, {useState} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Config} from '../../utils/Config';
import {Header, TextField, Button} from '../../component';
import {useNavigation} from '@react-navigation/native';
import {s, vs} from 'react-native-size-matters';
import {Colors} from '../../utils/Colors';
import {
  add,
  alertIcon,
  calender,
  dropdown,
  dropdownIcon,
  uploaddoc,
  userIcon,
} from '../../utils/assets';
import {globalStyles} from '../../utils/GlobalCss';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import DocumentPicker from 'react-native-document-picker';
import apiInstance from '../../utils/apiInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddParticipant = () => {
  const [selectedradio, setSelectedRadio] = useState(1);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [dropdownIcons, setIsDropdown] = useState(false);
  const [selectIdProof, setselectIdProof] = useState('');
  const [file, setFile] = useState(null);
  const [addParticipantsName,setaddParticipantsName] = useState("")

  const navigation = useNavigation();

  const idProfList = [
    {tittle: 'PanCard'},
    {tittle: 'Aadhar card'},
    {tittle: 'Passport'},
    {tittle: 'School Id'},
    {tittle: 'Bonafide Certificate'},
    {tittle: 'Company Id'},
    {tittle: 'Others'},
  ];

  const isFormValid = () => {
    return (
      addParticipantsName.trim() !== '' &&
     
      selectIdProof.trim() !== '' &&
      file  !== null &&
      selectedStartDate !== null 
    );
  };

  const AddParticipantApi = async() => {
    const getToken = await AsyncStorage.getItem('TOKEN');
   const response =  await apiInstance.post('/private/data/2102/default',
    {
      AddFamilyorTeam_card: [
          {
              Name: addParticipantsName,
              Gender: selectedradio,
              DateofBirth: choosedDate, //2013-10 try this
              TeamName: null,
              Typeid: "1",
              Sports: null,
              idProof: null,
              userIdProof: null,
              idProofResourceId: null,
              memberId: null,
              mobileNumber: 1234567890, // No quotes for numbers
              isCallFrom: null
          }
      ],
      version: "M201810251014"
  } ,
  {
    headers: {
      Authorization: `Bearer ${getToken}`,
    },
  } 
   )
   if(response.data.Message == "Success"){
    alert("Partner added succefully")
    navigation.navigate("Play")
   }

  }
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


  const onDateChange = date => {
    setSelectedStartDate(date);
    setIsCalendarVisible(false); // Close calendar after date select
  };

  const openCalendar = () => {
    setIsCalendarVisible(true);
  };

  const choosedDate = selectedStartDate
    ? moment(selectedStartDate).format('YYYY-DD')
    : '';

  const openDocList = () => {
    setIsDropdown(!dropdownIcons);
  };

  const selectedDoc = (item: any) => {
    setselectIdProof(item.tittle);
    setIsDropdown(false);
  };
 

  return (
    <View>
      <Header
        showImage={false}
        tittle={Config.addparticipants}
        backImage={true}
        onPress={() => navigation.goBack()}
      />
      <View style={globalStyles.screenSpacing}>
        <TextField
          placeholder={Config.entername}
          source={userIcon}
          value={addParticipantsName}
          onChangeTxt={text => setaddParticipantsName(text)}
          maxLength={25}
        />
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
            <Text style={globalStyles.radiotxt}>{Config.male}</Text>
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
            <Text style={globalStyles.radiotxt}>{Config.female}</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <View style={globalStyles.calenderConatiner}>
            <TouchableOpacity onPress={() => openCalendar()}>
              <Image
                source={calender}
                style={[globalStyles.textIcon, {tintColor: '#FE6725'}]}
              />
            </TouchableOpacity>
            <TextInput
              placeholder={Config.DOB}
              placeholderTextColor="#b1b5b2"
              style={globalStyles.regulareTxt}
              value={choosedDate}
              editable={false}
            />
          </View>

          <View style={globalStyles.calenderConatiner}>
            <TextInput
              placeholder={Config.idproff}
              placeholderTextColor="#b1b5b2"
              style={globalStyles.regulareTxt}
              value={selectIdProof}
            />
            <TouchableOpacity onPress={() => openDocList()}>
              <Image
                source={dropdownIcon}
                style={[globalStyles.textIcon, {tintColor: '#FE6725'}]}
              />
            </TouchableOpacity>
          </View>
        </View>
        {isCalendarVisible && (
          <CalendarPicker
            onDateChange={onDateChange}
            selectedDayTextColor="#FFF"
            startFromMonday={true}
            allowRangeSelection={true}
            todayBackgroundColor="#F15A2B"
            textStyle={{
              fontFamily: Config.regular,
              color: '#FE6725A1',
            }}
          />
        )}

        {dropdownIcons && (
          <View
            style={{
              height: 320,
              backgroundColor: '#fff',
              padding: 12,
              margin: 20,
            }}>
            <Text style={globalStyles.radiotxt}>Id proof*</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: 12,
                backgroundColor: Colors.grey,
                paddingHorizontal: 9,
              }}>
              <Text style={globalStyles.smallTxt}>Select Id Proof</Text>
              <Image source={dropdown} />
            </View>
            {idProfList.map(item => (
              <TouchableOpacity
                onPress={() => selectedDoc(item)}
                style={{margin: 2}}>
                <Text
                  style={[
                    globalStyles.smallTxt,
                    {marginTop: 12, paddingHorizontal: 9},
                  ]}>
                  {item.tittle}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

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
            {file ? `${file.name}` : "Upload ID Proof"}
          </Text>
          
        </View>
        <Button
          tittle="Save"
          onPress={AddParticipantApi}
          disabled={!isFormValid()}
        />
      </View>

      {/* <View style={{ padding: 20 }}>
       <Button title="Pick Document" onPress={pickDocument} />
       {file && (
        <Text>
          Selected File: {file.name}
        </Text>
      )}
    </View> */}
    </View>
  );
};

export default AddParticipant;
