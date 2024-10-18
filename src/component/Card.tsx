import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { scale as s } from 'react-native-size-matters';
import { Colors } from '../utils/Colors';
import { Config } from '../utils/Config';
import { globalStyles } from '../utils/GlobalCss';

interface cardsProps {
  carddata: any;
  onPress:(id:string) => void
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
         onPress={()=>onPress(item.tournamentId)}
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
      ListEmptyComponent={() => (
        <View style={{ padding: 20, alignItems: 'center' }}>
          <Text style={{ fontSize: 16, color: 'gray' }}>No data found</Text>
        </View>
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
