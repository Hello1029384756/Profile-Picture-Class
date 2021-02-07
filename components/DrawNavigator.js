import React from 'react';
import { View, Text, TextInput, Modal, KeyboardAvoidingView, StyleSheet, TouchableOpacity, Alert, ScrollView} from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer'
import { TabNavigator } from './TabNavigator'
import SettingScreen from '../screens/SettingScreen'
import SideBar from './SideBar'
import MyDonations from '../screens/MyDonationsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';

export const DrawNavigator = createDrawerNavigator({
    Home: {screen: TabNavigator},
    Donations: {screen: MyDonations},
    Setting: {screen: SettingScreen},
    Notifications: {screen: NotificationsScreen}},
    {contentComponent: SideBar},
    {initialRouteName: 'Home'
})