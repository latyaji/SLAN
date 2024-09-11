import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {globalStyles} from '../utils/GlobalCss';
import {vs} from 'react-native-size-matters';
import {dropdown} from '../utils/assets';
import { Colors } from '../utils/Colors';

interface dropdown {
  tittle: string;
  isVisibility: boolean;
  toggleVisibility: () => void;

  data: {SportName: string; TournamentFee: string}[];
}

const DropdownEvent = ({
  tittle,
  isVisibility,
  toggleVisibility,
  data,
}: dropdown) => {
  return (
    <View>
      <View style={styles.eventsBorderBox}>
        <Text
          style={[globalStyles.selectEventTxt, {color: Colors.lightOrange}]}>
          {tittle}
        </Text>
        <TouchableOpacity onPress={() => toggleVisibility()}>
          <Image source={dropdown} style={{transform: [{rotate: !isVisibility ? '270deg' : '360deg'}]}} />
        </TouchableOpacity>
      </View>

      {isVisibility && (
        <View>
          {data.map((item, index) => (
            <View key={index} style={styles.eventItem}>
              <Text>{item?.SportName}</Text>
              <Text>INR {item?.TournamentFee}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default DropdownEvent;

const styles = StyleSheet.create({
  eventsBorderBox: {
    flexDirection: 'row',
    marginTop: vs(12),
    borderWidth: 1,
    alignContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderColor: Colors.bordergrey,
  },
  eventItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: Colors.bordergrey,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
