import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {Header} from '../../component';
import {Config} from '../../utils/Config';
import {globalStyles} from '../../utils/GlobalCss';
import {useNavigation} from '@react-navigation/native';
import {s} from 'react-native-size-matters';
import {Colors} from '../../utils/Colors';

const PaymentDetails = ({route}) => {
  const navigation = useNavigation();
  const [paymentData, setPaymentData] = useState([]);
  const [playersdata, setPlayersdata] = useState([]);

  console.log('selectedSports checkkkk----------', route.params.selectedSports);
  // console.log('totalAmount######----------', route.params.totalAmount);
  // console.log(
  //   'selectedPlayerNames######----------',
  //   route.params.selectedPlayerNames,
  // );

  useEffect(() => {
    setPaymentData(route.params.selectedSports);
    setPlayersdata(route.params.selectedPlayerNames);
  }, []);


  return (
    <View>
      <Header
        showImage={false}
        tittle={Config.paymentdetails}
        backImage={true}
        onPress={() => navigation.goBack()}
      />
      <View style={globalStyles.screenSpacing}>
        <Text style={globalStyles.selectEventTxt}>{Config.addmember}</Text>
        <Text style={globalStyles.cardTxt}>{Config.esporttournament}</Text>
        {paymentData.map(item => (
          <>
            <Text style={globalStyles.cardTxt}>
              {item.name} - INR {item.fee}
            </Text>
            <Text>
              {item.playername} checkkkingngn - {item.fee}
            </Text>
          </>
        ))}


{ playersdata.map((item)=>(
  <Text>{item}</Text>
))}
        {/* //Coupon code */}
        <Text style={[globalStyles.selectEventTxt, {marginTop: s(12)}]}>
          {Config.applycoupon}
        </Text>
        <View
          style={{
            borderWidth: 1,
            borderRadius: s(12),
            marginTop: s(12),
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 12,
            alignItems: 'center',
          }}>
          <TextInput placeholder="Coupon123" style={{width: '60%'}} />
          <TouchableOpacity
            style={{
              backgroundColor: Colors.Orange,
              paddingHorizontal: s(30),
              paddingVertical: s(5),
              borderRadius: s(7),
            }}>
            <Text style={{color: Colors.White}}>{Config.apply}</Text>
          </TouchableOpacity>
        </View>
        <Text style={[globalStyles.smallLightOrangetxt]}>
          10 % off Coupon code Applied
        </Text>
      </View>
    
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          bottom: -250,
          paddingRight: s(14),
          marginHorizontal: 12,
          paddingHorizontal: 12,
        }}>
        <Text
          style={{
            fontFamily: Config.bold,
            fontSize: s(14),
            color: Colors.black,
          }}>
          Amount{' '}
        </Text>
        <Text
          style={{
            fontFamily: Config.regular,
            fontSize: s(15),
            color: Colors.black,
          }}>
          INR {route.params.totalAmount}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          bottom: -250,
          paddingRight: s(14),
          marginHorizontal: 12,
          paddingHorizontal: 12,
        }}>
        <Text
          style={{
            fontFamily: Config.bold,
            fontSize: s(14),
            color: Colors.black,
          }}>
          Discount{' '}
        </Text>
        <Text
          style={{
            fontFamily: Config.regular,
            fontSize: s(15),
            color: Colors.black,
          }}>
          0
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          bottom: -250,
          paddingRight: s(14),
          marginHorizontal: 12,
          paddingHorizontal: 12,
        }}>
        <Text
          style={{
            fontFamily: Config.bold,
            fontSize: s(14),
            color: Colors.black,
          }}>
          Total Amount{' '}
        </Text>
        <Text
          style={{
            fontFamily: Config.regular,
            fontSize: s(15),
            color: Colors.black,
          }}>
          INR {route.params.totalAmount}
        </Text>
      </View>
     
    </View>
  );
};
export default PaymentDetails;
