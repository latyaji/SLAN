import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import { goback, smalllogo } from '../utils/assets';
import { Colors } from '../utils/Colors';
import { Config } from '../utils/Config';
import {
  scale as s,
  verticalScale as vh,
  moderateScale as ms,
} from 'react-native-size-matters';

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
    height: vh(94),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  headerImg: {
    resizeMode: 'cover',
    marginHorizontal: vh(2),
    marginTop:vh(50)
  },
  backImg:{
    resizeMode: 'cover',
    marginHorizontal: vh(10),
    marginTop:vh(50),
    
  },
  headerTxt:{
    fontFamily: Config.bold, 
    color: Colors.White, 
    fontSize: s(15),
    marginTop:vh(50)
  }
});
