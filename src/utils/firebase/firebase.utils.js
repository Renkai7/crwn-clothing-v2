// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
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
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// * Database Section
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);

  // Check if user exists, if not then set them in the doc
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("Error creating the user", error.message);
    }
  }

  return userDocRef;
};
