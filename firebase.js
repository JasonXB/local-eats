import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import {
  getAuth,
  connectAuthEmulator,
  signInWithEmailAndPassword,
  signInWithPopup, // opens up a temporary tag to log in with
  signInWithRedirect, // redirects you to an oAuth page
} from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseApp = initializeApp({
  apiKey: "AIzaSyBzvpo8LhzLhTYQ9qyYZADaE-GkJV7tp38",
  authDomain: "local-eats-2e025.firebaseapp.com",
  projectId: "local-eats-2e025",
  storageBucket: "local-eats-2e025.appspot.com",
  messagingSenderId: "968368888614",
  appId: "1:968368888614:web:95fb2ef91e9512c6297fe7",
});

const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

// Create a function that logs people in with email/pass credentials
// export const loginEmailPassword = async function (email, password) {
//   const result = await signInWithEmailAndPassword(auth, email, password);
// };

// Create a function that logs users in via Google
export const loginWithGoogle = async function () {
  try {
    const result = await signInWithRedirect(auth, googleProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    console.log(token);
  } catch (error) {
    // Handle Errors here.
    alert(
      "It appears something went wrong with the Google sign up process. Please try again later"
    );
  }
};
