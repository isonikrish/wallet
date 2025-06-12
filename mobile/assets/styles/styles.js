import { StyleSheet } from "react-native";
export const coffeeTheme = {
  primary: "#8B593E",
  background: "#FFF8F3",
  text: "#4A3428",
  border: "#E5D3B7",
  white: "#FFFFFF",
  textLight: "#9A8478",
  expense: "#E74C3C",
  income: "#2ECC71",
  card: "#FFFFFF",
  shadow: "#000000",
};
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: coffeeTheme.background,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: coffeeTheme.text,
    marginVertical: 15,
    textAlign: "center",
  },
  input: {
    backgroundColor: "white",
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: coffeeTheme.border,
    fontSize: 16,
    color: coffeeTheme.text,
  },
  button: {
    backgroundColor: coffeeTheme.primary,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: coffeeTheme.white,
    fontWeight: "bold",
    fontSize: 16,
  },
  illustration: {
    width: 200,
    height: 300,
    resizeMode: "contain",
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
  },
  loadingContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    padding: 20,
    paddingBottom: 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 0,
    paddingVertical: 12,
  },
  headerLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
   headerLogo: {
    width: 75,
    height: 75,
  },
  welcomeContainer: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 14,
    color: coffeeTheme.textLight,
    marginBottom: 2,
  },
  usernameText: {
    fontSize: 16,
    fontWeight: "600",
    color: coffeeTheme.text,
  },
});
