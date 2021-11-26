import { StyleSheet } from "react-native";
import colors from "../config/colors";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  modalContainer: { position: "absolute" },
  modal: { margin: 0, alignItems: "center", justifyContent: "center" },
  modalView: {
    height: 260,
    width: "86.67%",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  title: {
    paddingBottom: 8,
    fontSize: 18,
    textAlign: "center",
  },
  posting: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 24,
  },
});

export default styles;
