import {View, Text} from 'react-native';
import React from 'react';
import AppNavigation from './src/navigation/appNavigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <AppNavigation />
    </GestureHandlerRootView>
  );
}
