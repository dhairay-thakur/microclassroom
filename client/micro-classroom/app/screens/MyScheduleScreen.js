import React, { useContext, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import ActivityIndicator from "../components/ActivityIndicator";
import Card from "../components/Card";
import Screen from "../components/Screen";
import routes from "../navigation/routes";
import Text from "../components/Text";
import Button from "../components/Button";
import useApi from "../hooks/useApi";
import studentsApi from "../api/students";
import teachersApi from "../api/teachers";
import AuthContext from "../auth/context";
import styles from "../styles/MySchedule";

const DayNames = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const MySchedule = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const authApi = user.isStudent ? studentsApi : teachersApi;

  const renderSchedule = (data) => {
    let s = [[], [], [], [], [], [], []];
    if (data.subjects) {
      data.subjects.forEach((subject) => {
        subject.schedule.forEach((x, idx) => {
          if (x.length > 0) {
            s[idx].push(subject);
          }
        });
      });
    }
    return s;
  };
  const {
    data,
    error,
    loading,
    request: loadSubjects,
  } = useApi(authApi.getScheduleById);
  useEffect(() => {
    loadSubjects(user.userId);
  }, []);

  return (
    <Screen style={styles.screen}>
      <ActivityIndicator visible={loading} />
      {!loading && error && (
        <View style={styles.error}>
          <Text>Couldn't Load Schedule!</Text>
          <Button title={"retry"} onPress={() => loadSubjects(user.userId)} />
        </View>
      )}
      {!loading && !error && (
        <FlatList
          refreshing={false}
          onRefresh={() => loadSubjects(user.userId)}
          showsVerticalScrollIndicator={false}
          keyExtractor={(subject, idx) => idx}
          data={renderSchedule(data)}
          renderItem={({ item, index }) => (
            <>
              {item.length > 0 && (
                <Text style={styles.day}>{DayNames[index]}</Text>
              )}
              <FlatList
                refreshing={false}
                onRefresh={loadSubjects}
                showsVerticalScrollIndicator={false}
                keyExtractor={(subject, idx) => idx}
                data={item}
                renderItem={({ item }) => (
                  <View style={styles.card}>
                    <View style={styles.detailsContainer}>
                      <View>
                        <Text style={styles.title} numberOfLines={1}>
                          {item.name}
                        </Text>
                        <Text style={styles.subTitle} numberOfLines={1}>
                          {item.schedule[index][0]} - {item.schedule[index][1]}
                        </Text>
                      </View>
                      <Button
                        onPress={() => {
                          console.log(item);
                        }}
                        title="Join"
                        width="30%"
                      />
                    </View>
                  </View>
                )}
              />
              {item.length > 0 && <View style={styles.divider} />}
            </>
          )}
        />
      )}
    </Screen>
  );
};

export default MySchedule;
