import React from 'react';
import { Pressable, SafeAreaView, Text, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as colors from '../styles';

export const Settings = ({navigation, onLogout}: any) => {
    const logout = async () => {
        await AsyncStorage.removeItem("session_ID");
        onLogout();
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.BACKGROUND_COLOR_DARK }}>
            <Text style={styles.title}>Settings</Text>
            <View style={styles.container}>
                <Pressable 
                    onPress={logout}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Logout</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        color: colors.INTERACTION_COLOR,
        textAlign: 'center',
        marginVertical: 20,
    },
    container: {
        marginHorizontal: 20,
        backgroundColor: colors.DARK_COLOR_DARKER,
    },
    button: {
        margin: 20,
        backgroundColor: "#ff222250",
        padding: 10,
    },
    buttonText: {
        fontSize: 20,
        textAlign: 'center',
        color: colors.INTERACTION_COLOR,
    }
})
