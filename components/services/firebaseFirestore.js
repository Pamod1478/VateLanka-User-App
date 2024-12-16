import { firestore } from "../utils/firebaseConfig";
import { collection, getDocs, query, where, doc, setDoc, serverTimestamp } from "firebase/firestore";

// Save user data to Firestore
export const saveUserData = async (uid, userData) => {
  try {
    const userRef = doc(firestore, "users", uid);
    await setDoc(userRef, {
      ...userData,
      createdAt: serverTimestamp(), // Add a timestamp
    });
  } catch (error) {
    console.error("Error saving user data:", error);
    throw error;
  }
};

// Fetch enabled municipal councils
export const fetchMunicipalCouncils = async () => {
  const councilsRef = collection(firestore, "municipalCouncils");
  const q = query(councilsRef, where("isEnabled", "==", true)); // Fetch only enabled councils
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
