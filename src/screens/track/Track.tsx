import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Header from '../../component/Header';
import {Config} from '../../utils/Config';
import {globalStyles} from '../../utils/GlobalCss';
import { Matcher } from '../../component/Loader';
import { useNavigation } from '@react-navigation/native';


const Track = () => {
  const navigation = useNavigation();
 const matchesViewall = () => {
  navigation.navigate("ViewAllMatches")
  // alert("matchessViewall checkkkkkk")
 } 
 const eventsViewall = () => {
  navigation.navigate("AllEvents")
  // alert("eventsViewall checkkkkkk")
 } 

  return (
    <View>
      <Header showImage={false} tittle={Config.mymatches} backImage={false} />
      <View style={globalStyles.screenSpacing}>
        <Matcher
          tittle = {Config.mymatches}
          onPress = {matchesViewall}
          nodatafound={Config.nodataavailable}
          />
           <Matcher
          tittle = {Config.myevents}
          onPress = {eventsViewall}
          nodatafound={Config.nodataavailable}
          />
   
      </View>
    </View>
  );
};
export default Track;
