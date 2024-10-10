import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {View} from 'react-native';
import {Colors} from '../utils/Colors';
import {globalStyles} from '../utils/GlobalCss';
import {Text} from 'react-native-paper';
import {Config} from '../utils/Config';
import {s, vs} from 'react-native-size-matters';
import {noImage} from '../utils/assets';

interface MatcherProps {
  tittle: string;
  onPress: () => void;
  nodatafound: string;
}

interface ViewAllListProps {
  data: any;
}

const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={Colors.Orange} size={'large'} />
    </View>
  );
};

export default Loader;

export const Matcher = (MatcherProps: any) => {
  return (
    <>
      <View style={globalStyles.matchesView}>
        <Text style={globalStyles.matchesTxt}>{MatcherProps.tittle}</Text>
        <TouchableOpacity onPress={MatcherProps.onPress}>
          <Text style={globalStyles.trackViewallbtntxt}>{Config.viewall}</Text>
        </TouchableOpacity>
      </View>
      {/* <Text style={globalStyles.nodatatracktxt}>
        {MatcherProps.nodatafound}
      </Text> */}
      {/* <View style={globalStyles.borderBottomtrack} /> */}
    </>
  );
};

export const ViewAllList = (ViewAllListProps: any) => {
  return (
    <FlatList
      data={ViewAllListProps.data}
      horizontal={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={globalStyles.listContainer}
      renderItem={({item}) => (
        <View
          style={{
            borderBottomWidth: 1,
            padding: s(5),
            flexDirection: 'row',
            borderColor: '#BDCAD9',
          }}>
          <View>
            <Image
              source={
                item.Tournament_Image ? {uri: item.Tournament_Image} : noImage
              }
              style={{width: s(50), height: vs(50), resizeMode: 'cover'}}
            />
          </View>
          <View style={{marginLeft: s(12)}}>
            <Text style={globalStyles.cardtittletxt}>
              {item.Tournament_Name}
            </Text>

            <Text
              style={{
                fontSize: s(13),
                color: Colors.lightOrange,
              }}>
              {item.TrnmtPeriod}
            </Text>
            <Text
              style={{
                fontSize: s(12),
                color: Colors.lesslightgrey,
              }}>
              {item.TrnmtSpclType}
            </Text>
          </View>
        </View>
      )}
      ListEmptyComponent={() => (
        <View style={{ padding: 20, alignItems: 'center' }}>
          <Text style={{ fontSize: 16, color: 'gray' }}>No data found</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    zIndex: 1000,
  },
});
