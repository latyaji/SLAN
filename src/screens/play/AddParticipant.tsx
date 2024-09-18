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
import {Header, TextField} from '../../component';
import {useNavigation} from '@react-navigation/native';
import {s, vs} from 'react-native-size-matters';
import {Colors} from '../../utils/Colors';
import {
  add,
  calender,
  dropdown,
  dropdownIcon,
  userIcon,
} from '../../utils/assets';
import {globalStyles} from '../../utils/GlobalCss';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';

const AddParticipant = () => {
  const [selectedradio, setSelectedRadio] = useState(1);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [dropdownIcons, setIsDropdown] = useState(false);
  const [selectIdProof,setselectIdProof] = useState("")

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

  const onDateChange = date => {
    setSelectedStartDate(date);
    setIsCalendarVisible(false); // Close calendar after date selected
  };

  const openCalendar = () => {
    setIsCalendarVisible(true);
  };

  const choosedDate = selectedStartDate
    ? moment(selectedStartDate).format('MM/DD/YYYY')
    : '';

  const openDocList = () => {
    setIsDropdown(!dropdownIcons);
    
  };

  const selectedDoc = (item:any) =>{
    setselectIdProof(item.tittle)
    setIsDropdown(false);

  }

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
          // value={name}
          // onChangeTxt={text => dispatch(setName(text))}
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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
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
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
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
              onPress={()=>selectedDoc(item)}
                style={{ margin: 2}}>
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
      </View>
    </View>
  );
};

export default AddParticipant;
