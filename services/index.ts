import { ApolloClient, InMemoryCache } from "@apollo/client";

export * from "./projects.service";
export * from "./tasks.service";

export const client = new ApolloClient({
  uri: "http://localhost:4004/graphql",
  cache: new InMemoryCache(),
});
