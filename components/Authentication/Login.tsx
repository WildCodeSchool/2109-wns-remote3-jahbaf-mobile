import React, { useState } from "react";
import {
  TextInput,
  Pressable,
  Text,
  SafeAreaView,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { LOGIN_QUERY } from "../../services";
import { useLazyQuery } from "@apollo/client";
import { useSetHeaders } from "../../hooks";
import * as colors from "../../styles";
import { verify } from "../../utils";
import { LoginInput } from "../../models";

export const Login = ({ onChange, onLogIn }: any) => {
  const [userInput, setUserInput] = useState<LoginInput>({
    email: "",
    password: "",
  });
  const [loginQuery]: any = useLazyQuery(LOGIN_QUERY, {
    onCompleted: async ({ login: token }: any) => {
      await useSetHeaders(token, "session_ID");
      onLogIn();
    },
    onError: (error: any) => {
      console.log("Login error", error);
    },
  });
  const onSubmit = async () => {
    if (verify.loginInput(userInput)) {
      loginQuery({
        variables: {
          email: userInput.email,
          password: userInput.password,
        },
      });
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView
        style={{ backgroundColor: colors.BACKGROUND_COLOR_DARK, flex: 1 }}
      >
        <Text style={styles.title}>Login</Text>
        <View style={styles.container}>
          <Text style={styles.inputTitle}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={"#eeeeee50"}
            keyboardType="email-address"
            value={userInput.email}
            onChangeText={(text: string) =>
              setUserInput({ ...userInput, email: text })
            }
          />
          <Text style={styles.inputTitle}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={"#eeeeee50"}
            secureTextEntry={true}
            onChangeText={(text: string) =>
              setUserInput({ ...userInput, password: text })
            }
          />
          <Pressable onPress={onSubmit} style={styles.submit}>
            <Text
              style={[
                styles.submitText,
                userInput.email.length > 0 ? null : styles.inactive,
              ]}
            >
              Login
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              onChange(false);
            }}
          >
            <Text style={styles.redirect}>Don't have an account ?</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    color: colors.INTERACTION_COLOR,
    alignSelf: "center",
    marginTop: 20,
  },
  container: {
    alignSelf: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 3,
    padding: 25,
    width: "90%",
    backgroundColor: colors.DARK_COLOR_DARKER,
    shadowColor: colors.DARK_COLOR_DARKER,
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    marginVertical: 5,
  },
  inputTitle: {
    fontSize: 20,
    color: colors.INTERACTION_COLOR,
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    color: colors.TEXT_COLOR_LIGHT,
  },
  submit: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
  },
  submitText: {
    fontSize: 25,
    textAlign: "center",
    color: colors.INTERACTION_COLOR,
  },
  inactive: {
    color: "#D7722F50",
  },
  redirect: {
    marginTop: 10,
    color: colors.TEXT_COLOR_LIGHT,
  },
});
