import { StyleSheet } from "react-native";
import colors from "../config/colors";

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 12,
    backgroundColor: colors.background,
  },
  error: {
    padding: 20,
    backgroundColor: colors.background,
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  card: {
    borderRadius: 15,
    padding: 8,
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: "hidden",
  },
  detailsContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  title: {
    fontSize: 20,
    marginBottom: 7,
  },
  divider: {
    left: "2%",
    width: "96%",
    borderColor: colors.primary,
    borderWidth: 1,
  },
  day: {
    fontSize: 18,
    marginVertical: 10,
    marginLeft: 8,
    color: colors.light,
  },
});

export default styles;
