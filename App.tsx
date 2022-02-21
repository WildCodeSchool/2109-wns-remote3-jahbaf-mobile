import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome5";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, SafeAreaView } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AddProject, Project, Projects } from "./screens";
import { ApolloProvider } from "@apollo/client";
import { client } from "./services";
import { BACKGROUND_COLOR_DARK, INTERACTION_COLOR } from "./styles/index";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ProjectNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen
        name="Projects"
        component={Projects}
        options={{ title: "Projects list" }}
      />
      <Stack.Screen
        name="Project"
        component={Project}
        options={{ title: "Project Details" }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <ApolloProvider client={client}>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                if (route.name === "Projects")
                  return (
                    <FontAwesome
                      name="th-list"
                      color={
                        focused ? INTERACTION_COLOR : BACKGROUND_COLOR_DARK
                      }
                    />
                  );
                else if (route.name === "AddProject")
                  return (
                    <FontAwesome
                      name="plus"
                      color={
                        focused ? INTERACTION_COLOR : BACKGROUND_COLOR_DARK
                      }
                    />
                  );
              },
              tabBarActiveTintColor: "blue",
              tabBarLabel: () => null,
              headerShown: false,
            })}
          >
            <Tab.Screen name="Projects" component={ProjectNavigator} />
            <Tab.Screen name="AddProject" component={AddProject} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </ApolloProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
