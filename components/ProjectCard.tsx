import React from "react";
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import { DARK_COLOR_DARKER, INTERACTION_COLOR, TEXT_COLOR_LIGHT,} from "../styles";
import { Project as ProjectInterface } from "../models";

const footerBtns = [
  {
    name: "edit",
    icon: "create",
    function: () => {
      console.log("edit");
    },
  },
  {
    name: "delete",
    icon: "trash",
    function: () => {
      console.log("delete");
    },
  },
];

export const ProjectCard = ({ id, name, description }: ProjectInterface) => {
  return (
    <View style={styles.projectCard}>
        <Text style={{ fontSize: 30, color: INTERACTION_COLOR, textAlign: "center" }}>
            {name}
        </Text>
        <View style={{ marginTop: 35 }}>
            <Text style={{ fontSize: 20, color: INTERACTION_COLOR }}>
                Description
            </Text>
            <Text style={{ fontSize: 16, color: TEXT_COLOR_LIGHT, marginTop: 10 }}>
            {description}
            </Text>
        </View>
        <View
            style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 40,
            }}
        >
            {footerBtns.map((btn) => (
            <TouchableOpacity
                style={{
                borderRadius: 10,
                padding: 5,
                backgroundColor: INTERACTION_COLOR,
                marginHorizontal: 10,
                }}
                onPress={btn.function}
            >
                <Icon name={btn.icon as any} color={TEXT_COLOR_LIGHT} size={23} />
            </TouchableOpacity>
            ))}
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  projectCard: {
    alignSelf: "center",
    marginTop: 15,
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 3,
    padding: 25,
    width: "90%",
    marginHorizontal: 10,
    backgroundColor: DARK_COLOR_DARKER,
    shadowColor: DARK_COLOR_DARKER,
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
});