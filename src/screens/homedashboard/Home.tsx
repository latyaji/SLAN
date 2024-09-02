import React from "react";
import { Text, Touchable, TouchableOpacity, View } from "react-native";
import Header from "../../component/Header";
import { Config } from "../../utils/Config";
import { globalStyles } from "../../utils/GlobalCss";
import { Colors } from "../../utils/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {clearLoginData} from "../../store/Slice/LoginSlice"
import {useDispatch} from 'react-redux';


const Home = () => {
    const dispatch = useDispatch();
 


  const logout = async () => {
    console.log("logggg")
    try {
      await AsyncStorage.removeItem('TOKEN');
      
    } catch (exception) {
      console.log('exception====>>>', exception);
    }
    dispatch(clearLoginData());
  };

    return (
        <View>
        <Header showImage={true} tittle={Config.otpVerfication} />
        <View style={globalStyles.screenSpacing}>
            
            <Text style={globalStyles.largeTxt}>Home Screen</Text>
            <TouchableOpacity 
             onPress={logout}
             style={{backgroundColor:Colors.Orange,justifyContent:"flex-end",padding:20,alignItems:"center",marginTop:120}}>
            <Text style={globalStyles.regulareTxt}>Logout</Text>
            </TouchableOpacity>
            
        </View>
      </View>
    )
}
export default Home