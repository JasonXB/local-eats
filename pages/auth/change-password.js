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
import axios from "axios";
import GeneralErrorModal from "../../src/custom-components/Modals/GeneralError";

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
  // Control the general error modal
  const [openModal, setOpenModal] = React.useState(false);
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

  const changePasswordHandler = async function () {
    // Capture values of input fields
    const typedOldPassword = oldPasswordRef.current.value;
    const typedNewPassword = newPasswordRef.current.value;
    const typedVerifyPassword = verifyPasswordRef.current.value;

    // If one of the input fields is empty, render some error text without looking in the DB
    const typedOldPW_length = typedOldPassword.replaceAll(" ", "").length;
    const typedNewPW_length = typedNewPassword.replaceAll(" ", "").length;
    const typedVPW_length = typedVerifyPassword.replaceAll(" ", "").length;
    if (typedOldPW_length === 0) return dispatch({ type: "INVALID_OLD_PASSWORD" }); // prettier-ignore
    if (typedNewPW_length === 0) return dispatch({ type: "INVALID_NEW_PASSWORD" }); // prettier-ignore
    if (typedVPW_length === 0) return dispatch({ type: "INVALID_VERIFY_PASSWORD" }); // prettier-ignore

    // Verify the new proposed password's strength using an API route
    try {
      await axios.post("/api/auth/checkPasswordStrength", {
        password: typedNewPassword,
      });
    } catch (error) {
      return dispatch({ type: "INVALID_NEW_PASSWORD" }); // end function
    }

    // Change the password using an API route
    try {
      await axios.post("/api/auth/changePassword", {
        oldPassword: typedOldPassword,
        newPassword: typedNewPassword,
      });
    } catch (error) {
      const errorMessage = error.response.data.message;
      if (errorMessage === "Old password is not correct") {
        dispatch({ type: "INVALID_OLD_PASSWORD" });
      } else {
        setOpenModal(true);
      }
      console.error(errorMessage);
      // return alert("Something has gone wrong on our end"); //!!! make a simple modal
    }
  };

  return (
    <Stack sx={styles.parentContainer}>
      <AuthHeader titleText={"Change Password"} descriptionText={""} />
      <Typography variant="p">NEW PASSWORD REQUIREMENTS</Typography>
      <Typography variant="p" sx={{ mb: 3.75 }}>
        Must be 8 characters or longer. Requires an uppercase, lowercase, plus
        at least 1 symbol. No punctuation allowed
      </Typography>
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
          type="password"
        />
        <FormHelperText sx={styles.formHelperText}>
          {formState.verifyPasswordText}
        </FormHelperText>
      </FormControl>

      <Button
        variant="contained"
        disableElevation
        onClick={changePasswordHandler}
        sx={{ width: "80%", maxWidth: "20.625rem" }}
      >
        Change password
      </Button>
      <GeneralErrorModal />
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
    mb: 0.75,
    fontWeight: 500,
  },
  formHelperText: {
    color: "#d32f2f",
    m: 0,
    mt: 0.5,
  },
};
