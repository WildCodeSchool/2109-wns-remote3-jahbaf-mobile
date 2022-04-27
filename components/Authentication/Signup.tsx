import React, { useState} from 'react';
import { TextInput, Pressable, Text, SafeAreaView, View, StyleSheet } from 'react-native';
import { SIGNUP_MUTATION } from '../../services';
import { useMutation } from '@apollo/client';
import { useSetHeaders } from '../../hooks';
import * as colors from '../../styles';
import { verify } from '../../utils';
import { SignupInput } from '../../models';

export const Signup = ({onChange, onLogIn}: any) => {
    const [userInput, setUserInput] = useState<SignupInput>({
        name: '',
        email: '',
        password: '',
        passwordCheck: '',
    })
    const [signUpSubmit, ] = useMutation(SIGNUP_MUTATION, {
        onCompleted: async ( {signUp: token}: any) => {
            await useSetHeaders(token, 'session_ID');
            onLogIn();
        },
        onError: (error) => {
            console.log("Signup error", error);
        }
    });
    const onSubmit = async () => {
        // if (verify.signupInput(userInput)) {
            signUpSubmit({
                variables: {
                    name: userInput.name,
                    email: userInput.email,
                    password: userInput.password,
                },
            });
        // }
    }
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: colors.BACKGROUND_COLOR_DARK}}>
            <Text style={styles.title}>Signup</Text>
            <View style={styles.container}>
                <Text style={styles.inputTitle}>Name</Text>
                <TextInput 
                    style={styles.input}
                    placeholderTextColor={"#eeeeee50"}
                    placeholder="Name"
                    onChangeText={(text: string) => setUserInput({...userInput, name: text})}
                    value={userInput.name}
                />
                <Text style={styles.inputTitle}>Email</Text>
                <TextInput 
                    style={styles.input}
                    placeholderTextColor={"#eeeeee50"}
                    placeholder="Email"
                    keyboardType="email-address"
                    value={userInput.email}
                    onChangeText={(text: string) => setUserInput({...userInput, email: text})}
                />
                <Text style={styles.inputTitle}>Password</Text>
                <TextInput 
                    style={styles.input}
                    placeholderTextColor={"#eeeeee50"}
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={(text: string) => setUserInput({...userInput, password: text})}
                />
                <Text style={styles.inputTitle}>Verify password</Text>
                <TextInput 
                    style={styles.input}
                    placeholderTextColor={"#eeeeee50"}
                    placeholder="Repeat password"
                    secureTextEntry={true}
                    onChangeText={(text: string) => setUserInput({...userInput, passwordCheck: text})}
                />
                <Pressable 
                    onPress={onSubmit}
                    style={styles.submit}
                >
                    <Text style={[styles.submitText, 
                        verify.allCompleted(userInput) 
                        ? null : styles.inactive
                    ]}>Signup</Text>
                </Pressable>
                <Pressable
                    onPress={() => {onChange(true);}}
                >
                    <Text style={styles.redirect}>Already have an account ?</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        color: colors.INTERACTION_COLOR,
        alignSelf: 'center',
        marginTop: 20,
    },
    container: {
        alignSelf: 'center',
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
        marginVertical: 5
    },
    inputTitle: {
        fontSize: 20,
        color: colors.INTERACTION_COLOR
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        marginTop: 5,
        marginBottom: 10,
        color: colors.TEXT_COLOR_LIGHT,
    },
    submit: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
    },
    submitText: {
        fontSize: 25,
        textAlign: 'center',
        color: colors.INTERACTION_COLOR,
    },
    inactive: {
        color: "#D7722F50"
    },
    redirect: {
        marginTop: 10,
        color: colors.TEXT_COLOR_LIGHT,
    }
})