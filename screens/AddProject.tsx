import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { commonStyles } from "../styles/Pages.styles";

import { CREATE_PROJECT_MUTATION, GET_PROJECTS_QUERY } from "../services/index";
import { useApolloClient, useMutation } from "@apollo/client";

export const AddProject = () => {
  const cache = useApolloClient().cache;

  const [addProject, { loading }] = useMutation(CREATE_PROJECT_MUTATION, {
    onCompleted: (data: any) => {
      const result = cache.readQuery<any, void>({ query: GET_PROJECTS_QUERY });
      cache.writeQuery({
        query: GET_PROJECTS_QUERY,
        data: {
          findManyProjects: [...result?.findManyProjects, data.createProject],
        },
      });
    },
  });

  return (
    <View>
      <Text style={commonStyles.fullPage}>Add Project</Text>
    </View>
  );
};
