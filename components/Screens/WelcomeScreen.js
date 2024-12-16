import React from "react";
import { SafeAreaView, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import CustomText from "../utils/CustomText";
import { COLORS } from "../utils/Constants";
import Feather from "react-native-vector-icons/Feather";

export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Welcome Header */}
      <View style={styles.header}>
        <CustomText style={styles.welcomeText}>Welcome!</CustomText>
        <CustomText style={styles.subtitle}>How are you today?</CustomText>
      </View>

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../ApplicationAssets/logo.png")}
          style={styles.logo}
        />
        <CustomText style={styles.tagline}>For a Cleaner Sri Lanka</CustomText>
      </View>

      {/* Get Started Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("SignInSignUp")}
        activeOpacity={0.9}
      >
        <View style={styles.buttonContent}>
          <CustomText style={styles.buttonText}>Get Started</CustomText>
          <Feather name="arrow-right" style={styles.icon} />
        </View>
      </TouchableOpacity>
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
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 50,
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
