// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyANBEZn0EZiP1daY0rJUxXlyg_uJFlH9e4",
  authDomain: "crwn-clothing-db-b7395.firebaseapp.com",
  projectId: "crwn-clothing-db-b7395",
  storageBucket: "crwn-clothing-db-b7395.appspot.com",
  messagingSenderId: "86694755553",
  appId: "1:86694755553:web:3f4241f83d57488188cba0",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// * Authorization section
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

// Sign in with Google
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

// * Database Section
export const db = getFirestore();
// Create users
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  // Check if user exists, if not then set them in the doc
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("Error creating the user", error.message);
    }
  }

  return userDocRef;
};

// Create User with Email and Password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};
