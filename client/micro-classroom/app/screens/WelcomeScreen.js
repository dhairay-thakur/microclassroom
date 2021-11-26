import React, { useState } from "react";
import { Text, View } from "react-native";
import Button from "../components/Button";
// import routes from "../navigation/routes";
import styles from "../styles/Welcome";
import colors from "../config/colors";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import routes from "../navigation/routes";

let options = [
  { label: "Student", value: 0 },
  { label: "Teacher", value: 1 },
];

const WelcomeScreen = ({ navigation }) => {
  const [isStudent, setIsStudent] = useState(true);
  return (
    <View style={styles.background}>
      <View style={styles.logoContainer}>
        {/* <Image style={styles.logo} source={require("../assets/logo-red.png")} /> */}
        <Text style={styles.tagline}>Welcome to{"\n"}Micro - Classroom</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <RadioForm
          style={{
            justifyContent: "center",
          }}
          radio_props={options}
          initial={0}
          formHorizontal={true}
          labelHorizontal={false}
          buttonColor={colors.secondary}
          selectedButtonColor={colors.secondary}
          onPress={(value) => {
            setIsStudent(value === 0);
          }}
        />
        <Button
          title="Login"
          onPress={() => {
            navigation.navigate(routes.LOGIN, isStudent);
          }}
        />
        <Button
          title="Register"
          onPress={() => {
            navigation.navigate(routes.REGISTER, isStudent);
          }}
        />
      </View>
    </View>
  );
};

export default WelcomeScreen;
