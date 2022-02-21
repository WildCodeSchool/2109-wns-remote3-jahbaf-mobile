import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import { useQuery } from "@apollo/client";
import { FIND_ONE_PROJECT_BY_ID } from "../services";
import { ProjectCard } from "../components";

export const Project = ({route}: any) => {
  const { loading, error, data } = useQuery(FIND_ONE_PROJECT_BY_ID, {variables: { id: route.params.id }});
  if (error) console.log(error);
  if (data) console.log(data.findProjectById)
  return (
    <View>
      <SafeAreaView>
        {error && <Text>ERROR</Text>}
        {loading && <Text>Loading</Text>}
        {data && <ProjectCard  {...data.findProjectById} />}
      </SafeAreaView>
    </View>
  );
};
