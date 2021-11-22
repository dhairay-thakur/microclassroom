import DateTimePicker from "@react-native-community/datetimepicker";
import { useFormikContext } from "formik";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { string } from "yup/lib/locale";
import colors from "../../config/colors";
import Text from "../Text";
import ErrorMessage from "./ErrorMessage";

const DayNames = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const FormScheduleEdit = ({ name, schedule }) => {
  const { errors, touched, values, setFieldValue } = useFormikContext();
  const [timeStart, setTimeStart] = useState(schedule[0] || null);
  const [timeEnd, setTimeEnd] = useState(schedule[1] || null);
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);

  const updateState = () => {
    if (timeStart && timeEnd)
      setFieldValue(name, [
        displayCurrentTime(timeStart),
        displayCurrentTime(timeEnd),
      ]);
  };
  useEffect(updateState, [timeStart, timeEnd]);
  const onChangeStart = (event, selectedTime) => {
    const currentTime = selectedTime || timeStart;
    setShowStart(Platform.OS === "ios");
    setTimeStart(currentTime);
  };
  const onChangeEnd = (event, selectedTime) => {
    const currentTime = selectedTime || timeEnd;
    setShowEnd(Platform.OS === "ios");
    setTimeEnd(currentTime);
    updateState();
  };
  const showTimepickerStart = () => {
    setShowStart(true);
  };
  const showTimepickerEnd = () => {
    setShowEnd(true);
  };

  const displayCurrentTime = (date) => {
    if (!date) return "-";
    if (typeof date === "string" && date[2] === ":") return date;
    const hours =
      date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    const minutes =
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    const time = hours + ":" + minutes;
    return time;
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.weekday}>{DayNames[name]}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={showTimepickerStart}
          activeOpacity={0.5}
        >
          <View>
            <Text style={styles.text}>{displayCurrentTime(timeStart)}</Text>
            {showStart && (
              <DateTimePicker
                value={new Date()}
                mode={"time"}
                onChange={onChangeStart}
              />
            )}
            <Text style={styles.text}>Start</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={showTimepickerEnd}
          activeOpacity={0.5}
        >
          <View>
            <Text style={styles.text}>{displayCurrentTime(timeEnd)}</Text>
            {showEnd && (
              <DateTimePicker
                value={new Date()}
                mode={"time"}
                onChange={onChangeEnd}
              />
            )}
            <Text style={styles.text}>End</Text>
          </View>
        </TouchableOpacity>
      </View>
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 4,
    width: "25%",
    borderRadius: 10,
    borderColor: colors.secondary,
    borderWidth: 1,
    margin: 10,
  },
  container: {
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  text: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  weekday: {
    color: colors.secondary,
    fontSize: 16,
    width: "30%",
    fontWeight: "bold",
  },
});

export default FormScheduleEdit;
