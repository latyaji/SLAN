import React from 'react';
import {Image, StyleSheet, Text, View, Dimensions, Alert} from 'react-native';
import {slider1, slider2, slider3} from '../../utils/assets';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {Colors} from '../../utils/Colors';
import Button from '../../component/Button';
import {Config} from '../../utils/Config';
import {useNavigation} from '@react-navigation/native';
import {globalStyles} from '../../utils/GlobalCss';

const images = [slider1, slider2, slider3];
const {width} = Dimensions.get('window'); // Get the width of the device's screen

const Onboarding = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.White,
        borderTopColor: Colors.black,
        borderWidth: 1,
      }}>
      <View
        style={{
          flex: 10,
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <SwiperFlatList
          autoplay
          autoplayDelay={2}
          autoplayLoop
          index={2}
          showPagination
          data={images}
          paginationActiveColor="#FE6725"
          paginationDefaultColor="#D9D9D9"
          paginationStyleItem={styles.paginationStyleItem}
          renderItem={({item}) => (
            <View style={styles.imageContainer}>
              <Image source={item} style={{}} />
              <Text style={styles.PlayTxt}>{Config.PlayTxt}</Text>
            </View>
          )}
        />
      </View>
      <View style={styles.border} />
      <View style={globalStyles.screenSpacing}>
        <Button
          tittle="Sign Up"
          onPress={() => navigation.navigate('Signup')}
        />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 12,
          }}>
          <Text style={globalStyles.centerTxt}>
            {Config.AlreadyUser}{' '}
            <Text
              style={styles.LoginTxt}
              onPress={() => navigation.navigate('Login')}>
              {Config.LoginTxt}
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  paginationStyleItem: {
    width: 8,
    height: 8,
    marginHorizontal: 3,
  },
  topConatiner: {
    flex: 5,
  },
  bottomContainer: {
    flex: 2,
  },
  PlayTxt: {
    fontWeight: 'bold',
    fontSize: 20,
    color: Colors.black,
  },
  LoginTxt: {
    color: Colors.blue,
    fontSize: 16,
    fontFamily: 'Ubuntu-Bold',
  },
  imageContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    width: width,
  },
  border: {
    borderWidth: 0.2,
    width: width / 1,
    backgroundColor: Colors.lightgrey,
  },
});
