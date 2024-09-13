import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {globalStyles} from '../utils/GlobalCss';
import {vs} from 'react-native-size-matters';
import {CheckTermsIcon, dropdown, UnCheckTermsIcon} from '../utils/assets';
import {Colors} from '../utils/Colors';

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
  const [checkedItems, setCheckedItems] = useState(new Set())

  const handleCheckboxToggle = (index: number) => {
    setCheckedItems(prevState => {
      const newCheckedItems = new Set(prevState);
      if (newCheckedItems.has(index)) {
        newCheckedItems.delete(index);
      } else {
        newCheckedItems.add(index);
      }
      return newCheckedItems;
    });
  };

  return (
    <View>
      <View style={styles.eventsBorderBox}>
        <Text
          style={[globalStyles.selectEventTxt, {color: Colors.lightOrange}]}>
          {tittle}
        </Text>
        <TouchableOpacity onPress={() => toggleVisibility()}>
          <Image
            source={dropdown}
            style={{transform: [{rotate: !isVisibility ? '270deg' : '360deg'}]}}
          />
        </TouchableOpacity>
      </View>

      {isVisibility && (
        <View>
          {data.map((item, index) => (
            <View key={index} style={styles.eventItem}>
              <View style={{flexDirection:"row"}}>
              <TouchableOpacity onPress={() => handleCheckboxToggle(index)}>
                <Image
                  source={
                    checkedItems.has(index) ? CheckTermsIcon : UnCheckTermsIcon
                  }
                  style={globalStyles.textIcon}
                />
              </TouchableOpacity>
              <Text style={globalStyles.radiotxt}>{item?.SportName}</Text>
              </View>
              <Text style={globalStyles.radiotxt}>
                INR {item?.TournamentFee}
              </Text>
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
