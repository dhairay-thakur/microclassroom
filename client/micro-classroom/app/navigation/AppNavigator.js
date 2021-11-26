import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ClassEditScreen from "../screens/ClassEditScreen";
import JoinClassScreen from "../screens/JoinClassScreen";
import AccountNavigator from "./AccountNavigator";
import NewClassButton from "./NewClassButton";
import FeedNavigator from "./FeedNavigator";
import routes from "./routes";

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      safeAreaInsets: { bottom: 6 },
    }}
  >
    <Tab.Screen
      name="My Classes"
      component={FeedNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name={routes.CLASS_EDIT}
      component={ClassEditScreen}
      options={({ navigation }) => ({
        tabBarButton: () => (
          <NewClassButton
            onPress={() => navigation.navigate(routes.CLASS_EDIT)}
          />
        ),
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="plus-circle"
            color={color}
            size={size}
          />
        ),
      })}
    />
    <Tab.Screen
      name="My Account"
      component={AccountNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default AppNavigator;
