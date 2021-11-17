import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";

import ListItem from "../components/ListItem";
import Text from "../components/Text";
import Button from "../components/Button";
import Screen from "../components/Screen";
import Modal from "react-native-modal";
import Icon from "../components/Icon";

// import routes from "../navigation/routes";

// import useApi from "../hooks/useApi";
// import usersApi from "../api/users";

import styles from "../styles/ClassDetails";
import colors from "../config/colors";
import ActivityIndicator from "../components/ActivityIndicator";
import Schedule from "../components/Schedule";

const subject = {
  id: 0,
  teacher: "6192c1e9032a756e2ab71bd4",
  name: "CS101",
  description: "this is a test class",
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
};

const ClassDetailsScreen = ({ navigation, route }) => {
  // const subject = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  // const { data, error, loading, request: loadUserDetails } = useApi(
  //   usersApi.getUserDetails
  // );
  // useEffect(() => {
  //   loadUserDetails(subject.userId);
  // }, []);

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{subject.name}</Text>
          <Text style={styles.description}>{subject.description}</Text>
          <View style={styles.divider} />
          <Text style={styles.link}>Join Class {subject.meetLink}</Text>
          <View style={styles.divider} />
          <Text style={styles.schedule}>Roster</Text>
          <Schedule schedule={subject.schedule} />
        </View>
      </ScrollView>
    </Screen>
  );
};

export default ClassDetailsScreen;
