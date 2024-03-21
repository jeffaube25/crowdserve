import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import MapScreen from '../screens/MapScreen';
import TileScreen from '../screens/TileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import React from 'react';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
            }}>
            <Tab.Screen name="Map" component={MapScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems:'center', justifyContent:'center',top:10}}>
                        <Image 
                            source = {require('../assets/images/icons/location.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#e32f45' : '#748c94'
                            }}
                        />
                        <Text
                        style={{
                            color: focused ? '#e32f45' : '#748c94'
                        }}>Map</Text>
                    </View>
                )
            }}/>
            <Tab.Screen name="Tiles" component={TileScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems:'center', justifyContent:'center',top:10}}>
                        <Image 
                            source = {require('../assets/images/icons/tiles.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#e32f45' : '#748c94'
                            }}
                        />
                        <Text
                        style={{
                            color: focused ? '#e32f45' : '#748c94'
                        }}>List</Text>
                    </View>
                )
            }}/>
            <Tab.Screen name="Settings" component={SettingsScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems:'center', justifyContent:'center',top:10}}>
                        <Image 
                            source = {require('../assets/images/icons/settings.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#e32f45' : '#748c94'
                            }}
                        />
                        <Text
                        style={{
                            color: focused ? '#e32f45' : '#748c94'
                        }}>Settings</Text>
                    </View>
                )
            }}/>
        </Tab.Navigator>
    );
}

export default Tabs;