import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Animated,
  Modal,
  ScrollView,
} from "react-native";
import { signUpWithEmail } from "../services/firebaseAuth";
import {
  saveUserData,
  fetchMunicipalCouncils,
} from "../services/firebaseFirestore";
import Icon from 'react-native-vector-icons/MaterialIcons';

const NotificationBanner = ({ message, type, visible, onHide }) => {
  const translateY = useState(new Animated.Value(-100))[0];

  useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(3000),
        Animated.timing(translateY, {
          toValue: -100,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => onHide());
    }
  }, [visible]);

  const backgroundColor = type === 'success' ? '#37B34A' : '#ff4444';

  if (!visible) return null;
  
  return (
    <Animated.View
      style={[
        styles.notificationBanner,
        { transform: [{ translateY }], backgroundColor },
      ]}
    >
      <Text style={styles.notificationText}>{message}</Text>
    </Animated.View>
  );
};

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [municipalCouncil, setMunicipalCouncil] = useState("");
  const [municipalCouncilName, setMunicipalCouncilName] = useState("Select Municipal Council");
  const [councils, setCouncils] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [notification, setNotification] = useState({
    visible: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    const loadCouncils = async () => {
      try {
        const councilList = await fetchMunicipalCouncils();
        setCouncils(councilList);
      } catch (error) {
        showNotification("Failed to load municipal councils.", "error");
      }
    };
    loadCouncils();
  }, []);

  const showNotification = (message, type) => {
    setNotification({
      visible: true,
      message,
      type,
    });
  };

  const handleSignUp = async () => {
    if (!name || !email || !password || !municipalCouncil) {
      showNotification("Please fill in all fields!", "error");
      return;
    }
    try {
      const user = await signUpWithEmail(email, password);
      await saveUserData(user.uid, { name, email, municipalCouncil });
      showNotification("Account created! Verification email sent.", "success");
      setTimeout(() => {
        navigation.navigate("SignInSignUp");
      }, 3000);
    } catch (error) {
      showNotification(error.message, "error");
    }
  };

  return (
    <View style={styles.container}>
      <NotificationBanner
        {...notification}
        onHide={() => setNotification(prev => ({ ...prev, visible: false }))}
      />
      <Image
        source={require("../ApplicationAssets/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.card}>
        <Text style={styles.title}>Sign Up</Text>
        <TextInput
          placeholder="Name"
          style={styles.input}
          placeholderTextColor="#999"
          onChangeText={setName}
        />
        <TextInput
          placeholder="Email"
          style={styles.input}
          placeholderTextColor="#999"
          keyboardType="email-address"
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          placeholderTextColor="#999"
          secureTextEntry
          onChangeText={setPassword}
        />
        
        <TouchableOpacity 
          style={styles.dropdownButton}
          onPress={() => setShowDropdown(true)}
        >
          <Text style={[
            styles.dropdownButtonText,
            municipalCouncil ? styles.dropdownButtonTextSelected : null
          ]}>
            {municipalCouncilName}
          </Text>
          <Icon name="arrow-drop-down" size={24} color="#999" />
        </TouchableOpacity>

        <Modal
          visible={showDropdown}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowDropdown(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setShowDropdown(false)}
          >
            <View style={styles.dropdownModal}>
              <ScrollView>
                {councils.map((council) => (
                  <TouchableOpacity
                    key={council.id}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setMunicipalCouncil(council.id);
                      setMunicipalCouncilName(council.name);
                      setShowDropdown(false);
                    }}
                  >
                    <Text style={styles.dropdownItemText}>{council.name}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </TouchableOpacity>
        </Modal>

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.loginTextContainer}>
          <Text style={styles.loginText}>
            Already have an account?{" "}
            <Text
              style={styles.loginLink}
              onPress={() => navigation.navigate("LoginScreen")}
            >
              Log in
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  notificationBanner: {
    position: 'absolute',
    top: 0,
    right: 20,
    left: 20,
    padding: 15,
    borderRadius: 8,
    zIndex: 1000,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  notificationText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
  },
  logo: {
    width: 150,
    height: 60,
    alignSelf: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    color: "#37B34A",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
    color: "#000",
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  dropdownButtonText: {
    color: "#999",
    fontSize: 14,
  },
  dropdownButtonTextSelected: {
    color: "#000",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  dropdownModal: {
    backgroundColor: '#fff',
    borderRadius: 8,
    maxHeight: 300,
    padding: 10,
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#000',
  },
  button: {
    backgroundColor: "#37B34A",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  loginTextContainer: {
    marginTop: 15,
    alignItems: "center",
  },
  loginText: {
    color: "#666",
    fontSize: 14,
  },
  loginLink: {
    color: "#37B34A",
    textDecorationLine: "none",
  },
});