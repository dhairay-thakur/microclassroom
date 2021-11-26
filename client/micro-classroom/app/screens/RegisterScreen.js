import React, { useContext, useState } from "react";
import * as Yup from "yup";

import Screen from "../components/Screen";
import {
  Form,
  FormField,
  SubmitButton,
  ErrorMessage,
} from "../components/forms";

import jwtDecode from "jwt-decode";
import AuthContext from "../auth/context";
import authStorage from "../auth/storage";
import studentsApi from "../api/students";
import teachersApi from "../api/teachers";

import styles from "../styles/Register";
import { ScrollView } from "react-native-gesture-handler";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  phone: Yup.string().required().label("Mobile Number").length(10),
  password: Yup.string().required().min(4).label("Password"),
});

const RegisterScreen = ({ route }) => {
  const isStudent = route.params;
  const authApi = isStudent ? studentsApi : teachersApi;
  const authContext = useContext(AuthContext);
  const [error, setError] = useState(false);

  const handleSubmit = async (userInfo) => {
    const result = await authApi.register(userInfo);
    if (!result.ok) {
      console.log(result);
      return setError(true);
    }
    setError(false);
    const { data: authToken } = await authApi.login(
      userInfo.email,
      userInfo.password
    );
    const user = jwtDecode(authToken.token);
    authContext.setUser(user);
    authStorage.storeToken(authToken.token);
  };

  return (
    <Screen style={styles.container}>
      <Form
        initialValues={{
          name: "",
          email: "",
          password: "",
          phone: "",
        }}
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
            name="phone"
            placeholder="Mobile Number"
          />
          {isStudent && (
            <FormField
              autoCorrect={false}
              icon="school"
              name="rollNo"
              placeholder="Roll Number"
            />
          )}
          <SubmitButton title="Register" />
        </ScrollView>
      </Form>
    </Screen>
  );
};

export default RegisterScreen;
