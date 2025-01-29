import { auth } from "../utils/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";

// Sign up a user
export const signUpWithEmail = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Send email verification
    await sendEmailVerification(user);

    // Important: Sign out immediately after signup
    await auth.signOut();

    return user;
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      throw new Error("This email is already registered. Please login.");
    }
    throw error;
  }
};

// Log in a user
export const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    if (!user.emailVerified) {
      await auth.signOut();
      throw new Error("Invalid email or password.");
    }

    return user;
  } catch (error) {
    throw new Error("Invalid email or password.");
  }
};

// Send password reset email
export const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    throw new Error(
      "Failed to send reset email. Please check your email address."
    );
  }
};
