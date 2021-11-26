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
// import AuthContext from "../auth/context";

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
  // const { user } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(subject);
  const handleSubmit = async (classDetails, { resetForm }) => {
    setLoading(true);
    let result;
    if (subject) {
      result = await subjectsApi.editClass(classDetails, subject._id);
    } else {
      result = await subjectsApi.createClass(
        classDetails,
        "619dca7d06bf9e0ca61646cc"
      );
    }
    if (!result.ok) {
      setLoading(false);
      return alert("Could Not Add Listing");
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
            <FormField maxLength={255} name="name" placeholder="Subject Name" />
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
    </Screen>
  );
};

export default ClassEditScreen;
