import React, { useState } from "react";
import { KeyboardAvoidingView, ScrollView, View } from "react-native";
import { Form, FormScheduleEdit, SubmitButton } from "../components/forms";
import Screen from "../components/Screen";
import Done from "../components/Done";
import ActivityIndicator from "../components/ActivityIndicator";
import Modal from "react-native-modal";
import Text from "../components/Text";
import subjectsApi from "../api/subject";
// import AuthContext from "../auth/context";
import styles from "../styles/ClassEdit";
import routes from "../navigation/routes";

const ClassScheduleEdit = ({ navigation, route }) => {
  const subject = route.params;
  // console.log(subject);

  // const { user } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (schedule, { resetForm }) => {
    setLoading(true);
    const result = await subjectsApi.updateSchedule(
      schedule,
      subject._id,
      subject.maxCapacity,
      subject.attendees.length
    );
    if (!result.ok) {
      // setModalVisible(false);
      setLoading(false);
      return alert("Could Not Add Listing");
    }
    setModalVisible(true);
    setLoading(false);
    resetForm();
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
            0: subject.schedule[0],
            1: subject.schedule[1],
            2: subject.schedule[2],
            3: subject.schedule[3],
            4: subject.schedule[4],
            5: subject.schedule[5],
            6: subject.schedule[6],
          }}
          onSubmit={handleSubmit}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <FormScheduleEdit name={0} schedule={subject.schedule[0]} />
            <FormScheduleEdit name={1} schedule={subject.schedule[1]} />
            <FormScheduleEdit name={2} schedule={subject.schedule[2]} />
            <FormScheduleEdit name={3} schedule={subject.schedule[3]} />
            <FormScheduleEdit name={4} schedule={subject.schedule[4]} />
            <FormScheduleEdit name={5} schedule={subject.schedule[5]} />
            <FormScheduleEdit name={6} schedule={subject.schedule[6]} />
            <SubmitButton title="Edit Schedule" />
          </ScrollView>
        </Form>
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default ClassScheduleEdit;
