import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { s } from 'react-native-size-matters';
import { Header } from '../../component';
import { Colors } from '../../utils/Colors';
import { Config } from '../../utils/Config';
import { useDispatch } from 'react-redux';
import { setIsloading } from '../../store/Slice/LoginSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiInstance from '../../utils/apiInstance';
import { globalStyles } from '../../utils/GlobalCss';

const ViewAllMatches = ({navigation: {goBack}}:any) => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState('upcoming'); // State to track which button is pressed
  const dispatch = useDispatch<AppDispatch>();
  const [alltournamnet, setAllTournamnet] = useState([]);

  const viewallEventsApiCall = async () => {
    dispatch(setIsloading(true));
    const getToken = AsyncStorage.getItem('TOKEN');
    apiInstance
      .post('Public/viewData/50202/all_matches', {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
      .then(response => {
        
        dispatch(setIsloading(false));
        if (response.data) {
          console.log("callledd-------",response.data.data.root.rowData_list)
          setAllTournamnet(response.data.data.root.rowData_list);
        }
      })
      .catch(error => {
        dispatch(setIsloading(false));
        console.log('Error message: ', error.message);
      });
  };

  const renderMatches = (item:any) =>{
    console.log("i===itemitemitem======",item.item.LeagueName)
    return (
      <View style={{justifyContent:"center",padding:17,borderBottomWidth:1,borderColor:Colors.bordergrey}}>
        <Text style={[globalStyles.mediumTxt,{textAlign:"center"}]}>{item.item.LeagueName}</Text>
        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
        <Text style={{fontSize:s(18),fontFamily:Config.regular,color:Colors.black}}>{item.item.Player1_Name}</Text>
        <Text style={[globalStyles.mediumTxt,{color:Colors.lightOrange,fontFamily:Config.bold}]}>VS</Text>
        <Text style={{fontSize:s(18),fontFamily:Config.regular,color:Colors.black}}>{item.item.Player2_Name}</Text>

        </View>
        <View style={{justifyContent:"center",alignItems:"center"}}>
          <Text>{item.item.GroupName}</Text>
          <Text>{item.item.Location}</Text>
          <Text>{item.item.StartDate}</Text>
        </View>
      </View>
    )
  }

  useEffect(() => {
    viewallEventsApiCall();
  }, []);

  console.log(JSON.stringify(alltournamnet,null,4))

  return (
    <View style={{ flex: 1 }}>
      <Header showImage={false} tittle={Config.viewallmatches} backImage={true} onPress={() => goBack()} />
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          onPress={() => setSelectedTab('upcoming')}
          style={[
            styles.button,
            selectedTab === 'upcoming' ? styles.selectedButton : styles.unselectedButton,
            { borderTopLeftRadius: 20,borderBottomLeftRadius:20 } // Add border radius to top left
          ]}
        >
          <Text style={selectedTab === 'upcoming' ? styles.selectedText : styles.unselectedText}>
            Upcoming Matches
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab('previous')}
          style={[
            styles.button,
            selectedTab === 'previous' ? styles.selectedButton : styles.unselectedButton,
            { borderTopRightRadius: 20,borderBottomRightRadius:20 } // Add border radius to top right
          ]}
        >
          <Text style={selectedTab === 'previous' ? styles.selectedText : styles.unselectedText}>
            Previous Matches
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data={alltournamnet}
          renderItem={renderMatches}
         
         />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  toggleContainer: {
    padding: 6,
    margin: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth:1,
    borderColor:Colors.bordergrey
  },
  selectedButton: {
    backgroundColor: Colors.lightOrange,
  },
  unselectedButton: {
    backgroundColor: 'white',
  },
  selectedText: {
    color: Colors.White,
    fontFamily: Config.regular,
    fontSize:s(12)
  },
  unselectedText: {
    color: Colors.black,
    fontFamily: Config.regular,
    fontSize:s(12)
  },
});

export default ViewAllMatches;
