import { auth } from "./firebase";
import { signInWithRedirect, GoogleAuthProvider } from "firebase/auth";

// Logs users in via Google authentication
const googleProvider = new GoogleAuthProvider();

export const login_Google = async function () {
  try {
    const result = await signInWithRedirect(auth, googleProvider);
    // Past this point, the user will be logged in

    // This gives you a Google Access Token. You can use it to access Google APIs.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    console.log(token);
    //! probably want to save this to global state
  } catch (error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    //! error handle properly with a modal or something
  }
};
