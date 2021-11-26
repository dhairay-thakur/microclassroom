import React, { useContext, useState } from "react";
import { ScrollView, TouchableOpacity, View, Linking } from "react-native";
import Screen from "../components/Screen";
import Text from "../components/Text";
import routes from "../navigation/routes";
import styles from "../styles/ClassDetails";
import AuthContext from "../auth/context";

const DayNames = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const ClassDetailsScreen = ({ navigation, route }) => {
  const subject = route.params;
  const { user } = useContext(AuthContext);

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{subject.name}</Text>
          <Text style={styles.description}>{subject.description}</Text>
          <TouchableOpacity onPress={() => Linking.openURL(subject.meetLink)}>
            <Text style={styles.link}>Join Class</Text>
          </TouchableOpacity>
          {subject.schedule.map(
            (item, key) =>
              item.length !== 0 && (
                <Text key={key} style={styles.weekday}>
                  {DayNames[key]} :{" "}
                  {
                    <Text>
                      {item[0]} - {item[1]}
                    </Text>
                  }
                </Text>
              )
          )}
          <View style={styles.divider} />
          {!user.isStudent && (
            <TouchableOpacity
              onPress={() => navigation.navigate(routes.CLASS_EDIT, subject)}
            >
              <Text style={styles.link}>Edit Class Details</Text>
            </TouchableOpacity>
          )}
          <View style={styles.divider} />
          {!user.isStudent && (
            <TouchableOpacity
              onPress={() => navigation.navigate(routes.SCHEDULE_EDIT, subject)}
            >
              <Text style={styles.link}>Edit Class Schedule</Text>
            </TouchableOpacity>
          )}
          <View style={styles.divider} />
        </View>
      </ScrollView>
    </Screen>
  );
};

export default ClassDetailsScreen;
