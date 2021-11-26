import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import ActivityIndicator from "../components/ActivityIndicator";
import Card from "../components/Card";
import Screen from "../components/Screen";
import routes from "../navigation/routes";
import AppText from "../components/Text";
import AppButton from "../components/Button";
import useApi from "../hooks/useApi";
import studentsApi from "../api/students";
import teachersApi from "../api/teachers";

import styles from "../styles/Classes";

const ClassesScreen = ({ navigation }) => {
  const {
    data,
    error,
    loading,
    request: loadSubjects,
  } = useApi(teachersApi.getScheduleById);
  useEffect(() => {
    loadSubjects("619dca7d06bf9e0ca61646cc");
  }, []);

  console.log(data.subjects);
  return (
    <Screen style={styles.screen}>
      <ActivityIndicator visible={loading} />
      {!loading && error && (
        <View style={styles.error}>
          <AppText>Couldn't Load Classes!</AppText>
          <AppButton
            title={"retry"}
            onPress={() => loadSubjects("619dca7d06bf9e0ca61646cc")}
          />
        </View>
      )}
      {!loading && !error && (
        <FlatList
          refreshing={loading}
          onRefresh={() => loadSubjects("619dca7d06bf9e0ca61646cc")}
          showsVerticalScrollIndicator={false}
          data={data.subjects}
          keyExtractor={(subject) => subject._id.toString()}
          renderItem={({ item }) => (
            <Card
              title={item.name}
              subTitle={item.meetLink}
              onPress={() => navigation.navigate(routes.CLASS_DETAILS, item)}
            />
          )}
        />
      )}
    </Screen>
  );
};

export default ClassesScreen;
