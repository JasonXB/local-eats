import axios from "axios";
import { useRouter } from "next/router";
import React, { useRef, useState, useReducer } from "react";
import { Typography, Stack, Button, Box } from "@mui/material"; // prettier-ignore
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import { breakBefore } from "../../src/custom-components/ConditionalBreak"; // prettier-ignore
import FormHelperText from "@mui/material/FormHelperText";
import { mix } from "../../styles/styleMixins";
import { getSession } from "next-auth/react";
import AuthHeader from "../../src/page-blocks/authForms/Header";

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

export default function DeleteAccount(props) {
  console.log(props)
  const router = useRouter();
  const [correctPassword, setCorrectPassword] = useState(undefined);

  // Collect values of what's typed in each of the input fields
  const emailRef = useRef();
  const passwordRef = useRef();
  const verifyPasswordRef = useRef();

  // Whenever the user types something, reset the error state in that input field
  // Check to see if an error state is active first (don't want to redefine state multiple times for no reason)
  const typingEmailHandler = () =>  formState.emailError && dispatch({ type: "RESET" }); // prettier-ignore
  const typingPasswordHandler = () => formState.passwordError && dispatch({ type: "RESET" }); // prettier-ignore
  const typingVerifyHandler = () => formState.verifyPasswordError && dispatch({ type: "RESET" }); // prettier-ignore

  const submitHandler = async function () {};
  return (
    <Stack sx={styles.parentContainer}>
      <AuthHeader
        titleText={"Delete Local Eats Account"}
        descriptionText={"Be careful! Deleting your account will permanently delete your bookmarks and saved searches"} // prettier-ignore
      />

      {/* <FormControl sx={styles.formControl}>
        <Typography
          align="left"
          variant="label"
          sx={ correctPassword ? styles.conditionalRed(true) : styles.conditionalRed(false) } // prettier-ignore
        >
          User Email:
        </Typography>
        <OutlinedInput
          inputRef={emailRef}
          placeholder="name@email.com"
          error={correctPassword}
          onChange={typingEmailHandler}
        />
        <FormHelperText sx={styles.formHelperText}>
          {formState.emailText}
        </FormHelperText>
      </FormControl> */}
      <Button
        variant="contained"
        disableElevation
        onClick={submitHandler}
        sx={{ width: "80%", maxWidth: "20.625rem" }}
      >
        Delete account
      </Button>
    </Stack>
  );
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
  bottomSection: {
    height: "5.5rem",
    mt: 2,
  },
};
