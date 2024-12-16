import React from "react";
import { Text, StyleSheet } from "react-native";

export default function CustomText({ children, style, ...props }) {
  return <Text style={[styles.defaultText, style]} {...props}>{children}</Text>;
}

const styles = StyleSheet.create({
  defaultText: {
    fontFamily: "Poppins_400Regular",
    color: "#000000",
  },
});
