import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_PROJECTS_QUERY } from "../services/index";
import { Project } from "../models";
import {
  commonStyles,
  BACKGROUND_COLOR_DARK,
  TEXT_COLOR_LIGHT,
  INTERACTION_COLOR,
  DARK_COLOR_DARKER,
} from "../styles/index";

import { Text, View, FlatList, TouchableOpacity } from "react-native";

export const Projects = ({ navigation }: any) => {
  const { data, loading, error } = useQuery(GET_PROJECTS_QUERY);

  if (loading) return <Text> loading.. </Text>;

  if (error) return <Text> {error?.message} </Text>;

  const fictiveUser = [
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
            flex: 1,
            justifyContent: "space-around",
            marginLeft: 35,
            marginRight: 35,
          }}
          data={data.findManyProjects}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigation.navigate("Project", {
                  id: itemData.item.id,
                })
              }
            >
              <Text
                style={{
                  fontSize: 30,
                  color: INTERACTION_COLOR,
                }}
              >
                Project name:
                <Text
                  style={{
                    fontSize: 30,
                    color: TEXT_COLOR_LIGHT,
                    marginLeft: 10,
                  }}
                >
                  {itemData.item.name}
                </Text>
              </Text>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <View style={{ flexDirection: "row" }}>
                  <View style={[styles.avatar, { marginLeft: 0 }]} />
                  <View style={styles.avatar} />
                  <View style={styles.avatar} />
                </View>
                <FlatList
                  style={{ flexDirection: "row", marginTop: 25 }}
                  data={fictiveUser}
                  keyExtractor={(fictiveUser) => fictiveUser.name}
                  renderItem={(itemData) => (
                    <Text style={{ marginLeft: 3 }}>{itemData.item.name}</Text>
                  )}
                />
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 3,
    padding: 25,
    width: "100%",
    backgroundColor: DARK_COLOR_DARKER,
    shadowColor: DARK_COLOR_DARKER,
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },

  avatar: {
    borderWidth: 1,
    borderRadius: 50,
    padding: 45,
    marginLeft: -35,
    backgroundColor: "gray",
  },
});
