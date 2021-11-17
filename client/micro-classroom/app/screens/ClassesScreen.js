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
    schedule: {
      mon: [1730, 1830, 0],
      tue: [],
      wed: [1300, 1400, 10],
      thu: [],
      fri: [1800, 1900, 20],
      sat: [],
      sun: [],
    },
    meetLink: "test_link",
    maxCapacity: 10,
    attendees: [],
  },
  {
    id: 1,
    teacher: "6192c1e9032a756e2ab71bd4",
    name: "CS101",
    schedule: {
      mon: [1730, 1830, 0],
      tue: [],
      wed: [1300, 1400, 10],
      thu: [],
      fri: [1800, 1900, 20],
      sat: [],
      sun: [],
    },
    meetLink: "test_link",
    maxCapacity: 10,
    attendees: [],
  },
  {
    id: 2,
    teacher: "6192c1e9032a756e2ab71bd4",
    name: "CS101",
    schedule: {
      mon: [1730, 1830, 0],
      tue: [],
      wed: [1300, 1400, 10],
      thu: [],
      fri: [1800, 1900, 20],
      sat: [],
      sun: [],
    },
    meetLink: "test_link",
    maxCapacity: 10,
    attendees: [],
  },
  {
    id: 3,
    teacher: "6192c1e9032a756e2ab71bd4",
    name: "CS101",
    schedule: {
      mon: [1730, 1830, 0],
      tue: [],
      wed: [1300, 1400, 10],
      thu: [],
      fri: [1800, 1900, 20],
      sat: [],
      sun: [],
    },
    meetLink: "test_link",
    maxCapacity: 10,
    attendees: [],
  },
  {
    id: 4,
    teacher: "6192c1e9032a756e2ab71bd4",
    name: "CS101",
    schedule: {
      mon: [1730, 1830, 0],
      tue: [],
      wed: [1300, 1400, 10],
      thu: [],
      fri: [1800, 1900, 20],
      sat: [],
      sun: [],
    },
    meetLink: "test_link",
    maxCapacity: 10,
    attendees: [],
  },
  {
    id: 5,
    teacher: "6192c1e9032a756e2ab71bd4",
    name: "CS101",
    schedule: {
      mon: [1730, 1830, 0],
      tue: [],
      wed: [1300, 1400, 10],
      thu: [],
      fri: [1800, 1900, 20],
      sat: [],
      sun: [],
    },
    meetLink: "test_link",
    maxCapacity: 10,
    attendees: [],
  },
  {
    id: 6,
    teacher: "6192c1e9032a756e2ab71bd4",
    name: "CS101",
    schedule: {
      mon: [1730, 1830, 0],
      tue: [],
      wed: [1300, 1400, 10],
      thu: [],
      fri: [1800, 1900, 20],
      sat: [],
      sun: [],
    },
    meetLink: "test_link",
    maxCapacity: 10,
    attendees: [],
  },
  {
    id: 7,
    teacher: "6192c1e9032a756e2ab71bd4",
    name: "CS101",
    schedule: {
      mon: [1730, 1830, 0],
      tue: [],
      wed: [1300, 1400, 10],
      thu: [],
      fri: [1800, 1900, 20],
      sat: [],
      sun: [],
    },
    meetLink: "test_link",
    maxCapacity: 10,
    attendees: [],
  },
  {
    id: 8,
    teacher: "6192c1e9032a756e2ab71bd4",
    name: "CS101",
    schedule: {
      mon: [1730, 1830, 0],
      tue: [],
      wed: [1300, 1400, 10],
      thu: [],
      fri: [1800, 1900, 20],
      sat: [],
      sun: [],
    },
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
