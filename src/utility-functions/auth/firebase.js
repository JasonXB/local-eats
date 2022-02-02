import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyBzvpo8LhzLhTYQ9qyYZADaE-GkJV7tp38",
  authDomain: "local-eats-2e025.firebaseapp.com",
  projectId: "local-eats-2e025",
  storageBucket: "local-eats-2e025.appspot.com",
  messagingSenderId: "968368888614",
  appId: "1:968368888614:web:95fb2ef91e9512c6297fe7", //! hide all API keys in /local.env
});

// Will be needing this as a parameter for other auth-related utility functions
export const auth = getAuth(firebaseApp);

// Use to get confirmation via the console when someone is logged in or not
