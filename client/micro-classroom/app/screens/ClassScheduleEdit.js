import React from "react";
import { KeyboardAvoidingView, ScrollView, View } from "react-native";
import { Form, FormScheduleEdit, SubmitButton } from "../components/forms";
import Screen from "../components/Screen";
// import listingsApi from "../api/listings";
// import AuthContext from "../auth/context";
import styles from "../styles/ClassEdit";

const ClassScheduleEdit = ({ navigation, route }) => {
  const subject = route.params;
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
      <View style={styles.modalContainer}></View>
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
          // onSubmit={handleSubmit}
          onSubmit={(v) => console.log(v)}
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
