import {StyleSheet} from 'react-native';
import {Config} from './Config';

import {Colors} from './Colors';
import {
  scale as s,
  verticalScale as vh,
  moderateScale as ms,
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
});
