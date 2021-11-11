import React, { useContext, useState } from "react";
import * as Yup from "yup";

import Screen from "../components/Screen";
import {
  Form,
  FormField,
  SubmitButton,
  ErrorMessage,
} from "../components/forms";

// import jwtDecode from "jwt-decode";
// import authApi from "../api/auth";
// import AuthContext from "../auth/context";
// import authStorage from "../auth/storage";

import styles from "../styles/Register";
import { ScrollView } from "react-native-gesture-handler";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  hostel: Yup.string().required().label("Hostel"),
  room: Yup.string().required().label("Room No."),
  email: Yup.string().required().email().label("Email"),
  mobileNumber: Yup.string().required().label("Mobile Number").length(10),
  password: Yup.string().required().min(4).label("Password"),
});

const RegisterScreen = () => {
  // const authContext = useContext(AuthContext);
  const [error, setError] = useState(false);
  const handleSubmit = async (userInfo) => {
    // const result = await authApi.register(userInfo);
    // if (!result.ok) {
    //   console.log(result);
    //   return setError(true);
    // }
    // setError(false);
    // const { data: authToken } = await authApi.login(
    //   userInfo.email,
    //   userInfo.password
    // );
    // const user = jwtDecode(authToken.token);
    // authContext.setUser(user);
    // authStorage.storeToken(authToken.token);
  };
  return (
    <Screen style={styles.container}>
      <Form
        initialValues={{ name: "", email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <ErrorMessage error="Could Not SignUp" visible={error} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <FormField
            autoCorrect={false}
            icon="account"
            name="name"
            placeholder="Name"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            name="email"
            placeholder="Email"
            textContentType="emailAddress"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="password"
            placeholder="Password"
            secureTextEntry
            textContentType="password"
          />
          <FormField
            autoCorrect={false}
            keyboardType="number-pad"
            textContentType="telephoneNumber"
            icon="phone"
            name="mobileNumber"
            placeholder="Mobile Number"
          />
          <FormField
            autoCorrect={false}
            autoCapitalize="sentences"
            icon="school"
            name="hostel"
            placeholder="Hostel"
          />
          <FormField
            autoCorrect={false}
            icon="home"
            name="room"
            placeholder="Room Number"
          />
          <SubmitButton title="Register" />
        </ScrollView>
      </Form>
    </Screen>
  );
};

export default RegisterScreen;
