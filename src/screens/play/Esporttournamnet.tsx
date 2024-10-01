import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import {s, vs} from 'react-native-size-matters';
import {Button, Header} from '../../component';
import {RootStackParamList} from '../../types';

import {
  calender,
  CheckTermsIcon,
  dropdown,
  location,
  UnCheckTermsIcon,
} from '../../utils/assets';
import {Colors} from '../../utils/Colors';
import {Config} from '../../utils/Config';
import {globalStyles} from '../../utils/GlobalCss';
import {useDispatch} from 'react-redux';
import {setIsloading} from '../../store/Slice/LoginSlice';
import HTMLView from 'react-native-htmlview';
import apiInstance from '../../utils/apiInstance';

const Esporttournamnet = ({navigation}: any) => {
  const dispatch = useDispatch();
  const [esportdata, setesportdata] = useState({
    Tournament_VenueName: '',
    Tournament_StartDate: '',
    Tournament_Name: '',
    Tournament_Image: '',
    About: '',
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const [terms, setterms] = useState('');
  const [termdrop, settermdrop] = useState(false);
  const [selectedradio, setSelectedRadio] = useState(1);

  const [groupTittle, setGroupTittle] = useState({})
  const [SportgroupTittle, setSportGroupTittle] = useState({});
  const [MonthTittle, setMonthTittle] = useState({});


  const [openSection, setOpenSection] = useState(null);
  const [checkedItems, setCheckedItems] = useState(new Set());

  const toggleSection = (section: string | React.SetStateAction<null>) => {
    setOpenSection(openSection === section ? null : section);
  };

  
  const toggleCheckbox = (key:any, index:any,item:any) => {
    console.log("item-----",item)
    setCheckedItems(prevCheckedItems => {
      const newCheckedItems = new Set(prevCheckedItems);
      const itemKey = `${key}-${index}`;
      if (newCheckedItems.has(itemKey)) {
        newCheckedItems.delete(itemKey);
      } else {
        newCheckedItems.add(itemKey);
      }
      return newCheckedItems;
    });
  };



  const handleRegister = () => {
    const selectedIDs = Array.from(checkedItems).map(item => {
      const [key, index] = item.split('-');
      let selectedItem;
  
      if (selectedradio === 1) {
        selectedItem = groupTittle[key]?.[index];
      } else if (selectedradio === 2) {
        selectedItem = SportgroupTittle[key]?.[index];
      } else if (selectedradio === 3) {
        selectedItem = MonthTittle[key]?.[index];
      }
      return {
        id: selectedItem?.TournamentId || null,
        name: selectedItem?.SportName || '',
        tournamnetSportsId : selectedItem?.TournamentSportId || null,
        teamname : selectedItem?.TeamName || "",
        playername : selectedItem?.playername || "",
        fee: selectedItem?.SportFee || 0,
      };
    });
  
    if (selectedIDs.length === 0) {
      alert('Please select at least one sport to register.');
      return;
    }
  
    navigation.navigate('SelectParticipants', { selectedItems: selectedIDs });
  };
  

  const route = useRoute<RouteProp<RootStackParamList, 'Esporttournamnet'>>();
  const {tournamentId} = route.params;
  const TEXT_LIMIT = 210;

  const sportListingdataApi = async () => {
    dispatch(setIsloading(true));
    apiInstance
      .post(
        'Public/viewData/19/TDetails_HeaderCard',
        {
          tournamentId: tournamentId,
          version: 'M201810251014',
        },
        // {
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        // },
      )
      .then(response => {
        dispatch(setIsloading(false));
        if (response.data) {
          setesportdata(response.data.data.root.rowData);
        }
      })
      .catch(error => {
        dispatch(setIsloading(false));
        console.log('Error message: ', error.message);
      });
  };

  const rulesandregulationsApi = async () => {
    dispatch(setIsloading(true));
    apiInstance
      .post(
        'Public/viewData/1901/tournament_Otherrules',
        {
          tournamentId: tournamentId,
        },
        // {
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        // },
      )
      .then(response => {
        dispatch(setIsloading(false));
        if (response.data) {
          setterms(
            
            response.data.data.root.rowData_list[0].TD_Otherrules,
          );
        }
      })
      .catch(error => {
        dispatch(setIsloading(false));
        console.log('Error message: ', error.message);
      });
  };

  const eventApi = async () => {
    dispatch(setIsloading(true));
    apiInstance
      .post(
        'Public/viewData/19/Tournaments_GroupBy',
        {
          dataContext: [],
          pageContext: [
            {
              SportsDetails: 2,
              tournamentid: tournamentId,
              geographyId: '31',
            },
          ],
          infinite: {
            limit: 10,
            offset: 0,
            infiniteScrollFlag: false,
          },
          geolocation: {
            lat: 13.6531302,
            lon: 79.4378633,
          },
          serialNumber: '0db0edf30cd01110',
          type: 'Android',
          appContext: {
            role: '0',
            profile: {
              FirstName: 'Subbu SP',
              imageUrl:
                'http://www.stg.slansports.com/assets/images/san/default.png',
              editUrl:
                'http://www.stg.slansports.com/assets/images/san/edit-profile.png',
              share: ['WhatsApp', 'Facebook', 'Instagram', 'Twitter'],
            },
          },
          version: 'M201810251014',
        },
      )
      .then(response => {
        dispatch(setIsloading(false));
        if (response.data) {
          const rowDataList = response.data.data.root.rowData_list;

          const groupedData = {};
          rowDataList.forEach(
            (item: {GroupName: any; SportName: any; TournamentFee: any; TournamentSportId:any ; TournamentId:any}) => {
              const groupName = item.GroupName;

              if (!groupedData[groupName]) {
                groupedData[groupName] = [];
              }

              groupedData[groupName].push({
                SportName: item.SportName,
                SportFee: item.TournamentFee,
                TournamentSportId: item.TournamentSportId,
                TournamentId: item.TournamentId
              });
            },
          );

          setGroupTittle(groupedData);
        }
      })
      .catch(error => {
        dispatch(setIsloading(false));
        console.log('Error message: ', error.message);
      });
  };

  const sportsApi = async () => {
    dispatch(setIsloading(true));
    apiInstance
      .post(
        'Public/viewData/19/Tournaments_GroupBy',
        {
          dataContext: [],
          pageContext: [
            {
              SportsDetails: 1,
              tournamentid: tournamentId,
              geographyId: '31',
            },
          ],
          infinite: {
            limit: 10,
            offset: 0,
            infiniteScrollFlag: false,
          },
          geolocation: {
            lat: 13.6531302,
            lon: 79.4378633,
          },
          serialNumber: '0db0edf30cd01110',
          type: 'Android',
          appContext: {
            role: '0',
            profile: {
              FirstName: 'Subbu SP',
              imageUrl:
                'http://www.stg.slansports.com/assets/images/san/default.png',
              editUrl:
                'http://www.stg.slansports.com/assets/images/san/edit-profile.png',
              share: ['WhatsApp', 'Facebook', 'Instagram', 'Twitter'],
            },
          },
          version: 'M201810251014',
        },
      )
      .then(response => {
        dispatch(setIsloading(false));
        if (response.data) {
          //setsports(response.data.data.root.rowData_list);
          const rowSportDataList = response.data.data.root.rowData_list;
          // console.log('rowSportDataList----->>>', rowSportDataList);
          const groupedData = {};
          rowSportDataList.forEach((item: any) => {
            const groupName = item.GroupName;

            if (!groupedData[groupName]) {
              groupedData[groupName] = [];
            }

            groupedData[groupName].push({
              SportName: item.SportName,
              SportFee: item.TournamentFee,
              TournamentSportId: item.TournamentSportId,
               TournamentId: item.TournamentId
            });
            setSportGroupTittle(groupedData);
          });
        }
      })
      .catch(error => {
        dispatch(setIsloading(false));
        console.log('Error message: ', error.message);
      });
  };
  const monthApi = async () => {
    dispatch(setIsloading(true));
    apiInstance
      .post(
        'Public/viewData/19/Tournaments_GroupBy',
        {
         
          pageContext: [
              {
                  SportsDetails: 5,
                  tournamentid: tournamentId,
                  geographyId: "31"
              }
          ]
      }
      )
      .then(response => {
        dispatch(setIsloading(false));
        if (response.data) {
          const rowSportDataList = response.data.data.root.rowData_list;
          const groupedData = {};
          rowSportDataList.forEach((item: any) => {
            const groupName = item.GroupName;

            if (!groupedData[groupName]) {
              groupedData[groupName] = [];
            }

            groupedData[groupName].push({
              SportName: item.SportName,
              SportFee: item.TournamentFee,
              TournamentSportId: item.TournamentSportId,
                TournamentId: item.TournamentId
            });
            setMonthTittle(groupedData);
          });
        }
      })
      .catch(error => {
        dispatch(setIsloading(false));
        console.log('Error message: ', error.message);
      });
  };

  const ReadLessMoreBtn = () => {
    setIsExpanded(!isExpanded);
  };

  const truncateText = (text: string, limit: number) => {
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  };



  const openTerms = () => {
    settermdrop(!termdrop);
  };

  const handleEvents = () => {
    return Object.keys(groupTittle).map(key => (
      <View>
        <View key={key} style={globalStyles.eventsBorderBox}>
          <Text
            style={[globalStyles.selectEventTxt, {color: Colors.lightOrange}]}>
            {key}
          </Text>
          <TouchableOpacity onPress={() => toggleSection(key)}>
            <Image
              source={dropdown}
              style={{
                transform: [
                  {rotate: openSection === key ? '360deg' : '270deg'},
                ],
              }}
            />
          </TouchableOpacity>
        </View>

        {openSection === key && (
          <View style={{paddingLeft: 10, paddingTop: 10}}>
            {groupTittle[key].map((item, index) => (
              <View
                key={`${key}-${index}`}
                style={globalStyles.eventsListseparator}>
               <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => toggleCheckbox(key, index,item)}>
                  <Image
                    source={
                      checkedItems.has(`${key}-${index}`)
                        ? CheckTermsIcon
                        : UnCheckTermsIcon
                    }
                    style={globalStyles.textIcon}
                  />
                </TouchableOpacity>
                <Text style={globalStyles.radiotxt}>{item.SportName}</Text>
              </View>
                <Text key={index} style={globalStyles.radiotxt}>
                  INR {item?.SportFee}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
    ));
  };

 
  const handleSports = () => {
    return Object.keys(SportgroupTittle).map(key => (
      <View key={key}>
        <View style={globalStyles.eventsBorderBox}>
          <Text
            style={[globalStyles.selectEventTxt, {color: Colors.lightOrange}]}>
            {key}
          </Text>
          <TouchableOpacity onPress={() => toggleSection(key)}>
            <Image
              source={dropdown}
              style={{
                transform: [
                  {rotate: openSection === key ? '360deg' : '270deg'},
                ],
              }}
            />
          </TouchableOpacity>
        </View>

        {openSection === key && (
          <View style={{paddingLeft: 10, paddingTop: 10}}>
            {SportgroupTittle[key].map((item, index) => (
              <View
                key={`${key}-${index}`} // Use a unique key by combining group name and index
                style={globalStyles.eventsListseparator}>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity onPress={() => toggleCheckbox(key, index,item)}>
                    <Image
                      source={
                        checkedItems.has(`${key}-${index}`)
                          ? CheckTermsIcon
                          : UnCheckTermsIcon
                      }
                      style={globalStyles.textIcon}
                    />
                  </TouchableOpacity>
                  <Text style={globalStyles.radiotxt}>{item.SportName}</Text>
                </View>
                <Text style={globalStyles.radiotxt}>INR {item?.SportFee}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    ));
  };

  const handleMonth = () => {
    return Object.keys(MonthTittle).map(key => (
      <View key={key}>
        <View style={globalStyles.eventsBorderBox}>
          <Text
            style={[globalStyles.selectEventTxt, {color: Colors.lightOrange}]}>
            {key}
          </Text>
          <TouchableOpacity onPress={() => toggleSection(key)}>
            <Image
              source={dropdown}
              style={{
                transform: [
                  {rotate: openSection === key ? '360deg' : '270deg'},
                ],
              }}
            />
          </TouchableOpacity>
        </View>

        {openSection === key && (
          <View style={{paddingLeft: 10, paddingTop: 10}}>
            {MonthTittle[key].map((item, index) => (
              <View
                key={`${key}-${index}`} // Use a unique key by combining group name and index
                style={globalStyles.eventsListseparator}>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity onPress={() => toggleCheckbox(key, index,item)}>
                    <Image
                      source={
                        checkedItems.has(`${key}-${index}`)
                          ? CheckTermsIcon
                          : UnCheckTermsIcon
                      }
                      style={globalStyles.textIcon}
                    />
                  </TouchableOpacity>
                  <Text style={globalStyles.radiotxt}>{item.SportName}</Text>
                </View>
                <Text style={globalStyles.radiotxt}>INR {item?.SportFee}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    ));
  };



  const rulesregulationssection = () => {
    return (
      <View style={globalStyles.rulesConatiner}>
        <Text style={globalStyles.cardtittletxt}>
          {Config.rulesregulations}
        </Text>

        <TouchableOpacity onPress={() => openTerms()}>
          <Image
            source={dropdown}
            style={{transform: [{rotate: termdrop ? '360deg' : '270deg'}]}}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const aboutsection = () => {
    return (
      <>
        <Image
          source={{uri: esportdata.Tournament_Image}}
          style={{width: s(325), height: vs(200), borderRadius: s(10)}}
        />

        <Text style={[globalStyles.cardtittletxt, {marginTop: vs(12)}]}>
          {esportdata.Tournament_Name}
        </Text>

        <View
          style={{flexDirection: 'row', marginTop: vs(12), marginLeft: s(2)}}>
          <Image source={calender} />
          <Text style={[globalStyles.smallLightOrangetxt, {marginLeft: 9}]}>
            {esportdata.Tournament_StartDate}
          </Text>
        </View>

        <View style={{flexDirection: 'row', marginTop: vs(12)}}>
          <Image
            source={location}
            style={{width: s(20), height: vs(15), resizeMode: 'contain'}}
          />

          <Text style={{marginLeft: 6}}>{esportdata.Tournament_VenueName}</Text>
        </View>

        <View
          style={{
            borderTopWidth: 1,
            borderColor: Colors.bordergrey,
            marginTop: vs(12),
          }}
        />

        <Text style={[globalStyles.cardtittletxt, {marginTop: vs(12)}]}>
          {Config.about} 
          {/* {tournamentId} */}
        </Text>
        <Text
          style={{
            fontSize: s(13),
            fontFamily: Config.light,
            marginTop: vs(12),
          }}>
          {isExpanded
            ? esportdata.About
            : truncateText(esportdata.About, TEXT_LIMIT)}
        </Text>
      </>
    );
  };

  const selectevenetsection = () => {
    return (
      <View
      style={{
        borderWidth: 1,
        borderColor: Colors.bordergrey,
        marginTop: vs(22),
        padding: 12,
        borderRadius: 10,
      }}>
      <Text style={globalStyles.selectEventTxt}>{Config.selectevent}</Text>
      <View style={globalStyles.radionmainconatiner}>
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
          <Text style={globalStyles.radiotxt}>By Events</Text>
        </View>
        <View style={globalStyles.btncontainer}>
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
          <Text style={globalStyles.radiotxt}>By Sports</Text>
        </View>

        <View style={globalStyles.btncontainer}>
          <TouchableOpacity
            onPress={() => setSelectedRadio(3)}
            style={[
              globalStyles.btnbox,
              {
                borderColor:
                  selectedradio == 3 ? Colors.Orange : Colors.bordergrey,
              },
            ]}>
            {selectedradio == 3 ? (
              <View style={globalStyles.btnboxbg}></View>
            ) : null}
          </TouchableOpacity>
          <Text style={globalStyles.radiotxt}>By Month</Text>
        </View>
      </View>
    </View>
    )
  }


  useEffect(() => {
    sportListingdataApi();
    eventApi();
    sportsApi();
    monthApi()
    rulesandregulationsApi();
  }, []);


  return (
    <View style={{flex: 1}}>
      <Header
        showImage={false}
        tittle={esportdata.Tournament_Name}
        backImage={true}
        onPress={() => navigation.goBack()}
      />
      <ScrollView
        style={{margin: s(12)}}
        automaticallyAdjustContentInsets={true}>
        {aboutsection()}
        {esportdata.About.length > TEXT_LIMIT && (
          <TouchableOpacity onPress={ReadLessMoreBtn}>
            <Text style={globalStyles.smallLightOrangetxt}>
              {isExpanded ? 'Read Less' : 'Read More'}
            </Text>
          </TouchableOpacity>
        )}

        {selectevenetsection()}

        {selectedradio == 1 && handleEvents()}
        {selectedradio == 2 && handleSports()}
        {selectedradio == 3 && handleMonth()}

        {rulesregulationssection()}
        {termdrop && <HTMLView value={terms} />}

        <Button
          tittle="Register"
          onPress={handleRegister}
        />
      </ScrollView>
    </View>
  );
};

export default Esporttournamnet;


