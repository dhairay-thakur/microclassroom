import React from "react";
import {
  createNativeStackNavigator,
  TransitionPresets,
} from "@react-navigation/native-stack";
import AccountScreen from "../screens/AccountScreen";
import MySchedule from "../screens/MyScheduleScreen";

const Stack = createNativeStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Account" component={AccountScreen} />
    <Stack.Screen name="My Schedule" component={MySchedule} />
  </Stack.Navigator>
);

export default AccountNavigator;
