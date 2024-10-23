import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeNavigator from './HomeNavigator';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="HomeNavigator" 
        component={HomeNavigator} 
        options={{ headerShown: false }}  // Disable header for a cleaner look
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
