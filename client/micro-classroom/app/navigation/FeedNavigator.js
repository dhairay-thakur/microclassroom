import React from "react";
import {
  createNativeStackNavigator,
  TransitionPresets,
} from "@react-navigation/native-stack";
import ClassesScreen from "../screens/ClassesScreen";
import ClassDetailsScreen from "../screens/ClassDetailsScreen";
import CLassScheduleEdit from "../screens/ClassScheduleEdit";
import JoinClassScreen from "../screens/JoinClassScreen";

const Stack = createNativeStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Classes" component={ClassesScreen} />
    <Stack.Screen name="Class Details" component={ClassDetailsScreen} />
    <Stack.Screen name="Edit Class Schedule" component={CLassScheduleEdit} />
  </Stack.Navigator>
);

export default FeedNavigator;
