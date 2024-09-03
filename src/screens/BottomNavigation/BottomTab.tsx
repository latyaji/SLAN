import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, StyleSheet} from 'react-native';
import {PlayIcon, SettingsIcon, TrackIcon} from '../../utils/assets';
import {Play, Track, Settings} from '../index';
import {Config} from '../../utils/Config';

const Tab = createBottomTabNavigator();

const iconMap = {
  Play: PlayIcon,
  Track: TrackIcon,
  Settings: SettingsIcon,
};

function BottomTab() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          const iconSource = iconMap[route.name];
          return (
            <Image
              source={iconSource}
              style={[
                styles.icon,
                {
                  width: size,
                  height: size,
                  tintColor: color,
                },
              ]}
            />
          );
        },
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarActiveTintColor: '#FE6725',
        tabBarInactiveTintColor: '#000',
        tabBarStyle: styles.tabBarStyle,
        headerShown: false,
        tabBarHideOnKeyboard: true
      })}>
      <Tab.Screen name="Play" component={Play} />
      <Tab.Screen name="Track" component={Track} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  icon: {
    resizeMode: 'contain',
  },
  tabBarLabel: {
    fontSize: 16,
    fontFamily: Config.bold,
  },
  tabBarStyle: {
    height: 70, // Set custom height for the tab bar
    paddingBottom: 10, // Optional: Add padding if needed
    paddingTop: 5, // Optional: Add padding if needed
    // Additional styling can be added here
  },
});

export default BottomTab;
