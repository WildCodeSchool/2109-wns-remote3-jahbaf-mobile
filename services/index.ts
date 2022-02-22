import { ApolloClient, InMemoryCache } from "@apollo/client";
// @ts-ignore
import { LOCALHOST } from "react-native-dotenv";

export * from "./projects.service";
export * from "./tasks.service";

export const client = new ApolloClient({
  uri: `http://${LOCALHOST}:4004/graphql`,
  cache: new InMemoryCache(),
});
