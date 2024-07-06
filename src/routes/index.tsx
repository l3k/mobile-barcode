import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Splash } from '@src/screens/Splash';
import { Home } from '@src/screens/Home';
import { Scanner } from '@src/screens/Scanner';
import { AddProduct } from '@src/screens/AddProduct';

export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  Scanner: undefined;
  AddProduct: undefined;
};

export type NavProps = NativeStackNavigationProp<RootStackParamList>;

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
      <Screen name="Splash" component={Splash} />
      <Screen name="Home" component={Home} />
      <Screen name="Scanner" component={Scanner} />
      <Screen name="AddProduct" component={AddProduct} />
    </Navigator>
  )
}

export function Routes() {
  return (
    <NavigationContainer>
      <AppRoutes />
    </NavigationContainer>
  );
}
