import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MapScreen from '../screens/MapScreen';
import TileScreen from '../screens/TileScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Map" component={MapScreen}/>
            <Tab.Screen name="Tiles" component={TileScreen}/>
            <Tab.Screen name="Settings" component={SettingsScreen}/>
        </Tab.Navigator>
    );
}

export default Tabs;