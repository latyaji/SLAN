import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import Button from '../../component/Button';
import { slider1, slider2, slider3 } from '../../utils/assets';
import { Colors } from '../../utils/Colors';
import { Config } from '../../utils/Config';
import { globalStyles } from '../../utils/GlobalCss';
import {
  scale as s,
  verticalScale as vh,
  moderateScale as ms,
} from 'react-native-size-matters';


const images = [slider1, slider2, slider3];
const {width} = Dimensions.get('window'); 

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
              <Image source={item} />
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
          style={[globalStyles.centerTxt, {marginTop: vh(5)}]}>
          <Text style={globalStyles.regulareTxt}>
            {Config.AlreadyUser}{' '}
            <Text
              style={globalStyles.boldblueTxt}
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
    width: s(8),
    height: vh(8),
    marginHorizontal: s(3),
  },
  topConatiner: {
    flex: 5,
  },
  bottomContainer: {
    flex: 2,
  },
  PlayTxt: {
    fontWeight: 'bold',
    fontSize: s(16),
    color: Colors.black,
  },
  LoginTxt: {
    color: Colors.blue,
    fontSize: s(16),
    fontFamily: 'Ubuntu-Bold',
  },
  imageContainer: {
    marginTop: vh(20),
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
