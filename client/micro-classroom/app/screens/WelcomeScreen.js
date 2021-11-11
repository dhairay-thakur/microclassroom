import React from "react";
import { Text, View } from "react-native";
import Button from "../components/Button";
// import routes from "../navigation/routes";
import styles from "../styles/Welcome";
import colors from "../config/colors";

function WelcomeScreen() {
  return (
    <View style={styles.background}>
      <View style={styles.logoContainer}>
        {/* <Image style={styles.logo} source={require("../assets/logo-red.png")} /> */}
        <Text style={styles.tagline}>Welcome to{"\n"}Micro - Classroom</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Button title="Login" onPress={() => {}} />
        <Button title="Register" onPress={() => {}} />
      </View>
    </View>
  );
}

export default WelcomeScreen;
