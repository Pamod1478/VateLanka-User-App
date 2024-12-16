import React from "react";
import {
  SafeAreaView,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { COLORS } from "../utils/Constants";
import CustomText from "../utils/CustomText";
import Feather from "react-native-vector-icons/Feather";

export default function SignInSignUpScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Welcome Header */}
      <View style={styles.header}>
        <CustomText style={styles.welcomeText}>Welcome!</CustomText>
        <CustomText style={styles.subtitle}>How are you today?</CustomText>
      </View>

      {/* Logo */}+
      <View style={styles.logoContainer}>
        <Image
          source={require("../ApplicationAssets/logo.png")}
          style={styles.logo}
        />
        <CustomText style={styles.tagline}>For a Cleaner Sri Lanka</CustomText>
      </View>

      {/* Sign Up and Login Buttons */}
      <View style={styles.buttonContainer}>
        {/* Sign Up Button */}
        <TouchableOpacity
          style={styles.button}

          onPress={() => navigation.navigate("SignupScreen")}
          activeOpacity={0.9}
        >
          <View style={styles.buttonContent}>
            <CustomText style={styles.buttonText}>Sign Up</CustomText>
            <Feather name="user-plus" style={styles.icon} />
          </View>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("LoginScreen")}
          activeOpacity={0.9}
        >
          <View style={styles.buttonContent}>
            <CustomText style={styles.buttonText}>Login</CustomText>
            <Feather name="log-in" style={styles.icon} />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginTop: 50,
  },
  welcomeText: {
    fontSize: 40,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.primary,
    marginTop: 3,
    fontWeight: "500",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 40,
  },
  logo: {
    width: 250,
    height: 120,
    marginVertical: 20,
  },
  tagline: {
    fontSize: 16,
    color: COLORS.primary,
    marginTop: 1,
    fontWeight: "500",
  },
  buttonContainer: {
    width: "70%",
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.white,
    marginRight: 8,
  },
  icon: {
    fontSize: 18,
    color: COLORS.white,
  },
});
