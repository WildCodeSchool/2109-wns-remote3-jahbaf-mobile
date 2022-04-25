import React from "react";
import { useApolloClient, useQuery } from "@apollo/client";
import { GET_PROJECTS_QUERY } from "../services/index";
import {
  commonStyles,
  BACKGROUND_COLOR_DARK,
  TEXT_COLOR_LIGHT,
  INTERACTION_COLOR,
  DARK_COLOR_DARKER,
} from "../styles/index";
import { ProjectListCard } from "../components";
import { Text, View, FlatList } from "react-native";

export const Projects = ({ navigation }: any) => {
  const cache = useApolloClient().cache;
  const { data, loading, error } = useQuery(GET_PROJECTS_QUERY, {
    onCompleted: (data: any) => {
      const result = cache.readQuery<any, void>({ query: GET_PROJECTS_QUERY });
      cache.writeQuery({
          query: GET_PROJECTS_QUERY,
          data: { findManyProjects: result?.findManyProjects }
      });
    },
    onError: (e: any) => { console.log(e) },
  });

  if (loading) return <Text> loading.. </Text>;

  if (error) return <Text> {error?.message} </Text>;

  return (
    <>
      <View
        style={[
          commonStyles.fullPage,
          {
            backgroundColor: BACKGROUND_COLOR_DARK,
            width: "100%",
          },
        ]}
      >
        <FlatList
          contentContainerStyle={{
            marginTop: 20,
            justifyContent: "space-around",
            marginHorizontal: 20
          }}
          data={data.findManyProjects}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => <ProjectListCard  navigation={navigation} data={itemData.item} key={itemData.item.id} />}
        />
      </View>
    </>
  );
};


