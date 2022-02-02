import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
console.log(process.env.FIREBASE_API_KEY);
const firebaseApp = initializeApp({
  apiKey: "AIzaSyBzvpo8LhzLhTYQ9qyYZADaE-GkJV7tp38",
  authDomain: "local-eats-2e025.firebaseapp.com",
  projectId: "local-eats-2e025",
  storageBucket: "local-eats-2e025.appspot.com",
  messagingSenderId: "968368888614",
  appId: "1:968368888614:web:95fb2ef91e9512c6297fe7"
  
  // apiKey: String(process.env.FIREBASE_API_KEY),
  // authDomain: "local-eats-2e025.firebaseapp.com",
  // projectId: "local-eats-2e025",
  // storageBucket: "local-eats-2e025.appspot.com",
  // messagingSenderId: String(process.env.FIREBASE_MESSAGING_SENDER_ID),
  // appId: String(process.env.FIREBASE_APP_ID),
});

// Will be needing this as a parameter for other auth-related utility functions
export const auth = getAuth(firebaseApp);

// Use to verify login status and save data upon login
auth.onAuthStateChanged((user) => {
  // user equals null when we aren't logged in
  !user
    ? console.log("User is NOT currently logged in")
    : console.log("User is currently logged in");
  console.log(user);
});
