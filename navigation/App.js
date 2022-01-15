import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView, Text, View } from 'react-native';
import Navigation from './src/navigation/Navigation';

export default function App() {
  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );
}