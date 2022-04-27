import React from 'react';
import { Text, View } from 'react-native';
import { commonStyles } from '../styles';

export const Loader = () => {
    return (
        <View style={commonStyles.fullPage}>
            <Text>Loading...</Text>
        </View>
    );
};