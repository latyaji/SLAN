import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { s } from 'react-native-size-matters';
import { Header } from '../../component';
import { Colors } from '../../utils/Colors';
import { Config } from '../../utils/Config';

const ViewAllMatches = ({navigation: {goBack}}:any) => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState('upcoming'); // State to track which button is pressed

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
