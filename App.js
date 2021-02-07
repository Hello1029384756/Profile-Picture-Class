import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from './screens/WelcomeScreen'
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import { DrawNavigator } from './components/DrawNavigator';

export default class App extends React.Component {
  render() {
  return (
    <AppContainer />
  );
}
}

const SwitchNavigator = createSwitchNavigator({
  WelcomeScreen: WelcomeScreen,
  DrawNavigator: DrawNavigator
})

const AppContainer = createAppContainer(SwitchNavigator)



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
