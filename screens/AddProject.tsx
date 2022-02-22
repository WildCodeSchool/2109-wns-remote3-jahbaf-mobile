import React, { useEffect, useState } from "react";
import { Pressable, SafeAreaView, View, Text, TextInput, StyleSheet } from "react-native";
import * as colors from "../styles";
import { ProjectInput } from "../models/project.models";

import { CREATE_PROJECT_MUTATION, GET_PROJECTS_QUERY } from "../services";
import { useApolloClient, useMutation } from "@apollo/client";

const emptyProjectInfos: ProjectInput = {
  name: '',
  description: '',
}

export const AddProject = ({ navigation }: any) =>{
  const cache = useApolloClient().cache;
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isDone, setIsDone] = useState<boolean>();
  const [projectData, setProjectData] = useState<ProjectInput>(emptyProjectInfos);
  /* 
        onError: (e) => {
            dispatch(displayNotification('error', 'Une erreur interne est survenue, veuillez réessayer.'));
        }
  */
  const [mutateProject, { loading, error, data }] = useMutation(CREATE_PROJECT_MUTATION, {
    variables: {
      projectInput: {
        name: projectData.name,
        description: projectData.description,
      }
    },
    onCompleted: (data: any) => {
      const result = cache.readQuery<any, void>({ query: GET_PROJECTS_QUERY });
      cache.writeQuery({
          query: GET_PROJECTS_QUERY,
          data: { findManyProjects: [...result?.findManyProjects, data.createProject] }
      });
    },
    onError: (e: any) => { console.log(e) },
  });
  const validateNameAndDescription = () => {
    if (currentStep === 0) {
      if (projectData.name) {
        projectData.name = projectData.name.trim();
        projectData.description = projectData.description?.trim();
      } else return;
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
              placeholderTextColor={"#eeeeee50"}
              onChangeText={(text: string) => setProjectData({ ...projectData, name: text })}
              value={projectData.name}
            />
            <Text style={styles.inputTitle}>Description</Text>
            <TextInput
              style={styles.inputDescription}
              placeholder="Project description"
              placeholderTextColor={"#eeeeee50"}
              onChangeText={(text: string) => setProjectData({ ...projectData, description: text })}
              value={projectData.description}
              multiline = {true}
              numberOfLines = {4}
            />
            <View
              style={styles.actionContainer}
            >
              <Pressable
                style={styles.actionButton}
                onPress={validateNameAndDescription}
                >
                <Text style={[styles.actionButtonText, projectData.name == "" ? {color: "#D7722F50"} : null]}>Next</Text>
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
              style={styles.actionContainer}
            >
              <Pressable
              style={styles.actionButton}
              onPress={() => setCurrentStep(currentStep - 1)}
              >
                <Text style={styles.actionButtonText}>Previous</Text>
              </Pressable>
              <Pressable
                style={styles.actionButton}
                onPress={validateMembers}
              >
                <Text style={styles.actionButtonText}>Next</Text>
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
            <Text style={styles.stepTitle}>Project summary</Text>
            <Text style={styles.inputTitle}>Project name:<Text style={styles.inputName}> {projectData.name}</Text></Text>
            {projectData.description ? <Text style={[styles.inputTitle, {fontSize: 15}]}>Project description:<Text style={styles.inputName}> {projectData.description}</Text></Text> : null}
            {/* TEAM MEMBERS */}
            <View
              style={styles.actionContainer}
            >
              <Pressable
                style={styles.actionButton}
                onPress={() => setCurrentStep(currentStep - 1)}
              >
                <Text style={styles.actionButtonText}>Previous</Text>
              </Pressable>
              <Pressable
                style={styles.actionButton}
                onPress={() => setIsDone(true)}
                >
                <Text style={styles.actionButtonText}>Save</Text>
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
    color: colors.INTERACTION_COLOR,
  },
  projectCard: {
    borderWidth: 1,
    borderRadius: 3,
    marginHorizontal: 10,
    padding: 15,
    backgroundColor: colors.DARK_COLOR_DARKER,
    shadowColor: colors.DARK_COLOR_DARKER,
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    marginVertical: 5,
  },
  stepTitle: {
    fontSize: 25,
    textAlign: "center",
    marginVertical: 10,
    color: colors.INTERACTION_COLOR,
  },
  inputTitle: {
    fontSize: 20,
    marginLeft: 10,
    color: colors.INTERACTION_COLOR,
  },
  inputName: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    color: colors.TEXT_COLOR_LIGHT
  },
  inputDescription: {
    height: 120,
    margin: 12,
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    color: colors.TEXT_COLOR_LIGHT,
  },
  actionContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  actionButton: {
    width: 120,
    marginVertical: 10,
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  actionButtonText: {
    textAlign: 'center',
    fontSize: 20,
    color: colors.INTERACTION_COLOR,
  },
  
})
