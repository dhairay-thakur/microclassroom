import React, { useState } from "react";
import Screen from "../components/Screen";
import Text from "../components/Text";
import AppTextInput from "../components/TextInput";
import routes from "../navigation/routes";
// import routes from "../navigation/routes";
// import useApi from "../hooks/useApi";
// import usersApi from "../api/users";
import colors from "../config/colors";
import AppButton from "../components/Button";
import { StyleSheet } from "react-native";

const ClassDetailsScreen = ({ navigation, route }) => {
  const [code, setCode] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  // const { data, error, loading, request: loadUserDetails } = useApi(
  //   usersApi.getUserDetails
  // );
  // useEffect(() => {
  //   loadUserDetails(subject.userId);
  // }, []);

  return (
    <Screen style={styles.container}>
      <AppTextInput
        selectionColor={colors.secondary}
        onChangeText={(enteredCode) => setCode(enteredCode)}
        width="100%"
        placeholder="Enter Class Code"
      />
      <AppButton
        title="Join Class"
        onPress={() => {
          console.log(code);
        }}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: "center",
  },
});

export default ClassDetailsScreen;
