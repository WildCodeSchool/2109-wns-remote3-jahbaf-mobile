import React, { useEffect } from 'react';
import { FlatList, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import * as colors from "../styles";


export const ProjectListCard = ({ navigation, data}:any) => {
  const users = [{name: "user1"}, {name: "user2"}];
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("Project", { id: data.id })}
    >
      <Text
        style={{
          fontSize: 15,
          color: colors.INTERACTION_COLOR,
        }}
      >
        Project name:
        <Text
          style={{
            fontSize: 15,
            color: colors.TEXT_COLOR_LIGHT,
            marginLeft: 10,
          }}
        >
          {" " + data.name}
        </Text >
      </Text>
      <Text style={{
          fontSize: 10,
          color: colors.INTERACTION_COLOR,
        }}>
          Description:
        <Text style={{
            fontSize: 10,
            color: colors.TEXT_COLOR_LIGHT,
            marginLeft: 10,
          }}>
            {" " + data.description}
        </Text>
      </Text>
      <Text>{data.id}</Text>
      <View style={{ justifyContent: "center", alignItems: "center", marginTop: 5}}>
        <View style={{ flexDirection: "row" }}>
          <View style={[styles.avatar, { marginLeft: 0 }]} />
          <View style={styles.avatar} />
          <View style={styles.avatar} />
        </View>
        <FlatList
          refreshing={false}
          onRefresh={() => {}}
          style={{ flexDirection: "row", marginTop: 5 }}
          data={users}
          keyExtractor={(user: any) => user.name}
          renderItem={(user: any) => (
            <Text style={{ marginLeft: 3 }}>{user.name}</Text>
          )}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    card: {
      flex: 1,
      justifyContent: "space-between",
      borderWidth: 1,
      borderRadius: 3,
      padding: 25,
      width: "100%",
      backgroundColor: colors.DARK_COLOR_DARKER,
      shadowColor: colors.DARK_COLOR_DARKER,
      shadowOffset: { width: 6, height: 6 },
      shadowOpacity: 0.5,
      shadowRadius: 3,
      marginVertical: 5
    },
  
    avatar: {
      borderWidth: 1,
      borderRadius: 50,
      padding: 15,
      marginLeft: 0,
      backgroundColor: "gray",
    },
  });