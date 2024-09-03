import {StyleSheet} from 'react-native';
import {Config} from './Config';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Colors} from './Colors';
import {
  scale as s,
  verticalScale as vs,
  moderateScale as ms,
} from 'react-native-size-matters';

export const globalStyles = StyleSheet.create({
  largeTxt: {
    fontFamily: Config.medium,
    fontSize: hp(3.2),
    color: 'black',
  },
  regulareTxt: {
    fontFamily: Config.regular,
    fontSize: hp(2.2),
    color: '#000',
  },
  smallTxt: {
    fontFamily: Config.regular,
    fontSize: hp(1.6),
    color: '##595959',
    marginTop: wp(5),
  },
  screenSpacing: {
    margin: s(12),
  },
  textIcon: {
    marginRight: 12,
    width: hp(4),
    height: wp(5),
    resizeMode: 'contain',
  },
  boldblueTxt: {
    fontFamily: Config.bold,
    fontSize: hp(2.2),
    color: '#1019F0',
  },
  centerTxt: {
    alignItems: 'center',
  },
  errormsg: {
    fontFamily: Config.regular,
    fontSize: hp(1.8),
    alignSelf: 'flex-end',
    color: Colors.red,
    
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
    height: vs(200),
    width: s(200),
    borderWidth: 1,
    marginTop: vs(12),
    borderRadius: s(12),
    borderColor: Colors.grey,
    shadowColor: Colors.grey,
    shadowOpacity: 0.2,
    shadowRadius: 10,
    backgroundColor: '#fff',
    marginRight: s(10),
  },
  imgCard: {
    height: vs(100),
    width: s(160),
    marginTop: vs(12),
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
    height: vs(90),
    width: s(160),
    borderRadius: 12,
  },
  cardTittleConatiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: vs(14),
  },
  whiteTxt: {
    color: Colors.White,
    fontSize: 18,
    textAlign: 'center',
    marginLeft: hp(0.5),
    fontFamily: Config.bold,
  },
  smallButton: {
    backgroundColor: Colors.lightOrange,
    paddingHorizontal: vs(60),
    paddingVertical: vs(9),
    borderRadius: s(25),
    marginTop: vs(12),
  },
  noConectiontxt: {
    fontFamily: Config.bold,
    fontSize: s(18),
    color: Colors.black,
    lineHeight: vs(30),
  },
  loginSuccessMsg: {
    fontFamily: Config.medium,
    fontSize: hp(2.2),
    alignSelf: 'center',
    color: Colors.success,
    marginTop: wp(3),
  },
  loginFailedMsg: {
    fontFamily: Config.medium,
    fontSize: hp(2.2),
    alignSelf: 'center',
    color: Colors.red,
    marginTop: wp(3),
  },
});
