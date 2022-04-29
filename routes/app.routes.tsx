import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FontAwesome } from "@expo/vector-icons";
import { INTERACTION_COLOR, BACKGROUND_COLOR_DARK } from "../styles";
import { ProjectsScreens, AddProjectScreens } from "./project.screens";
import { SettingsScreens } from "./settings.screens";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const AppStack = ({ onLogout }: any) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Projects")
            return (
              <FontAwesome
                name="th-list"
                color={focused ? INTERACTION_COLOR : BACKGROUND_COLOR_DARK}
              />
            );
          else if (route.name === "AddProject")
            return (
              <FontAwesome
                name="plus"
                color={focused ? INTERACTION_COLOR : BACKGROUND_COLOR_DARK}
              />
            );
          else if (route.name === "Settings")
            return (
              <FontAwesome
                name="cog"
                color={focused ? INTERACTION_COLOR : BACKGROUND_COLOR_DARK}
              />
            );
        },
        tabBarActiveTintColor: "blue",
        tabBarLabel: () => null,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Projects" component={ProjectsScreens} />
      <Tab.Screen name="AddProject" component={AddProjectScreens} />
      <Tab.Screen name="Settings">
        {(props: any) => <SettingsScreens {...props} onLogout={onLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};
