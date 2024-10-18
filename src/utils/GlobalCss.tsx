import {StyleSheet} from 'react-native';
import {Config} from './Config';

import {Colors} from './Colors';
import {
  scale as s,
  verticalScale as vh,
  moderateScale as ms,
  vs,
} from 'react-native-size-matters';

export const globalStyles = StyleSheet.create({
  largeTxt: {
    fontFamily: Config.medium,
    fontSize: s(22),
    color: 'black',
  },
  regulareTxt: {
    fontFamily: Config.regular,
    fontSize: s(16),
    color: '#000',
  },
  alreadyTxt: {
    fontFamily: Config.regular,
    fontSize: s(14),
    color: '#000',
  },
  smallbluetxt:{
    fontFamily: Config.medium,
    fontSize: s(13),
    color: Colors.blue,
  },
  smallTxt: {
    fontFamily: Config.regular,
    fontSize: s(12),
    color: '##595959',
    marginTop: vh(5),
  },
  screenSpacing: {
    margin: s(12),
  },
  textIcon: {
    marginRight: s(12),
    width: s(17),
    height: vh(17),
    resizeMode: 'contain',
  },
  boldblueTxt: {
    fontFamily: Config.medium,
    fontSize: s(14),
    color: Colors.blue,
  },
  centerTxt: {
    alignItems: 'center',
    marginTop: vh(8)
  },
  errormsg: {
    fontFamily: Config.regular,
    fontSize: s(12),
    alignSelf: 'flex-end',
    color: Colors.red,
    marginTop:vh(5)
    
  },
  
  alertBorder: {
    borderWidth: 0.3,
    width: '100%',
    marginTop: 6,
    marginBottom: 6,
  },
  mediumTxt: {
    fontSize: s(19),
    fontFamily: Config.medium,
    color: Colors.black,
  },
  cardContainer: {
    height: vh(200),
    width: s(200),
    borderWidth: 1,
    marginTop: vh(12),
    borderRadius: s(12),
    borderColor: Colors.grey,
    shadowColor: Colors.grey,
    shadowOpacity: 0.2,
    shadowRadius: 10,
    backgroundColor: '#fff',
    marginRight: s(10),
  },
  imgCard: {
    height: vh(100),
    width: s(160),
    marginTop: vh(12),
    borderRadius: s(12),
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    alignSelf: 'center',
  },

  listContainer: {
    paddingHorizontal: 5,
  },
  viewBtn: {
    color: Colors.lightOrange,
    fontSize: s(15),
    fontFamily: Config.medium,
  },
  cardImg: {
    height: vh(90),
    width: s(160),
    borderRadius: 12,
  },
  cardTittleConatiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: vh(14),
  },
  whiteTxt: {
    color: Colors.White,
    fontSize: 18,
    textAlign: 'center',
    marginLeft: s(0.5),
    fontFamily: Config.bold,
  },
  smallButton: {
    backgroundColor: Colors.lightOrange,
    paddingHorizontal: vh(60),
    paddingVertical: vh(9),
    borderRadius: s(25),
    marginTop: vh(12),
  },
  noConectiontxt: {
    fontFamily: Config.bold,
    fontSize: s(18),
    color: Colors.black,
    lineHeight: vh(30),
  },
  loginSuccessMsg: {
    fontFamily: Config.medium,
    fontSize: s(13),
    alignSelf: 'center',
    color: Colors.success,
    marginTop: vh(3),
  },
  loginFailedMsg: {
    fontFamily: Config.medium,
    fontSize: s(13),
    alignSelf: 'center',
    color: Colors.red,
    marginTop: vh(3),
  },
  cardtittletxt:{
    fontFamily: Config.bold,
      fontSize: s(16),
      color: Colors.black,
      width: s(280),
  },
  nodatatxt:{
    fontFamily: Config.regular,
      fontSize: s(12),
     // color: Colors.black,
      width: s(280),
  },
  btncontainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    // borderColor: Colors.Orange,
    borderColor: Colors.grey,
    borderRadius: 20,
  },
  btnboxbg: {
    width: 10,
    height: 10,
    backgroundColor: Colors.Orange,
    borderRadius: 20,
    margin: 3,
  },
  radionbtnConatiner:{
    flexDirection:"row",marginTop:vh(20),marginBottom:vh(20)
  },
  radiotxt: {
    marginLeft: 10,
    fontFamily:Config.regular,
    fontSize:s(14),
    color:Colors.black
  },
  selectEventTxt: {
    fontFamily: Config.bold,
    fontSize: s(14),
    color: Colors.black,
    width: s(280),
  },
  radionmainconatiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  smallLightOrangetxt:{color: Colors.lightOrange,fontSize:s(11.5),fontFamily:Config.regular},
  eventsBorderBox: {
    flexDirection: 'row',
    marginTop: vs(12),
    borderWidth: 1,
    alignContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderColor: Colors.bordergrey
  },
  eventsListseparator:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: vs(12),
    borderBottomWidth: 1,
    padding: s(3),
    borderColor: Colors.bordergrey,
  },
  calenderConatiner:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  html: {
    fontSize: s(16),
    color: '#333',
    a: {
      fontWeight: '300',
      color: '#FF3366', 
    },
  },
  forgottxt: {
    fontFamily: Config.medium,
    fontSize: s(12),
    alignSelf: 'flex-end',
    color: Colors.lightOrange,
  },
  rulesConatiner: {
    flexDirection: 'row',
    marginTop: vs(12),
    borderBottomWidth: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: Colors.bordergrey,
    justifyContent: 'space-between',
  },
  twelFont:{
    fontSize:s(13),
    fontFamily: Config.regular,
    color:Colors.black
  },
  borderBottomtrack: {borderBottomWidth:1,marginTop:12,borderColor:Colors.bordergrey},
  trackViewallbtntxt: {fontSize:s(13),fontFamily:Config.regular,color:Colors.Orange},
  nodatatracktxt: {fontSize:s(13),fontFamily:Config.regular},
  matchesView:{flexDirection:"row",justifyContent:"space-between",marginTop:vs(12),marginBottom:vs(17)},
  matchesTxt:{fontSize:s(17),fontFamily:Config.bold,color:Colors.black,fontWeight:"bold"},
  trackgroupname:{fontSize:s(11),fontFamily:Config.regular,color:Colors.lesslightgrey},
  tracklocation:{fontSize:s(15),fontFamily:Config.bold,color:Colors.lesslightgrey,marginVertical:6},
  trackdate:{fontSize:s(11),fontFamily:Config.regular,color:Colors.lightOrange},
  trackcardview:{justifyContent:"center",padding:15,borderBottomWidth:1,borderColor:Colors.bordergrey,backgroundColor:"#fff",marginHorizontal:12,marginVertical:6,},
  trackleaguename:{textAlign:"center",fontSize:s(18),fontFamily:Config.medium},
  trackplayernameview:{flexDirection:"row",justifyContent:"space-between",marginVertical:s(15),flexWrap:"wrap"},
  trackplayername:{fontSize:s(20),fontFamily:Config.regular,color:Colors.black},
  vstxt: {color:Colors.lightOrange,fontFamily:Config.bold,fontSize:s(20)},
  playcarsimg:{width: s(325), height: vs(200), borderRadius: s(10)},
  playcarddate:{flexDirection: 'row', marginTop: vs(12), marginLeft: s(2)},
  playcardlocation:{flexDirection: 'row', marginTop: vs(12)},
  locationimg:{width: s(20), height: vs(15), resizeMode: 'contain'},
  topborder:{
    borderTopWidth: 1,
    borderColor: Colors.bordergrey,
    marginTop: vs(12),
  },
  mediumorangetxt: {fontFamily:Config.bold,color:Colors.lightOrange,fontSize:s(15)},
  mediumBlacktxt: {fontFamily:Config.bold,fontSize:s(14),color:Colors.black},
  seventypercentcontainer:{flexDirection:"row",justifyContent:"space-between",width:"70%",marginTop:12},
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
    borderWidth: 1,
    borderColor: Colors.bordergrey,
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
    fontSize: s(12),
  },
  unselectedText: {
    color: Colors.black,
    fontFamily: Config.regular,
    fontSize: s(12),
  },
  eventsPlayerName:{fontSize:s(15),fontFamily: Config.medium},
  matchesContainer: {flexDirection:"row",justifyContent:"space-between",width:"50%",flexWrap:"wrap"}

});
