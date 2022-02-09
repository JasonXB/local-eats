import React, { useRef, useState, useEffect } from "react";
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

export default function ChangePassword() {
  const router = useRouter();
  // Collect values of what's typed in each of the input fields
  const emailRef = useRef();
  const passwordRef = useRef();
  // Controls the text underneath the input fields
  const [passwordErrorText, setPasswordErrorText] = useState(" ");

  const typingEmailHandler = async function () {
    setEmailErrorText(" ");
  };
  const typingPasswordHandler = async function () {
    setPasswordErrorText(" ");
  };

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
          color={passwordErrorText === "Incorrect password" ? "secondary" : ""}
        >
          Old Password:
        </Typography>
        <OutlinedInput
          inputRef={passwordRef}
          placeholder="Enter old password"
          error={passwordErrorText === "Incorrect password"}
          onChange={typingPasswordHandler}
        />
        <FormHelperText sx={styles.formHelperText}>
          {passwordErrorText}
        </FormHelperText>
      </FormControl>
      <FormControl sx={styles.formControl}>
        <Typography
          align="left"
          variant="label"
          color={passwordErrorText === "Incorrect password" ? "secondary" : ""}
        >
          New Password:
        </Typography>
        <OutlinedInput
          inputRef={passwordRef}
          placeholder="Enter new password"
          error={passwordErrorText === "Incorrect password"}
          onChange={typingPasswordHandler}
        />
        <FormHelperText sx={styles.formHelperText}>
          {passwordErrorText}
        </FormHelperText>
      </FormControl>
      <FormControl sx={styles.formControl}>
        <Typography
          align="left"
          variant="label"
          color={passwordErrorText === "Incorrect password" ? "secondary" : ""}
        >
          Verify New Password:
        </Typography>
        <OutlinedInput
          inputRef={passwordRef}
          placeholder="Enter new password again"
          error={passwordErrorText === "Incorrect password"}
          onChange={typingPasswordHandler}
        />
        <FormHelperText sx={styles.formHelperText}>
          {passwordErrorText}
        </FormHelperText>
      </FormControl>

      <Button
        variant="contained"
        disableElevation
        onClick={loginHandler}
        sx={{ width: "80%", maxWidth: "20.625rem" }}
      >
        Submit password change
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
