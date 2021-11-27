import React, { useState, useEffect, useContext } from "react";
import Screen from "../components/Screen";
import Text from "../components/Text";
import AuthContext from "../auth/context";
import AppTextInput from "../components/TextInput";
import routes from "../navigation/routes";
import useApi from "../hooks/useApi";
import subjectApi from "../api/subject";
import colors from "../config/colors";
import AppButton from "../components/Button";
import Modal from "react-native-modal";
import Done from "../components/Done";
import ActivityIndicator from "../components/ActivityIndicator";
import { StyleSheet, View } from "react-native";

const JoinClass = ({ navigation, route }) => {
  const { user, setUser } = useContext(AuthContext);
  const [code, setCode] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const {
    data,
    error,
    loading,
    request: joinClass,
  } = useApi(subjectApi.joinClass);

  const handleSubmit = async (studentId, subjectId) => {
    setModalVisible(true);
    const result = await subjectApi.joinClass(studentId, subjectId);
    if (!result.ok) {
      setModalVisible(false);
      return alert("Could Not Add");
    }
  };

  return (
    <Screen style={styles.container}>
      <View style={styles.modalContainer}>
        <Modal
          useNativeDriver
          backdropOpacity={0.5}
          isVisible={modalVisible}
          style={styles.modal}
          onBackButtonPress={() => setModalVisible(false)}
        >
          <View style={styles.modalView}>
            <Done
              onAnimationFinish={() => {
                setModalVisible(false);
              }}
            />
            <ActivityIndicator visible={!loading && !error} />
          </View>
        </Modal>
      </View>
      <AppTextInput
        selectionColor={colors.secondary}
        onChangeText={(enteredCode) => setCode(enteredCode)}
        width="100%"
        placeholder="Enter Class Code"
      />
      <AppButton
        title="Join Class"
        onPress={() => {
          handleSubmit(user.userId, code);
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
  modalContainer: { position: "absolute" },
  modal: { margin: 0, alignItems: "center", justifyContent: "center" },
  modalView: {
    height: 260,
    width: "86.67%",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
});

export default JoinClass;
