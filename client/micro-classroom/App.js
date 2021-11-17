import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import navigationTheme from "./app/navigation/navigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";
// import AuthNavigator from "./app/navigation/AuthNavigator";
// import AuthContext from "./app/auth/context";
import LoginScreen from "./app/screens/LoginScreen";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import RegisterScreen from "./app/screens/RegisterScreen";
import ClassDetailsScreen from "./app/screens/ClassDetailsScreen";
import ClassEditScreen from "./app/screens/ClassEditScreen";
import AccountScreen from "./app/screens/AccountScreen";

export default function App() {
  return (
    // <View style={styles.container}>
    //   <AccountScreen />
    //   <StatusBar style="auto" />
    // </View>
    <NavigationContainer theme={navigationTheme}>
      <AppNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
