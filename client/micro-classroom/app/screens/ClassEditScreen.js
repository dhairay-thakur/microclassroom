import React, { useState, useContext } from "react";
import { KeyboardAvoidingView, View, ScrollView } from "react-native";
import * as Yup from "yup";

import { Form, FormField, SubmitButton } from "../components/forms";
import Done from "../components/Done";
import ActivityIndicator from "../components/ActivityIndicator";
import Screen from "../components/Screen";
import Modal from "react-native-modal";
import subjectsApi from "../api/subject";
import Text from "../components/Text";
import AuthContext from "../auth/context";
import AppTextInput from "../components/TextInput";
import colors from "../config/colors";
import AppButton from "../components/Button";
import styles from "../styles/ClassEdit";
import routes from "../navigation/routes";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(1).label("Subject Name"),
  maxCapacity: Yup.number().required().min(1).label("Max Capacity"),
  meetLink: Yup.string().min(1).label("Meeting Link"),
  description: Yup.string().label("Description"),
});

const ClassEditScreen = ({ navigation, route }) => {
  const subject = route.params;
  const { user } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");

  const handleSubmitJoin = async (studentId, subjectId) => {
    setModalVisible(true);
    const result = await subjectsApi.joinClass(studentId, subjectId);
    if (!result.ok) {
      setModalVisible(false);
      return alert("nahi hua");
    }
  };
  const handleSubmit = async (classDetails, { resetForm }) => {
    setLoading(true);
    let result;
    if (subject) {
      result = await subjectsApi.editClass(classDetails, subject._id);
    } else {
      result = await subjectsApi.createClass(classDetails, user.userId);
    }
    if (!result.ok) {
      setLoading(false);
      return alert("Could Not Add Subject");
    }
    resetForm();
    setModalVisible(true);
  };
  return (
    <Screen style={styles.container}>
      {subject && <Text style={styles.title}>{subject.name}</Text>}
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
                navigation.navigate(routes.Classes);
              }}
            />
          </View>
        </Modal>
        <ActivityIndicator visible={loading} />
      </View>
      {user.isStudent && (
        <View>
          <AppTextInput
            selectionColor={colors.secondary}
            onChangeText={(enteredCode) => setCode(enteredCode)}
            width="100%"
            placeholder="Enter Class Code"
          />
          <AppButton
            title="Join Class"
            onPress={() => {
              handleSubmitJoin(user.userId, code);
            }}
          />
        </View>
      )}
      {!user.isStudent && (
        <KeyboardAvoidingView>
          <Form
            initialValues={{
              name: "",
              meetLink: "",
              description: "",
              maxCapacity: 1,
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              <FormField
                maxLength={255}
                name="name"
                placeholder="Subject Name"
              />
              <FormField name="meetLink" placeholder="Meeting Link" />
              <FormField name="maxCapacity" placeholder="Maximum Capacity" />
              <FormField
                maxLength={255}
                multiline
                name="description"
                numberOfLines={3}
                placeholder="Description"
              />
              <SubmitButton title="Create Class" />
            </ScrollView>
          </Form>
        </KeyboardAvoidingView>
      )}
    </Screen>
  );
};

export default ClassEditScreen;
