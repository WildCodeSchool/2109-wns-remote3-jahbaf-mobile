import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_PROJECTS_QUERY } from "../services/index";
import { Project } from "../models";
import {
  commonStyles,
  BACKGROUND_COLOR_DARK,
  TEXT_COLOR_LIGHT,
} from "../styles";

import { Text, View, FlatList, TouchableOpacity } from "react-native";

export const Projects = ({ navigation }: any) => {
  const mockProjects: Project[] = [
    {
      id: "12",
      name: "testProject1",
    },
    {
      id: "13",
      name: "testProject2",
    },
    {
      id: "14",
      name: "testProject3",
    },
  ];
  const { data, loading, error } = useQuery(GET_PROJECTS_QUERY);

  return (
    <>
      <View
        style={[
          commonStyles.fullPage,
          {
            alignItems: "center",
            justifyContent: "space-around",
            backgroundColor: BACKGROUND_COLOR_DARK,
          },
        ]}
      >
        {loading && <Text>Loading</Text>}
        {error && <Text>{error?.message}</Text>}
        <FlatList
          contentContainerStyle={{ flex: 1, justifyContent: "space-around" }}
          data={mockProjects}
          keyExtractor={(mockProjects) => mockProjects.id}
          renderItem={(itemData) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Project", {
                  id: itemData.item.id,
                })
              }
            >
              <Text
                style={{ fontSize: 30, marginTop: 7, color: TEXT_COLOR_LIGHT }}
              >
                {itemData.item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </>
  );
};

/* 
gql`
query Query {
  findManyProjects {
    id
    name
    description
  }
}
`
*/
