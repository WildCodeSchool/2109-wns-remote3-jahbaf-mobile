import React from 'react';
import { View, Text } from 'react-native';
import { Project as ProjectInterface } from '../models';

export const ProjectCard = ({id, name, description}: ProjectInterface) => {
    return (
        <View>
            <Text>Id: {id}</Text>
            <Text>Name: {name}</Text>
            <Text>Decription: {description}</Text>
        </View>
    );
}
