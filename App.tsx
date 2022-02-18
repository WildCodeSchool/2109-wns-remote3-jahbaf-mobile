import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome5";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AddProject, Project, Projects } from "./screens";
import { ApolloProvider } from "@apollo/client";
import { client } from "./services";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <ApolloProvider client={client}>
      {/* <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Project" component={Project} />
        </Stack.Navigator>
      </NavigationContainer> */}
      <SafeAreaView style={{ flex: 1 }}>
        {/* <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Project" component={Project} />
          </Stack.Navigator>
        </NavigationContainer> */}
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                if (route.name === "Projects")
                  return (
                    <FontAwesome
                      name="th-list"
                      color={focused ? "red" : "blue"}
                    />
                  );
                else if (route.name === "AddProject")
                  return (
                    <FontAwesome name="plus" color={focused ? "red" : "blue"} />
                  );
              },
              tabBarActiveTintColor: "blue",
              tabBarLabel: () => null,
              headerShown: false,
            })}
          >
            <Tab.Screen name="Projects" component={Projects} />
            <Tab.Screen name="AddProject" component={AddProject} />
            <Tab.Screen
              name="Project"
              component={Project}
              options={{
                tabBarIconStyle: { display: "none" },
              }}
            />
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
