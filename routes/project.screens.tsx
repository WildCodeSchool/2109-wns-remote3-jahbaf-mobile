import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Projects, Project, AddProject } from "../screens";

const Stack = createNativeStackNavigator();

export const ProjectsScreens = () => {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen
        name="ProjectsList"
        component={Projects}
        options={{ title: "Projects" }}
      />
      <Stack.Screen
        name="Project"
        component={Project}
        options={{ title: "Project Details" }}
      />
    </Stack.Navigator>
  );
};

export const AddProjectScreens = () => {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen
        name="AddProject"
        component={AddProject}
        options={{ title: "Projects" }}
      />
    </Stack.Navigator>
  );
};
