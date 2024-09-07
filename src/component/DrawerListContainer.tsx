import React from 'react';
import {StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import {Colors} from '../utils/Colors';
import {Loader, profileuser} from '../utils/assets';
import { globalStyles } from '../utils/GlobalCss';
import {
  scale as s,
  verticalScale as vh,
  moderateScale as ms,
  vs,
} from 'react-native-size-matters';

interface drawerProps{
    tittle : string,
    Icon : any,
    onPress?:()=>void
}


const DrawerListContainer = ({tittle,Icon,onPress}:drawerProps) => {
  return (
    <TouchableOpacity style={styles.drawerListConatiner} onPress={onPress}>
        <Image source={Icon} style={styles.drawerListicon}/>
        <Text style={[globalStyles.regulareTxt,{color:Colors.lesslightgrey}]}>{tittle}</Text>
      </TouchableOpacity>
  );
};

export default DrawerListContainer;


const styles = StyleSheet.create({
    drawerListConatiner:{flexDirection:"row",margin:12,borderBottomWidth:1,paddingBottom:12,borderBottomColor:Colors.lightgrey},
    drawerListicon:{width:s(20),height:vs(20),resizeMode:"contain",marginRight:12}
  })

