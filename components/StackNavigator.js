import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import RequesterDetails from '../screens/RequesterDetails'
import DonateScreen from '../screens/DonateScreen'

export const StackNavigator = createStackNavigator({
    DonateList: {screen: DonateScreen,
    navigationOptions: {
        headerShown: false
    }},
    RequestList: {screen: RequesterDetails,
    navigationOptions: {
        headerShown: false
    }}},
    {initialRouteName: 'DonateList'
})