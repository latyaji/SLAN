import React from 'react';
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {globalStyles} from '../utils/GlobalCss';
import {scale as s, verticalScale as vh} from 'react-native-size-matters';
import {Config} from '../utils/Config';
import {Colors} from '../utils/Colors';
import {noImage} from '../utils/assets';

interface cardsProps {
  carddata: any;
  onPress:() => void
}

const Cards = ({carddata,onPress}: cardsProps) => {
  return (
    <FlatList
      data={carddata}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={globalStyles.listContainer}
      renderItem={({item}) => (
        <TouchableOpacity 
         onPress={onPress}
         style={globalStyles.cardContainer}>
          <View style={globalStyles.imgCard}>
            <Image
              source={{uri: item.Tournament_Image}}
              style={globalStyles.cardImg}
            />
          </View>
          <View style={{paddingLeft: s(20),width:s(200)}}>
            <Text style={styles.tournamentTittle}>{item.Tournament_Name}</Text>
            <Text style={styles.tournamentDuration}>{item.TrnmtPeriod}</Text>
            <Text style={styles.tournamnetType}>
              {item.TrnmtSpclType}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default Cards;

const styles = StyleSheet.create({
  tournamentTittle: {
    fontSize: s(13),
    fontFamily: Config.medium,
    color: Colors.black,
    // lineHeight: vh(14),
  },
  tournamentDuration: {
    fontSize: s(12),
    fontFamily: Config.regular,
    color: Colors.Orange,
    // lineHeight: vh(14),
  },
  tournamnetType: {
    fontFamily: Config.regular,
    fontSize: s(11),
    color: '#595959',
   // paddingLeft: s(3),
    // lineHeight: vh(14)
  },
});
