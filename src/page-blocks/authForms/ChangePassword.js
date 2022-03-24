import React, { useRef, useState, useReducer } from "react";
import axios from "axios";
import { Typography, Stack, Button } from "@mui/material"; // prettier-ignore
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import AuthHeader from "./HeaderHelper";
import FormHelperText from "@mui/material/FormHelperText";
import GeneralErrorModal from "../../custom-components/Modals/GeneralError";
import { styles } from "../../../styles/auth/manageAccount";
import ReturnHomeBtn from "../../custom-components/ReturnHomeBtn";
import Wave from "../../custom-components/LoadingVisuals/Partial/Wave";

// Since this component is nested within /auth/[panel].js
// We'll let that component take care of redirects if we're on this page while offline

function reducer(state, action) {
  switch (action.type) {
    // Actions to take when the user submits a bad input for a field
    case "INVALID_OLD_PASSWORD":
      return { ...state, oldPasswordText: action.payload, oldPasswordError: true }; // prettier-ignore
    case "INVALID_NEW_PASSWORD":
      return { ...state, newPasswordText: action.payload, newPasswordError: true }; // prettier-ignore
    case "INVALID_VERIFY_PASSWORD":
      return { ...state, verifyPasswordText: action.payload, verifyPasswordError: true }; // prettier-ignore
    // When typing in our input fields, remove error text and messages
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
  const [loading, setLoading] = useState(false); // loading animation state
  // Control the general error modal which opens if one of our API route 3rd party services fail
  const [modalVisible, setModalVisible] = useState(false);
  const revealErrorModal = () => setModalVisible(true);

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
    dispatch({ type: "RESET" });
    setLoading(true);
    // Capture values of input fields
    const typedOldPassword = oldPasswordRef.current.value;
    const typedNewPassword = newPasswordRef.current.value;
    const typedVerifyPassword = verifyPasswordRef.current.value;

    // Verify the passwords typed in the input fields
    try {
      await axios.post("/api/auth/checkPasswordFields", {
        oldPassword: typedOldPassword,
        newPassword1: typedNewPassword,
        newPassword2: typedVerifyPassword,
      });
      setLoading(false);
      signOut();
      // IMPORTANT: sign out and prompt users to relogin to reinitialize NextAuth with up to date user data
      // Our SSR page guard will take care of the redirect for us to /auth/siginPostPasswordChange
    } catch (error) {
      // If the API route ends due to an unforseen error, open up the error modal
      if (!error.response || !error.response.data) return revealErrorModal();
      // We've coded actions for all possible users errors
      const errorMSG = error.response.data.message;

      switch (errorMSG) {
        case "New password field empty":
          dispatch({ type: "INVALID_NEW_PASSWORD", payload: "This field is required" }); // prettier-ignore
          break;
        case "Verify password field empty":
          dispatch({ type: "INVALID_VERIFY_PASSWORD", payload: "This field is required" }); // prettier-ignore
          break;
        case "Old password field empty":
          dispatch({ type: "INVALID_OLD_PASSWORD", payload: "This field is required" }); // prettier-ignore
          break;
        case "New password must be different":
          dispatch({ type: "INVALID_NEW_PASSWORD", payload: errorMSG }); // prettier-ignore
          break;
        case "newPassword2 !== newPassword1":
          dispatch({ type: "INVALID_VERIFY_PASSWORD", payload: "This password must match the previous one" }); // prettier-ignore
          break;
        case "Password does not meet requirements":
          dispatch({ type: "INVALID_NEW_PASSWORD", payload: errorMSG }); // prettier-ignore
        case "Old password incorrect":
            dispatch({ type: "INVALID_OLD_PASSWORD", payload: "Incorrect account password" }); // prettier-ignore
        default:
          revealErrorModal();
          break;
      }
      setLoading(false);
    }
  };

  if (loading) return <Wave />;
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
      <ReturnHomeBtn />
      <GeneralErrorModal modalVisible={modalVisible} />
    </Stack>
  );
}
