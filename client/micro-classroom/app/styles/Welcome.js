import { StyleSheet } from "react-native";
import colors from "../config/colors";
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: colors.dark,
  },
  buttonsContainer: {
    padding: 20,
    width: "100%",
  },
  logo: {
    width: 100,
    height: 100,
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
    justifyContent: "center",
  },
  tagline: {
    fontSize: 36,
    fontWeight: "600",
    paddingVertical: 20,
    textAlign: "center",
    color: colors.light,
  },
  radioButton: {
    fontSize: 25,
    color: "blue",
    fontWeight: "600",
    paddingVertical: 20,
    textAlign: "center",
  },
});

export default styles;
