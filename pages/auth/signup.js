import axios from "axios";
import { useRouter } from "next/router";
import React, { useRef, useState, useReducer } from "react";
import { Typography, Stack, Button, Box } from "@mui/material"; // prettier-ignore
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import { mix } from "../../styles/styleMixins";
import { getSession } from "next-auth/react";
import AuthHeader from "../../src/page-blocks/authForms/HeaderHelper";
import GeneralErrorModal from "../../src/custom-components/Modals/GeneralError"
import GuestBtn from "../../src/custom-components/GuestBtn"
// Redirect users to homepage if they come here online
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req }); // falsy if not logged in. session obj if we are
  if (session) {
    return {
      redirect: {
        destination: "/", // if online, redirect home
        permanent: false, // don't always want to redirect (only if user's logged in)
      },
    };
  }
  return { props: { session } };
}

export default function signup() {
  const router = useRouter();
  // Control the form using state values
  const [formState, dispatch] = useReducer(reducer, {
    emailText: " ", // allots space for the message before we even want one to be visible
    emailError: false,
    passwordText: " ",
    passwordError: false,
    verifyPasswordText: " ",
    verifyPasswordError: false,
    passwordRequirements: false,
  });

  // Collect values of what's typed in each of the input fields
  const emailRef = useRef();
  const passwordRef = useRef();
  const verifyPasswordRef = useRef();

  // Whenever the user types something, reset the error state in that input field
  // Check to see if an error state is active first (don't want to redefine state multiple times for no reason)
  const typingEmailHandler = () =>  formState.emailError && dispatch({ type: "RESET" }); // prettier-ignore
  const typingPasswordHandler = () => formState.passwordError && dispatch({ type: "RESET" }); // prettier-ignore
  const typingVerifyHandler = () => formState.verifyPasswordError && dispatch({ type: "RESET" }); // prettier-ignore

  // Control the general error modal should open if one of our API route 3rd party services fail
  const [modalVisible, setModalVisible] = React.useState(false);
  const revealErrorModal = () => setModalVisible(true);


  const submitHandler = async function () {
    // Reset the form state to remove any error visuals that were required earlier
    dispatch({ type: "RESET" });
    // Capture what's typed in each input field
    const typedEmail = emailRef.current.value;
    const typedPassword = passwordRef.current.value;
    const typedPassword2 = verifyPasswordRef.current.value;

    // Make sure each field is filled in
    const emailLength = typedEmail.replaceAll(" ", "").length;
    const passwordLength = typedPassword.replaceAll(" ", "").length;
    const verifyPasswordLength = typedPassword2.replaceAll(" ", "").length;
    if(!emailLength) return dispatch({type: "INVALID_EMAIL", payload: "This field is required"}); // prettier-ignore
    if(!passwordLength) return dispatch({type: "INVALID_PASSWORD", payload: "This field is required"}); // prettier-ignore
    if(!verifyPasswordLength) return dispatch({type: "INVALID_PASSWORD_2", payload: "This field is required"}); // prettier-ignore

    // Make a request to an API route to verify or discredit the form submissions
    try {
      await axios.post("/api/auth/signupP1", {
        email: typedEmail,
        password: typedPassword,
        verifyPassword: typedPassword2,
      });
      // Save the signup email and password to localStorage
      localStorage.setItem("pendingAccountEmail", typedEmail);
      localStorage.setItem("signupPassword", typedPassword);
      router.push("/auth/verify-email"); // redirect
      return;
    } catch (error) {
      if(!error.response || !error.response.data) return revealErrorModal();
      const errorMSG = error.response.data.message;
      switch (errorMSG) {
        case "This password does not match the first":
          dispatch({type: "INVALID_PASSWORD_2", payload: errorMSG}); // prettier-ignore
          break;
        case "Invalid email":
          dispatch({type: "INVALID_EMAIL", payload: errorMSG}); // prettier-ignore
          break;
        case "This email is tied to a verified account":
          dispatch({ type: "INVALID_EMAIL", payload: errorMSG });
          break;
        case "Password does not meet requirements":
          dispatch({ type: "INVALID_PASSWORD", payload: errorMSG });
          break;
        default:
          revealErrorModal(); 
          // render general error modal if the failed response message is something other than the options we provided
          // should only happen when one of our 3rd party services fail (SendGrid, MongoDB...etc)
          break; 
      }
      return;
    }
  };

  

  return (
    <Stack sx={styles.parentContainer}>
      <AuthHeader
        titleText={"Sign Up"}
        descriptionText={"Sign up and gain access to bookmarks plus any new features upon release!"} // prettier-ignore
      />
      <FormControl sx={styles.formControl}>
        <Typography
          align="left"
          variant="label"
          sx={ formState.emailError ? styles.conditionalRed(true) : styles.conditionalRed(false) } // prettier-ignore
        >
          User Email:
        </Typography>
        <OutlinedInput
          inputRef={emailRef}
          placeholder="name@email.com"
          error={formState.emailError}
          onChange={typingEmailHandler}
        />
        <FormHelperText sx={styles.formHelperText}>
          {formState.emailText}
        </FormHelperText>
      </FormControl>
      <FormControl sx={styles.formControl}>
        <Typography
          align="left"
          variant="label"
          sx={ formState.passwordError ? styles.conditionalRed(true) : styles.conditionalRed(false) } // prettier-ignore
        >
          Password:
        </Typography>
        <OutlinedInput
          inputRef={passwordRef}
          placeholder="Enter password"
          type="password"
          error={formState.passwordError}
          onChange={typingPasswordHandler}
        />
        <FormHelperText sx={styles.formHelperText}>
          {formState.passwordText}
        </FormHelperText>
      </FormControl>
      <FormControl sx={styles.formControl}>
        <Typography
          align="left"
          variant="label"
          sx={ formState.verifyPasswordError ? styles.conditionalRed(true) : styles.conditionalRed(false) } // prettier-ignore
        >
          Verify Password:
        </Typography>
        <OutlinedInput
          inputRef={verifyPasswordRef}
          placeholder="Enter password again"
          type="password"
          error={formState.verifyPasswordError}
          onChange={typingVerifyHandler}
        />
        <FormHelperText sx={styles.formHelperText}>
          {formState.verifyPasswordText}
        </FormHelperText>
      </FormControl>
      
      <Button
        variant="contained"
        disableElevation
        onClick={submitHandler}
        sx={{ width: "80%", maxWidth: "20.625rem" }}
      >
        Sign up to Local Eats
      </Button>
      <Button
        disableElevation
        variant="outlined"
        href="/auth/signin"
        sx={{ width: "80%", maxWidth: "20.625rem", mt: 2 }}
      >
        Have an account? Sign in!
      </Button>
      <GuestBtn/>
      <Stack sx={{mt:4}}>
        <Typography variant="p">PASSWORD REQUIREMENTS</Typography>
        <Typography variant="p">
          Must be 8 characters or longer. Requires an uppercase, lowercase, plus
          at least 1 symbol. No punctuation allowed
        </Typography>
      </Stack>
      <GeneralErrorModal modalVisible={modalVisible}/>
    </Stack>
  );
}

