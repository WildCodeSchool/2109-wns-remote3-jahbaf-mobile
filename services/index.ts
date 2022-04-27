import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
// @ts-ignore
import { LOCALHOST } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export * from "./projects.service";
export * from "./tasks.service";
export * from "./auth.service";

const authMiddleware = setContext(async (operation) => {
  const token = await AsyncStorage.getItem("session_ID");
  return {
    headers: {
      authorization: token || null,
    },
  };
});

const authLink = ApolloLink.from([authMiddleware]);

const link = createHttpLink({
  uri: `http://${LOCALHOST}:4004/graphql`,
});

export const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache(),
});
