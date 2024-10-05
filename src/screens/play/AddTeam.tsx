import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { s, vs } from 'react-native-size-matters';
import { useDispatch } from 'react-redux';
import { Button, Header, TextField } from '../../component';
import { setIsloading } from '../../store/Slice/LoginSlice';
import { Config } from '../../utils/Config';
import { globalStyles } from '../../utils/GlobalCss';
import apiInstance from '../../utils/apiInstance';
import { UnCheckTermsIcon, userIcon } from '../../utils/assets';

const AddTeam = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [sportsSelect, setSportSelect] = useState([]);
  

  const sportDataGet = () => {
    dispatch(setIsloading(true));
    apiInstance.post('Public/viewData/1/Sport_MultiSelect').then(response => {
      dispatch(setIsloading(false));
      if (response.data) {
        setSportSelect(response.data.data.root.rowData_list);
      }
    });
  };

  const renderSportsList = ({item}: any) => {
    return (
      <View style={styles.item}>
        <TouchableOpacity>
        <Image
          source={UnCheckTermsIcon}
          style={{marginLeft: 12, marginBottom: 12}}
        />
        </TouchableOpacity>
        <Text style={globalStyles.twelFont}>{item.Sport_Name}</Text>
      </View>
    );
  };

  useEffect(() => {
    sportDataGet();
  }, []);

  return (
    <View>
      <Header
        showImage={false}
        tittle={Config.addteam}
        backImage={true}
        onPress={() => navigation.goBack()}
      />
      <ScrollView style={[globalStyles.screenSpacing,{marginBottom:150}]}>
        <TextField
          placeholder={Config.addteamname}
          source={userIcon}
          // value={name}
          // onChangeTxt={text => dispatch(setName(text))}
        />
      
       
        <View style={styles.container}>
          <FlatList
            data={sportsSelect}
            renderItem={renderSportsList}
            numColumns={3}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false} // Optional: hide scroll indicator
            scrollEnabled={true}
            contentContainerStyle={globalStyles.listContainer}
          />
        </View>
        <Button
          tittle={Config.save}
          // onPress={sportDataGet}
          //disabled={!isFormValid()}
        />
      </ScrollView>
    </View>
  );
};

export default AddTeam;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    //padding: 10,
    //margin: 10,
  },
  item: {
    flex: 1,
    padding: s(9),
    marginTop: vs(1),
    borderRadius: 5,
    justifyContent: 'center',
  },
});

// export default AddPartner;
