import { ApolloClient, InMemoryCache } from "@apollo/client";
import { LOCALHOST } from "@env";

export * from "./projects.service";
export * from "./tasks.service";

export const client = new ApolloClient({
  uri: `http://${LOCALHOST}:4004/graphql`,
  cache: new InMemoryCache(),
});
