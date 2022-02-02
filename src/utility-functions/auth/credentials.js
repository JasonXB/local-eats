import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebase"; // a required argument

//! First, check if the email is currently being used in the FirebaseDB
// If it is, render a message saying the email's in use below the email field
// If not, proceed to send a verification email to prove that the person's email is theirs

// Submit request to firebase, and finally create an account

// Make a new account using email/password
export const signup_EmailPassword = async function (email, password) {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;
  } catch (error) {
    // Firebase will automatically throw an error if the email's in use already 
    // (or if something else goes wrong)
    const errorCode = error.code;
    const errorMessage = error.message;
    if (errorCode == "auth/email-already-in-use") {
      alert("This email is linked to an existing account"); 
      //! render text underneath the user email field instead
      return;
    }
    alert(errorCode)
  }
  // If the new account was created, the user gets signed in automatically
  //! re route to homepage
};

// Log in users with an existing email/password account
export const login_EmailPassword = async function (email, password) {
  try {
    const result = signInWithEmailAndPassword(auth, email, password);
    // Past this point, the user will be signed in
    const user = userCredential.user;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    //! error handle properly with a modal or something
  }
};
