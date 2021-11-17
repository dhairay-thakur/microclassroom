import React, { useState, useContext } from "react";
import { KeyboardAvoidingView, View, ScrollView } from "react-native";
import * as Yup from "yup";

import { Form, FormField, SubmitButton } from "../components/forms";
import Done from "../components/Done";
import ActivityIndicator from "../components/ActivityIndicator";
import Screen from "../components/Screen";
import Modal from "react-native-modal";
// import listingsApi from "../api/listings";
// import AuthContext from "../auth/context";

import styles from "../styles/ClassEdit";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(1).label("Subject Name"),
  maxCapacity: Yup.number().required().min(1).label("Max Capacity"),
  meetLink: Yup.string().min(1).label("Meeting Link"),
  description: Yup.string().label("Description"),
});

const ClassEditScreen = () => {
  // const { user } = useContext(AuthContext);

  // const [progress, setProgress] = useState(0);
  // const [modalVisible, setModalVisible] = useState(false);

  // const handleSubmit = async (listing, { resetForm }) => {
  //   setModalVisible(true);
  //   const result = await listingsApi.addListing(
  //     listing,
  //     user.userId,
  //     (progress) => setProgress(progress)
  //   );
  //   if (!result.ok) {
  //     setModalVisible(false);
  //     return alert("Could Not Add Listing");
  //   }
  //   resetForm();
  // };
  return (
    <Screen style={styles.container}>
      <View style={styles.modalContainer}>
        {/* <Modal
          useNativeDriver
          backdropOpacity={0.5}
          isVisible={modalVisible}
          style={styles.modal}
          onBackButtonPress={() => setModalVisible(false)}
        >
          <View style={styles.modalView}>
            {progress === 1 && (
              <Done
                onAnimationFinish={() => {
                  setModalVisible(false);
                }}
              />
            )}
            <ActivityIndicator visible={progress !== 1} />
          </View>
        </Modal> */}
      </View>
      <KeyboardAvoidingView>
        <Form
          initialValues={{
            name: "",
            meetLink: "",
            description: "",
            maxCapacity: 1,
          }}
          // onSubmit={handleSubmit}
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
