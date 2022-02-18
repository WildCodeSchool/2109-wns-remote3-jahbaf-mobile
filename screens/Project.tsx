import React, { useEffect } from "react";
import { Text, View } from "react-native";

export const Project = (data: any) => {
  useEffect(() => {
    console.log(data);
  }, []);
  return (
    <>
      <Text>{data.route.params.id}</Text>
    </>
  );
};
