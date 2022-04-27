import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { LogBox, SafeAreaView, Text } from "react-native";
import { ApolloProvider, useLazyQuery } from "@apollo/client";
import { client, SELF_QUERY } from "./services";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthStack, AppStack } from "./routes";
import { setContext } from "@apollo/client/link/context";

const LoginGuard = ({ onSelfEnd, setSelfLoading, children }: any) => {
  const [querySelf, { data, loading, error }] = useLazyQuery(SELF_QUERY, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    (async () => {
      setSelfLoading(true);
      setContext(async (_, { headers, context }) => {
        const token = await AsyncStorage.getItem("session_ID");
        console.log("In context: ", token);
        return {
          ...context,
          headers: {
            ...headers,
            Authorization: token,
          },
        };
      });
      querySelf();
    })();
  }, []);

  useEffect(() => {
    if (!loading) {
      console.log("App useEffect", error);
      onSelfEnd(!error);
      setSelfLoading(false);
    }
  }, [loading]);

  return <>{children}</>;
};

LogBox.ignoreAllLogs(true);
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const initDefaultLog = async () => {
    await AsyncStorage.getItem("session_ID").then(async (token) => {
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  };

  useEffect(() => {
    initDefaultLog();
  }, []);
  // ((async () => { await AsyncStorage.removeItem("session_ID"); setIsLoggedIn(false); setIsLoading(false); }))();
  return (
    <ApolloProvider client={client}>
      <SafeAreaView style={{ flex: 1 }}>
        <LoginGuard onSelfEnd={setIsLoggedIn} setSelfLoading={setIsLoading}>
          {isLoading && <Text>Loading</Text>}
          {!isLoading && (
            <NavigationContainer>
              {isLoggedIn ? (
                <AppStack onLogout={() => setIsLoggedIn(false)} />
              ) : (
                <AuthStack onLogIn={() => setIsLoggedIn(true)} />
              )}
            </NavigationContainer>
          )}
        </LoginGuard>
      </SafeAreaView>
    </ApolloProvider>
  );
};

export default App;
