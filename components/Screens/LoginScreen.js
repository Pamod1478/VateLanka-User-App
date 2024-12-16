import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { loginWithEmail, sendPasswordReset } from "../services/firebaseAuth";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Login Function
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }
    try {
      await loginWithEmail(email, password);
      Alert.alert("Success", "Login successful!");
      // Navigate to the main screen (replace 'HomeScreen' with your actual screen)
      navigation.navigate("HomeScreen");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  // Navigate to Forgot Password Screen
  const handleForgotPassword = () => {
    if (!email) {
      Alert.alert("Input Required", "Please enter your email to reset your password.");
      return;
    }
    sendPasswordReset(email)
      .then(() => Alert.alert("Success", "Password reset email sent!"))
      .catch((error) => Alert.alert("Error", error.message));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Forgot Password */}
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.linkText}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Navigate to Signup */}
      <TouchableOpacity onPress={() => navigation.navigate("SignupScreen")}>
        <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 28, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 12, marginBottom: 15, borderRadius: 8 },
  button: { backgroundColor: "#34A853", padding: 12, borderRadius: 8, alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  linkText: { color: "#34A853", textAlign: "center", marginTop: 10 },
});
