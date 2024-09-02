import { StyleSheet } from "react-native";
import { Config } from "./Config";
import { heightPercentageToDP as hp , widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Colors } from "./Colors";
import { scale as s, verticalScale as vs, moderateScale as ms } from 'react-native-size-matters';


export const globalStyles = StyleSheet.create({
    largeTxt : {
        fontFamily:Config.medium,
        fontSize: hp(3.2),
        color : "black"
    },
    regulareTxt : {
        fontFamily:Config.regular,
        fontSize: hp(2.2),
        color : "#000"
    },
    smallTxt : {
        fontFamily:Config.regular,
        fontSize: hp(1.6),
        color : "##595959",
        marginTop:wp(5)
    },
    screenSpacing:{
        margin:(12)
    },
    textIcon: {
        marginRight: 12,
        width: hp(4),
        height: wp(5),
        resizeMode: 'contain',
      },
      boldblueTxt:{
        fontFamily:Config.bold,
        fontSize: hp(2.2),
        color : "#1019F0"
      },
      centerTxt:{
        alignItems:"center"
      },
      errormsg:{
        fontFamily:Config.regular,
        fontSize: hp(1.8),
         alignSelf: "flex-end", 
         color: Colors.red 
      },
      alertBorder:{
        borderWidth:0.30,
        width:"100%",
        marginTop:6,
        marginBottom:6
      },
      mediumTxt:{
        fontSize:s(19),
        fontFamily:Config.medium,
        color:Colors.black
      }

})