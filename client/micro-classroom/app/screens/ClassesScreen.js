import React, { useContext, useEffect, useState } from "react";
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
import AuthContext from "../auth/context";

import styles from "../styles/Classes";

const ClassesScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const authApi = user.isStudent ? studentsApi : teachersApi;
  const {
    data,
    error,
    loading,
    request: loadSubjects,
  } = useApi(authApi.getScheduleById);
  useEffect(() => {
    loadSubjects(user.userId.toString());
  }, []);

  return (
    <Screen style={styles.screen}>
      <ActivityIndicator visible={loading} />
      {!loading && error && (
        <View style={styles.error}>
          <AppText>Couldn't Load Classes!</AppText>
          <AppButton
            title={"retry"}
            onPress={() => loadSubjects(user.userId)}
          />
        </View>
      )}
      {!loading && !error && (
        <FlatList
          refreshing={loading}
          onRefresh={() => loadSubjects(user.userId)}
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
