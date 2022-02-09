import React, { useRef, useState, useEffect, useReducer } from "react";
import { Typography, Box, Stack, Button, TextField, InputLabel } from "@mui/material"; // prettier-ignore
import { useRouter } from "next/router";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import AuthHeader from "../../src/page-blocks/authForms/Header";
import FormHelperText from "@mui/material/FormHelperText";
import { mix } from "../../styles/styleMixins";
import { credentialSignIn } from "../api/helperFunctions/credentialSignIn";
import { getSession } from "next-auth/react";

// Redirect users to homepage if they come here offline
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req }); // falsy if not logged in. session obj if we are
  if (!session) {
    return {
      redirect: {
        destination: "/", // redirect to this path
        permanent: false, // don't always want to redirect (only if user's logged in)
      },
    };
  }
  return { props: { session } };
}

function reducer(state, action) {
  switch (action.type) {
    // Actions to take when the user submits a bad input for a field
    case "INVALID_OLD_PASSWORD":
      return { ...state, oldPasswordText: "Incorrect account password", oldPasswordError: true }; // prettier-ignore
    case "INVALID_NEW_PASSWORD":
      return { ...state, newPasswordText: "Does not meet requirements", newPasswordError: true }; // prettier-ignore
    case "INVALID_VERIFY_PASSWORD":
      return { ...state, verifyPasswordText: "Does not match new password", verifyPasswordError: true }; // prettier-ignore

    // Actions to take when we type in one of our fields
    case "TYPING_OLD_PASSWORD":
      return { ...state, oldPasswordText: " ", oldPasswordError: false };
    case "TYPING_NEW_PASSWORD":
      return { ...state, newPasswordText: " ", newPasswordError: false };
    case "TYPING_VERIFY_PASSWORD":
      return { ...state, verifyPasswordText: " ", verifyPasswordError: false };

    case "RESET":
      return {
        oldPasswordText: " ",
        oldPasswordError: false,
        newPasswordText: " ",
        newPasswordError: false,
        verifyPasswordText: " ",
        verifyPasswordError: false,
      };
    default:
      return state;
  }
}

export default function ChangePassword() {
  const router = useRouter();
  // These states and dispatch functions control the error text and colors of each input field
  const [formState, dispatch] = useReducer(reducer, {
    oldPasswordText: " ", // allots space for the message before we even want one to be visible
    oldPasswordError: false,
    newPasswordText: " ",
    newPasswordError: false,
    verifyPasswordText: " ",
    verifyPasswordError: false,
  }); 
  const oldPasswordHandler = () => dispatch({ type: "TYPING_OLD_PASSWORD" }); // prettier-ignore
  const newPasswordHandler = () => dispatch({ type: "TYPING_NEW_PASSWORD" }); // prettier-ignore
  const verifyPasswordHandler = () => dispatch({ type: "TYPING_VERIFY_PASSWORD" }); // prettier-ignore

  // Collect values typed into each input field
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();
  const verifyPasswordRef = useRef();

  const loginHandler = async function () {
    // Capture values of input fields
    const typedEmail = emailRef.current.value;
    const typedPassword = passwordRef.current.value;

    // If one of the input fields is empty, render some error text without looking in the DB
    const typedEmail_NoWhitespace = typedEmail.replaceAll(" ", "");
    const typedPassword_NoWhitespace = typedPassword.replaceAll(" ", "");
    if (typedEmail_NoWhitespace.length === 0) return setEmailErrorText("No account found using this email"); // prettier-ignore
    if (typedPassword_NoWhitespace.length === 0) return setPasswordErrorText("Incorrect password"); // prettier-ignore

    // Perform an email/password check on our DB
    const loginRequest = await credentialSignIn(typedEmail, typedPassword); // request object returned
    // request object on failure: {error: "No user found for that email", ok: true, status: 200 }
    // request object on success: {error: null, ...rest doesn't matter }

    // If the login attempt is not successful...
    if (loginRequest.error) {
      const errorMSG = loginRequest.error;
      if (errorMSG === "No account found using this email") setEmailErrorText(errorMSG); // prettier-ignore
      if (errorMSG === "Incorrect password") setPasswordErrorText(errorMSG);
    }

    // If the login attempt is successful, redirect to homepage
    if (!loginRequest.error) {
      router.push("/");
    }
  };

  return (
    <Stack sx={styles.parentContainer}>
      <AuthHeader titleText={"Change Password"} descriptionText={""} />
      <FormControl sx={styles.formControl}>
        <Typography
          align="left"
          variant="label"
          color={formState.oldPasswordError ? "secondary" : ""}
        >
          Old Password:
        </Typography>
        <OutlinedInput
          inputRef={oldPasswordRef}
          placeholder="Enter old password"
          error={formState.oldPasswordError}
          onChange={oldPasswordHandler}
        />
        <FormHelperText sx={styles.formHelperText}>
          {formState.oldPasswordText}
        </FormHelperText>
      </FormControl>
      <FormControl sx={styles.formControl}>
        <Typography
          align="left"
          variant="label"
          color={formState.newPasswordError ? "secondary" : ""}
        >
          New Password:
        </Typography>
        <OutlinedInput
          inputRef={newPasswordRef}
          placeholder="Enter new password"
          error={formState.newPasswordError}
          onChange={newPasswordHandler}
        />
        <FormHelperText sx={styles.formHelperText}>
          {formState.newPasswordText}
        </FormHelperText>
      </FormControl>
      <FormControl sx={styles.formControl}>
        <Typography
          align="left"
          variant="label"
          color={formState.verifyPasswordError ? "secondary" : ""}
        >
          Verify New Password:
        </Typography>
        <OutlinedInput
          inputRef={verifyPasswordRef}
          placeholder="Enter new password again"
          error={formState.verifyPasswordError}
          onChange={verifyPasswordHandler}
        />
        <FormHelperText sx={styles.formHelperText}>
          {formState.verifyPasswordText}
        </FormHelperText>
      </FormControl>

      <Button
        variant="contained"
        disableElevation
        onClick={loginHandler}
        sx={{ width: "80%", maxWidth: "20.625rem" }}
      >
        Change password
      </Button>
    </Stack>
  );
}

const styles = {
  parentContainer: {
    width: "100%",
    height: "78vh",
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
    mb: 0.75,
    fontWeight: 500,
  },
  formHelperText: {
    color: "#d32f2f",
    m: 0,
    mt: 0.5,
  },
};
