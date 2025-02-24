import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDeBAqbYbQSoDYruvYZ_cVdJ8dbfOTGRRE",
  authDomain: "vatelanka-e6828.firebaseapp.com",
  projectId: "vatelanka-e6828",
  storageBucket: "vatelanka-e6828.firebasestorage.app",
  messagingSenderId: "444350594980",
  appId: "1:444350594980:web:38660abe178b78750b4b31",
  measurementId: "G-0C4KQG6Q61",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const firestore = getFirestore(app);
