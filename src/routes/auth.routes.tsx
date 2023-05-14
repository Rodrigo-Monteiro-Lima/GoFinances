import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SignIn from '../screens/SignIn'
import { useTheme } from 'styled-components';
import { Platform } from 'react-native';

export default function AuthRoutes() {
  const { Navigator, Screen } = createStackNavigator();
  const theme = useTheme();
  return (
    <Navigator
      screenOptions={{
      headerShown: false,
      }}
    >
      <Screen name="SignIn" component={SignIn}/>
    </Navigator>
  )
}