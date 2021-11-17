import React from "react";
import {
  createNativeStackNavigator ,
  TransitionPresets,
} from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import WelcomeScreen from "../screens/WelcomeScreen";

const Stack = createNativeStackNavigator ();

const AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Welcome"
      component={WelcomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{
        gestureEnabled: false,
        ...TransitionPresets.ModalSlideFromBottomIOS,
      }}
    />
    <Stack.Screen
      name="Register"
      component={RegisterScreen}
      options={{
        gestureEnabled: false,
        ...TransitionPresets.ModalSlideFromBottomIOS,
      }}
    />
  </Stack.Navigator>
);

export default AuthNavigator;
