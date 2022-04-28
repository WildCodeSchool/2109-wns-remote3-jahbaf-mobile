import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Settings } from "../screens";

const Stack = createNativeStackNavigator();

export const SettingsScreens = ({ onLogout }: any) => {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen
        name="Settings"
        options={{ title: "Settings" }}
      >
        {(props: any) => <Settings {...props} onLogout={onLogout} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
