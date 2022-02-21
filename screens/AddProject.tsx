import React, { useEffect, useState } from "react";
import { Pressable, SafeAreaView, View, Text, TextInput, StyleSheet } from "react-native";
import * as colors from "../styles";
import { ProjectInput } from "../models/project.models";

import { CREATE_PROJECT_MUTATION } from "../services";
import { useMutation } from "@apollo/client";

const emptyProjectInfos: ProjectInput = {
  name: '',
  description: '',
}

export const AddProject = ({ navigation }: any) =>{
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isDone, setIsDone] = useState<boolean>();
  const [projectData, setProjectData] = useState<ProjectInput>(emptyProjectInfos);
  const [mutateProject, { loading, error, data }] = useMutation(CREATE_PROJECT_MUTATION, {
    variables: {
      projectInput: {
        name: projectData.name,
        description: projectData.description,
      }
    },
  });
  const validateNameAndDescription = () => {
    if (currentStep === 0) {
      if (projectData.name) {} else return;
    }
    console.log("Name and description are valid");
    setCurrentStep(currentStep + 1);
  }
  const validateMembers = () => {
    console.log("Members Ok")
    setCurrentStep(currentStep + 1);
  }
  
  useEffect(() => {
    if (!isDone) return;
    (async () => {
      let res = await mutateProject()
      navigation.navigate('Project', { id: res.data.createProject.id });
    })();
  }, [isDone]);
  if (currentStep === 0) {
    return (
      <View style={{backgroundColor: colors.BACKGROUND_COLOR_DARK, flex: 1}}>
        <SafeAreaView>
          <Text style={styles.header}>Add new project</Text>
          <View style={styles.projectCard}>
            <Text style={styles.stepTitle}>Informations</Text>
            <Text style={styles.inputTitle}>Name</Text>
            <TextInput
              style={styles.inputName}
              placeholder="Project name"
              onChangeText={(text: string) => setProjectData({ ...projectData, name: text.trim() })}
            />
            <Text style={styles.inputTitle}>Description</Text>
            <TextInput
              style={styles.inputDescription}
              placeholder="Project description"
              onChangeText={(text: string) => setProjectData({ ...projectData, description: text.trim() })}
              multiline = {true}
              numberOfLines = {4}
            />
            <View
              style={styles.nextContainer}
            >
              <Pressable
                style={styles.nextButton}
                onPress={validateNameAndDescription}
                >
                <Text style={styles.nextButtonText}>Next</Text>
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
      </View>
    );
  } else if (currentStep === 1) {
    return (
      <View style={{backgroundColor: colors.BACKGROUND_COLOR_DARK, flex: 1}}>
        <SafeAreaView>
          <Text style={styles.header}>Add new project</Text>
          <View style={styles.projectCard}>
            <Text style={styles.stepTitle}>Project members</Text>
            <View
              style={styles.nextContainer}
            >
              <Pressable
                style={styles.nextButton}
                onPress={validateMembers}
              >
                <Text style={styles.nextButtonText}>Next</Text>
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
      </View>
    );
  } else {
    return (
      <View style={{backgroundColor: colors.BACKGROUND_COLOR_DARK, flex: 1}}>
        <SafeAreaView>
          <Text style={styles.header}>Add new project</Text>
          <View style={styles.projectCard}>
            <Text style={styles.stepTitle}>Project Summary</Text>
            <Text>Project name:</Text>
            <Text>{projectData.name}</Text>
            <Text>Project description:</Text>
            <Text>{projectData.description}</Text>
            <View
              style={styles.nextContainer}
            >
              <Pressable
                style={styles.nextButton}
                onPress={() => setIsDone(true)}
                >
                <Text style={styles.nextButtonText}>Next</Text>
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
      </View>
    );
  }
  
};

const styles = StyleSheet.create({
  header: {
    textAlign: "center",
    fontSize: 30,
    marginVertical: 20,
    color: colors.TEXT_COLOR_LIGHT,
  },
  projectCard: {
    marginHorizontal: 15,
    borderWidth: 2,
    borderColor: "black",
    borderStyle: "solid",
  },
  stepTitle: {
    fontSize: 20,
    textAlign: "center",
    marginVertical: 10,
    color: colors.TEXT_COLOR_LIGHT,

  },
  inputTitle: {
    fontSize: 15,
    marginLeft: 10,
    color: colors.TEXT_COLOR_LIGHT,
  },
  inputName: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  inputDescription: {
    height: 120,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  nextContainer: {
    alignItems: "center",
  },
  nextButton: {
    marginVertical: 10,
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  nextButtonText: {
    color: colors.TEXT_COLOR_LIGHT,
  }
})