function reducer(state, action) {
  switch (action.type) {
    case "INVALID_EMAIL":
      return {
        emailText: action.payload,
        emailError: true,
        // Reset other states back to init value
        passwordText: " ",
        passwordError: false,
        verifyPasswordText: " ",
        verifyPasswordError: false,
        passwordRequirements: false,
      };
    case "INVALID_PASSWORD":
      return {
        passwordText: action.payload,
        passwordError: true,
        passwordRequirements: true,
        // Reset other states back to init value
        emailText: " ",
        emailError: false,
        verifyPasswordText: " ",
        verifyPasswordError: false,
      };
    case "INVALID_PASSWORD_2":
      return {
        verifyPasswordText: action.payload,
        verifyPasswordError: true,
        // Reset other states back to init value
        emailText: " ",
        emailError: false,
        passwordText: " ",
        passwordError: false,
        passwordRequirements: false,
      };
    case "RESET":
      return {
        emailText: " ",
        emailError: false,
        passwordText: " ",
        passwordError: false,
        verifyPasswordText: " ",
        verifyPasswordError: false,
        passwordRequirements: false,
      };
    default:
      return;
  }
}

const styles = {
  parentContainer: {
    width: "100%",
    height: "100vh",
    maxWidth: "35rem",
    margin: "auto",
    textAlign: "center",
    // border: "5px solid black",
    ...mix.flexColumn,
    justifyContent: "center",
  },
  formControl: {
    width: "80%",
    maxWidth: "20.625rem",
    mb: 1.5,
    fontWeight: 500,
  },
  formHelperText: {
    color: "#d32f2f",
    m: 0,
    mt: 0.5,
  },
  conditionalRed: (inp) => {
    if(inp) return { color: "#d32f2f" } // prettier-ignore
    if(!inp) return { color: "rgba(0, 0, 0, 0.87)" } // prettier-ignore
  },
};
