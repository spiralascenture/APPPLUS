import { StyleSheet } from "react-native";

export const layoutStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 18,
    paddingRight: 18,
    paddingTop: 14,
    paddingBottom: 22,
    alignItems: "center",
  },
  layoutBar: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
});
