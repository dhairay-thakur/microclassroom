import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import ActivityIndicator from "../components/ActivityIndicator";
import Card from "../components/Card";
import Screen from "../components/Screen";
import routes from "../navigation/routes";
import AppText from "../components/Text";
import AppButton from "../components/Button";
// import useApi from "../hooks/useApi";
// import listingsApi from "../api/listings";

import styles from "../styles/Classes";

const dummy = [
  {
    id: 0,
    teacher: "6192c1e9032a756e2ab71bd4",
    name: "CS101",
    schedule: [
      ["17:30", "18:30", 0],
      [],
      ["13:00", "14:00", 10],
      [],
      ["18:00", "19:00", 20],
      [],
      [],
    ],
    meetLink: "test_link",
    maxCapacity: 10,
    description: "this is computer science",
    attendees: [],
  },
  {
    id: 1,
    teacher: "6192c1e9032a756e2ab71bd4",
    name: "CS101",
    schedule: [
      [1730, 1830, 0],
      [],
      [1300, 1400, 10],
      [],
      [1800, 1900, 20],
      [],
      [],
    ],
    meetLink: "test_link",
    maxCapacity: 10,
    attendees: [],
  },
  {
    id: 2,
    teacher: "6192c1e9032a756e2ab71bd4",
    name: "CS101",
    schedule: [
      [1730, 1830, 0],
      [],
      [1300, 1400, 10],
      [],
      [1800, 1900, 20],
      [],
      [],
    ],
    meetLink: "test_link",
    maxCapacity: 10,
    attendees: [],
  },
  {
    id: 3,
    teacher: "6192c1e9032a756e2ab71bd4",
    name: "CS101",
    schedule: [
      [1730, 1830, 0],
      [],
      [1300, 1400, 10],
      [],
      [1800, 1900, 20],
      [],
      [],
    ],
    meetLink: "test_link",
    maxCapacity: 10,
    attendees: [],
  },
];

const ClassesScreen = ({ navigation }) => {
  // const {
  //   data,
  //   error,
  //   loading,
  //   request: loadListings,
  // } = useApi(listingsApi.getAllListings);
  // useEffect(() => {
  //   loadListings();
  // }, []);

  return (
    <Screen style={styles.screen}>
      {/* <ActivityIndicator visible={loading} /> */}
      {/* {!loading && error && (
        <View style={styles.error}>
          <AppText>Couldn't load listings!</AppText>
          <AppButton title={"retry"} onPress={loadListings} />
        </View>
      )} */}
      {/* {!loading && !error && ( */}
      <FlatList
        refreshing={false}
        // onRefresh={loadListings}
        showsVerticalScrollIndicator={false}
        data={dummy}
        keyExtractor={(subject) => subject.id.toString()}
        renderItem={({ item }) => (
          <Card
            title={item.name}
            subTitle={item.meetLink}
            onPress={() => navigation.navigate(routes.CLASS_DETAILS, item)}
          />
        )}
      />
      {/* )} */}
    </Screen>
  );
};

export default ClassesScreen;
