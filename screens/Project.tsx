import React from "react";
import { Text, View } from "react-native";
import { useQuery } from "@apollo/client";
import { FIND_ONE_PROJECT_BY_ID } from "../services";
import { ProjectCard } from "../components";
import { BACKGROUND_COLOR_DARK } from "../styles";

export const Project = ({ route }: any) => {
  const { loading, error, data } = useQuery(FIND_ONE_PROJECT_BY_ID, {
    variables: { id: route.params.id },
  });
  if (error) console.log(error);
  return (
    <View style={{ backgroundColor: BACKGROUND_COLOR_DARK, flex: 1 }}>
      {error && <Text>ERROR</Text>}
      {loading && <Text>Loading</Text>}
      {data && <ProjectCard {...data.findProjectById} />}
    </View>
  );
};
