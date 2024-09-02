import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { goback, smalllogo } from '../utils/assets';
import { Colors } from '../utils/Colors';
import { Config } from '../utils/Config';

interface HeaderProps {
  showImage?: boolean; 
  tittle : any;
  onPress: () => void;
  backImage?: boolean

}

const Header = ({ showImage = true,tittle,onPress,backImage = true}:HeaderProps) => {
  return (
    <View style={styles.container}>
      {backImage ?  <TouchableOpacity style={{flex: 1}} onPress={onPress}>
        <Image source={goback} style={styles.backImg} />
      </TouchableOpacity> : <TouchableOpacity style={{flex: 1}} onPress={onPress}>
        <Image source={goback} style={[styles.backImg,{tintColor:"transparent"}]} />
      </TouchableOpacity> }
      
      <View style={{flex: 2}}>
       { showImage && <Image
          source={smalllogo}
          style={styles.headerImg}
        />}
       { !showImage && <Text
          style={styles.headerTxt}>
          {tittle}
        </Text>}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Orange,
    height: hp(14),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  headerImg: {
    resizeMode: 'cover',
    marginHorizontal: wp(3),
    // height:wp(7),
    // width:hp(16),
    marginTop:wp(10)
  },
  backImg:{
    resizeMode: 'cover',
    marginHorizontal: wp(4),
    marginTop:wp(10),
    
  },
  headerTxt:{
    fontFamily: Config.bold, 
    color: Colors.White, 
    fontSize: 18,
    marginTop:wp(10)
  }
});
