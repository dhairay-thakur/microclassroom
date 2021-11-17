import React from "react";
import {
  createNativeStackNavigator,
  TransitionPresets,
} from "@react-navigation/native-stack";
import AccountScreen from "../screens/AccountScreen";

const Stack = createNativeStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Account" component={AccountScreen} />
  </Stack.Navigator>
);

export default AccountNavigator;
