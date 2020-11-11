// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from "./src/home";
import WeatherScreen from "./src/weather";

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Weather: WeatherScreen,
});

const RootNavigator = createAppContainer(HomeStack);

function App() {
  console.disableYellowBox = true;
  return (
    <RootNavigator />
  );
}

export default App;