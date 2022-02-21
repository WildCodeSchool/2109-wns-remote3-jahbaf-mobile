import React, { useEffect, useState } from "react";
import { ScrollView, ScrollViewBase, StyleSheet } from "react-native";
import { useQuery } from "@apollo/client";
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
  const { data, loading, error } = useQuery(GET_PROJECTS_QUERY);

  if (loading) return <Text> loading.. </Text>;

  if (error) return <Text> {error?.message} </Text>;
  const fictiveUsers = [
    { name: "user1," },
    { name: "user2," },
    { name: "user3" },
  ];

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
          renderItem={(itemData) => <ProjectListCard  navigation={navigation} data={itemData.item} />}
        />
      </View>
    </>
  );
};


