import React from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Config} from '../../utils/Config';
import {Header} from '../../component';
import {useNavigation} from '@react-navigation/native';
import {s} from 'react-native-size-matters';
import {Colors} from '../../utils/Colors';
import {add} from '../../utils/assets';
import {globalStyles} from '../../utils/GlobalCss';

const SelectParticipants = () => {
  const navigation = useNavigation();
  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <Header
        showImage={false}
        tittle={Config.selectparticipants}
        backImage={true}
        onPress={() => navigation.goBack()}
      />
      <View
        style={{
          backgroundColor: '#EFEFEF',
          marginTop: 12,
          marginLeft: 12,
          height: 200,
          borderTopLeftRadius: 14,
          borderBottomLeftRadius: 14,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 8,
            borderBottomWidth: 1,
            margin: 11,
            borderColor: Colors.bordergrey,
          }}>
          <Text style={styles.cardTxt}>Men-Singles</Text>
          <Text style={styles.cardTxt}>INR 700</Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            marginLeft: 20,
            borderRightWidth: 1,
            width: '20%',
            borderColor: Colors.bordergrey,
          }}>
          <TouchableOpacity 
            onPress={()=> navigation.navigate("AddParticipant")}
            style={{paddingHorizontal: 12, marginTop: 20}}>
            <Image source={add} style={globalStyles.textIcon} />
          </TouchableOpacity>
          <Text style={[globalStyles.radiotxt, {marginTop: 20}]}>Add</Text>
        </View>
      </View>
    </View>
  );
};

export default SelectParticipants;

const styles = StyleSheet.create({
  cardTxt: {
    fontFamily: Config.medium,
    fontSize: s(13),
    fontWeight: 'bold',
    color: Colors.black,
  },
});
