// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDeBAqbYbQSoDYruvYZ_cVdJ8dbfOTGRRE",
  authDomain: "vatelanka-e6828.firebaseapp.com",
  projectId: "vatelanka-e6828",
  storageBucket: "vatelanka-e6828.firebasestorage.app",
  messagingSenderId: "444350594980",
  appId: "1:444350594980:web:38660abe178b78750b4b31",
  measurementId: "G-0C4KQG6Q61"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);