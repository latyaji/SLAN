import {
    Alert,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { Config } from '../utils/Config';
import { globalStyles } from '../utils/GlobalCss';

import {
    verticalScale as vh
} from 'react-native-size-matters';

interface cardsTittleProps {
    title: any;
    onPress:() => void;
}

const CardTittle = ({title,onPress}: cardsTittleProps) => {
  return (
    <View
      style={globalStyles.cardTittleConatiner}>
      <Text style={globalStyles.mediumTxt}>{title}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={globalStyles.viewBtn}>{Config.viewall}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CardTittle;
