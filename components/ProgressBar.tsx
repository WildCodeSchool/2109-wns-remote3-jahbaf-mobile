import React, { useEffect, useRef, useState } from "react";
import { Animated, View, StyleSheet, Text, Dimensions } from "react-native";
// import color
import { INTERACTION_COLOR } from "../styles/";

export const ProgressBar = ({ progress, previous }: any) => {

    const progressScale = useRef(new Animated.Value(previous / 2 )).current;
    const progressTranslate = useRef(new Animated.Value(previous)).current;

    const middleDotSize = useRef(new Animated.Value(previous > 0 ? 1 : .01)).current;
    const rightDotSize = useRef(new Animated.Value(previous > 1 ? 1 : .01)).current;

    useEffect(() => {
        Animated.timing(progressScale, {
            toValue: progress / 2,
            duration: 1000,
            useNativeDriver: true
        }).start();
        Animated.timing(progressTranslate, {
            toValue: progress - 1,
            duration: 1000,
            useNativeDriver: true
        }).start();
        Animated.timing(middleDotSize, {
            toValue: progress > 0 ? 1 : .01,
            duration: 1100,
            useNativeDriver: true
        }).start();
        Animated.timing(rightDotSize, {
            toValue: progress > 1 ? 1 : .01,
            duration: 1100,
            useNativeDriver: true
        }).start();
    });
    return (
        <View style={styles.container}>
            <Animated.View style={[styles.progressBar, {
                transform: [
                    {scaleX: progressScale},
                    {translateX: Dimensions.get("window").width*.45}
                ]
            }]}></Animated.View>
            <View style={styles.dotsContainer}>
                <View style={[styles.dot, {marginLeft: -5, backgroundColor: INTERACTION_COLOR}]}>
                    <Animated.View style={[styles.innerDot]}></Animated.View>
                   
                </View>
                <View style={[styles.dot]}>
                    <Animated.View style={[styles.innerDot, {transform: [{scale: middleDotSize}]}]}></Animated.View>
                </View>
                <View style={[styles.dot, {marginRight: -5}]}>
                    <Animated.View style={[styles.innerDot, {transform: [{scale: rightDotSize}]}]}></Animated.View>
                </View>
            </View>
            <View style={styles.titlesContainer}>
                <Text style={[styles.title, progress == 0 ? styles.selected : null]}>Informations</Text>
                <Text style={[styles.title, progress == 1 ? styles.selected : null]}>Members</Text>
                <Text style={[styles.title, progress == 2 ? styles.selected : null]}>Summary</Text>
            </View>
                
                
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignSelf: "center",
        height: 60,
        marginBottom: 20,
    },
    dotsContainer: {
        width: "90%",
        height: 20,
        marginTop: 20,
        alignSelf: "center",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "white",
    },
    dot: {
        width: 30,
        height: 30,
        marginTop: -5,
        backgroundColor: "white",
        zIndex: 10,
        borderRadius: 15,
    },
    innerDot: {
        backgroundColor: INTERACTION_COLOR,
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    progressBar: {
        overflow: "hidden",
        zIndex: 5,
        position: "absolute",
        height: 20,
        backgroundColor: INTERACTION_COLOR,
        marginTop: 20,
        width: Dimensions.get("window").width * 0.85,
        marginLeft: -Dimensions.get("window").width * 0.36,
        borderRightWidth: 5,
        borderRightColor: INTERACTION_COLOR,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    titlesContainer: {
        width: "90%",
        alignSelf: "center",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    title: {
        zIndex: 10,
        color: "white",
        fontSize: 15,
    },
    selected: {
        color: INTERACTION_COLOR,
        fontSize: 30,
        marginTop: -15,
    }
})