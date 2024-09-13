import {RouteProp, useRoute} from '@react-navigation/native';
import axios from 'axios';
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

import {calender, dropdown, location} from '../../utils/assets';
import {Colors} from '../../utils/Colors';
import {Config} from '../../utils/Config';
import {globalStyles} from '../../utils/GlobalCss';
import {useDispatch} from 'react-redux';
import {setIsloading} from '../../store/Slice/LoginSlice';
import HTMLView from 'react-native-htmlview';
import DropdownEvent from '../../component/DropdownEvent';

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
  const [events, setEvents] = useState([]);
  const [sports, setsports] = useState([]);

  const [dropdownVisibility, setDropdownVisibility] = useState({
    singles: false,
    doubles: false,
    Squash: false,
    Badminton: false,
    TableTennis: false,
  });

  const route = useRoute<RouteProp<RootStackParamList, 'Esporttournamnet'>>();
  const {tournamentId} = route.params;
  const TEXT_LIMIT = 210;

  const toggleDropdown = (type: string) => {
    setDropdownVisibility(prevState => ({
      ...prevState,
      [type]: !prevState[type],
    }));
  };

  const sportdata = async () => {
    dispatch(setIsloading(true));
    axios
      .post(
        'https://dev-slansports.azurewebsites.net/Public/viewData/19/TDetails_HeaderCard',
        {
          tournamentId: tournamentId,
          version: 'M201810251014',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
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

  const rulesandregulations = async () => {
    dispatch(setIsloading(true));
    axios
      .post(
        'https://dev-slansports.azurewebsites.net/Public/viewData/1901/tournament_Otherrules',
        {
          tournamentId: tournamentId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(response => {
        dispatch(setIsloading(false));
        if (response.data) {
          setterms(
            // JSON.stringify(
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
    axios
      .post(
        'https://dev-slansports.azurewebsites.net/Public/viewData/19/Tournaments_GroupBy',
        {
          dataContext: [],
          pageContext: [
            {
              SportsDetails: 2,
              tournamentid: '197',
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
          setEvents(response.data.data.root.rowData_list);
        }
      })
      .catch(error => {
        dispatch(setIsloading(false));
        console.log('Error message: ', error.message);
      });
  };

  const sportsApi = async () => {
    dispatch(setIsloading(true));
    axios
      .post(
        'https://dev-slansports.azurewebsites.net/Public/viewData/19/Tournaments_GroupBy',
        {
          dataContext: [],
          pageContext: [
            {
              SportsDetails: 1,
              tournamentid: '197',
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
          setsports(response.data.data.root.rowData_list);
          console.log(
            'sports daaatatta---------',
            response.data.data.root.rowData_list,
          );
        }
      })
      .catch(error => {
        dispatch(setIsloading(false));
        console.log('Error message: ', error.message);
      });
  };
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const truncateText = (text: string, limit: number) => {
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  };

  useEffect(() => {
    eventApi();
    sportsApi();
    sportdata();
    rulesandregulations();
  }, []);

  const openTerms = () => {
    settermdrop(!termdrop);
  };

  const handleEvents = () => {
    const singles: any[] = [];
    const doubles: any[] = [];

    events.forEach((item: {GroupngColumn: string}) => {
      if (item.GroupngColumn === 'Singles') {
        singles.push(item);
      } else if (item.GroupngColumn === 'Doubles') {
        doubles.push(item);
      }
    });
    return (
      <View>
        <DropdownEvent
          tittle="Single"
          isVisibility={dropdownVisibility.singles}
          toggleVisibility={() => toggleDropdown('singles')}
          data={singles}
        />

        <DropdownEvent
          tittle="Doubles"
          isVisibility={dropdownVisibility.doubles}
          toggleVisibility={() => toggleDropdown('doubles')}
          data={doubles}
        />
      </View>
    );
  };

  const handleSports = () => {
    const Squash: any[] = [];
    const Badminton: any[] = [];
    const TableTennis: any[] = [];

    sports.forEach((item: {GroupngColumn: string}) => {
      if (item.GroupngColumn === 'Squash') {
        Squash.push(item);
      } else if (item.GroupngColumn === 'Badminton') {
        Badminton.push(item);
      } else if (item.GroupngColumn === 'Table Tennis') {
        TableTennis.push(item);
      }
    });
    return (
      <View>
        <DropdownEvent
          tittle="Squash"
          isVisibility={dropdownVisibility.Squash}
          toggleVisibility={() => toggleDropdown('Squash')}
          data={Squash}
        />

        <DropdownEvent
          tittle="Badminton"
          isVisibility={dropdownVisibility.Badminton}
          toggleVisibility={() => toggleDropdown('Badminton')}
          data={Badminton}
        />
        <DropdownEvent
          tittle="Table Tennis"
          isVisibility={dropdownVisibility.TableTennis}
          toggleVisibility={() => toggleDropdown('TableTennis')}
          data={TableTennis}
        />
      </View>
    );
  };

  const handleMonth = () => {
    return (
      <View>
        <View style={styles.eventsBorderBox}>
          <Text
            style={[globalStyles.selectEventTxt, {color: Colors.lightOrange}]}>
            Month
          </Text>
          <TouchableOpacity>
            <Image source={dropdown} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

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
        {esportdata.About.length > TEXT_LIMIT && (
          <TouchableOpacity onPress={toggleExpand}>
            <Text style={globalStyles.smallLightOrangetxt}>
              {isExpanded ? 'Read Less' : 'Read More'}
            </Text>
          </TouchableOpacity>
        )}
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
                style={[globalStyles.btnbox,{borderColor: selectedradio == 1 ? Colors.Orange : Colors.bordergrey}]}>
                {selectedradio == 1 ? (
                  <View style={globalStyles.btnboxbg}></View>
                ) : null}
              </TouchableOpacity>
              <Text style={globalStyles.radiotxt}>By Events</Text>
            </View>
            <View style={globalStyles.btncontainer}>
              <TouchableOpacity
                onPress={() => setSelectedRadio(2)}
                style={[globalStyles.btnbox,{borderColor: selectedradio == 2 ? Colors.Orange : Colors.bordergrey}]}>
                {selectedradio == 2 ? (
                  <View style={globalStyles.btnboxbg}></View>
                ) : null}
              </TouchableOpacity>
              <Text style={globalStyles.radiotxt}>By Sports</Text>
            </View>

            <View style={globalStyles.btncontainer}>
              <TouchableOpacity
                onPress={() => setSelectedRadio(3)}
                style={[globalStyles.btnbox,{borderColor: selectedradio == 3 ? Colors.Orange : Colors.bordergrey}]}>
                {selectedradio == 3 ? (
                  <View style={globalStyles.btnboxbg}></View>
                ) : null}
              </TouchableOpacity>
              <Text style={globalStyles.radiotxt}>By Month</Text>
            </View>
          </View>
        </View>

        {selectedradio == 1 && handleEvents()}
        {selectedradio == 2 && handleSports()}
        {selectedradio == 3 && handleMonth()}

        <View style={styles.rulesConatiner}>
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

        {termdrop && <HTMLView value={terms} />}

        <Button tittle="Register" />
      </ScrollView>
    </View>
  );
};

export default Esporttournamnet;

const styles = StyleSheet.create({
  html: {
    fontSize: s(16),
    color: '#333',
    a: {
      fontWeight: '300',
      color: '#FF3366',
    },
  },
  rulesConatiner: {
    flexDirection: 'row',
    marginTop: vs(12),
    borderBottomWidth: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: Colors.bordergrey,
    justifyContent: 'space-between',
  },
  eventsBorderBox: {
    flexDirection: 'row',
    marginTop: vs(12),
    borderWidth: 1,
    alignContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderColor: Colors.bordergrey,
  },
  eventItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: Colors.bordergrey,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
