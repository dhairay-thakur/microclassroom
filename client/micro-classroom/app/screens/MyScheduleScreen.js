import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import ActivityIndicator from "../components/ActivityIndicator";
import Card from "../components/Card";
import Screen from "../components/Screen";
import routes from "../navigation/routes";
import Text from "../components/Text";
import Button from "../components/Button";
// import useApi from "../hooks/useApi";
// import listingsApi from "../api/listings";

import styles from "../styles/MySchedule";

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
    name: "CS102",
    schedule: [
      [],
      ["11:00", "12:00", 0],
      [],
      [],
      ["17:00", "18:00", 20],
      [],
      [],
    ],
    meetLink: "test_link",
    maxCapacity: 10,
    description: "this is computer science",
    attendees: [],
  },
];

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
  const [schedule, setSchedule] = useState([]);
  useEffect(() => {
    let s = [[], [], [], [], [], [], []];
    dummy.forEach((subject) => {
      subject.schedule.forEach((x, idx) => {
        if (x.length > 0) {
          s[idx].push(subject);
        }
      });
    });
    setSchedule(s);
  }, []);
  //   console.log(schedule);
  //   const {
  //   data,
  //   error,
  //   loading,
  //   request: loadListings,
  // } = useApi(listingsApi.getAllListings);
  // useEffect(() => {
  // loadListings();
  //   }, []);

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
        keyExtractor={(subject, idx) => idx}
        data={schedule}
        renderItem={({ item, index }) => (
          <>
            {item.length > 0 && (
              <Text style={styles.day}>{DayNames[index]}</Text>
            )}
            <FlatList
              refreshing={false}
              // onRefresh={loadListings}
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
      {/* )} */}
    </Screen>
  );
};

export default MySchedule;
