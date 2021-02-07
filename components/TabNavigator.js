import React from 'react';
import { View, Text, TextInput, Modal, KeyboardAvoidingView, StyleSheet, TouchableOpacity, Alert, ScrollView, Image} from 'react-native';
import DonateScreen from '../screens/DonateScreen'
import RequestScreen from '../screens/RequestScreen'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { StackNavigator } from './StackNavigator'

export const TabNavigator = createBottomTabNavigator({
    DonateScreen: {screen: StackNavigator,
    navigationOptions: {
        tabBarIcon: <Image source={require('../assets/request-list.png')}
        style = {{width: 30, height: 30}}/> 
    }},
    RequestScreen: {screen: RequestScreen,
    navigationOptions: {
        tabBarIcon: <Image source={require('../assets/request-book.png')}
        style={{width: 30, height: 30}}/>
    }}
})