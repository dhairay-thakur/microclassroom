import React from "react";
import { useFormikContext } from "formik";

import TextInput from "../TextInput";
import ErrorMessage from "./ErrorMessage";
import { TouchableWithoutFeedback, View } from "react-native";

import colors from "../../config/colors";

const AppFormField = ({ name, width, ...otherProps }) => {
  const {
    setFieldTouched,
    errors,
    touched,
    values,
    setFieldValue,
  } = useFormikContext();

  return (
    <>
      <TextInput
        selectionColor={colors.secondary}
        onBlur={() => setFieldTouched(name)}
        values={values[name]}
        onChangeText={(text) => setFieldValue(name, text)}
        width={width}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};

export default AppFormField;
