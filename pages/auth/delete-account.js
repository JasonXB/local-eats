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
import { signOut } from "next-auth/react";

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
    case "INVALID_PASSWORD":
      return { ...state, passwordText: "Incorrect password", passwordError: true }; // prettier-ignore
    case "RESET":
      return { passwordText: " ", passwordError: false };
    default:
      return state;
  }
}

export default function DeleteAccount(props) {
  const router = useRouter();
  const passwordRef = useRef();

  const [formState, dispatch] = useReducer(reducer, {
    passwordText: " ",
    passwordError: false,
  });

  const submitHandler = async function () {
    const typedPassword = passwordRef.current.value;
    try {
      // Verify password to allow user to delete their account
      await axios.post("/api/auth/deleteAccount", {
        submittedPassword: typedPassword,
      }); // past this point, account deletion has succeeded
      signOut(); // log out of your old session immediately
      router.replace("/"); // redirect home
    } catch (error) {
      console.error(error.response);
      dispatch({ type: "INVALID_PASSWORD" });
    }
  };

  return (
    <Stack sx={styles.parentContainer}>
      <AuthHeader
        titleText={"Delete Local Eats Account"}
        descriptionText={"Be careful! Deleting your account will permanently delete your bookmarks and saved searches"} // prettier-ignore
      />

      <FormControl sx={styles.formControl}>
        <Typography
          align="left"
          variant="label"
          color={formState.passwordError ? "secondary" : ""}
        >
          Account Password:
        </Typography>
        <OutlinedInput
          inputRef={passwordRef}
          placeholder="Enter password"
          error={formState.passwordError}
          onChange={() => dispatch({ type: "RESET" })}
        />
        <FormHelperText sx={styles.formHelperText}>
          {formState.passwordText}
        </FormHelperText>
      </FormControl>

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
    height: "75vh",
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
