import React from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import { COLORS } from "../utils/Constants";
import CustomText from "../utils/CustomText";

export function RecycleScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <CustomText style={styles.heading}>Recycle</CustomText>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: "600",
    color: COLORS.primary,
  },
});
