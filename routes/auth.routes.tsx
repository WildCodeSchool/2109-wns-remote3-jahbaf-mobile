import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Authentication } from '../screens';

const Stack = createNativeStackNavigator();

export const AuthStack = ({ onLogIn }: any) => {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen
        name="Authentication"
        options={{ title: "Authentication" }}
      >
        {props => <Authentication {...props} onLogIn={onLogIn} />}
      </Stack.Screen>
    </Stack.Navigator>
  )
}
