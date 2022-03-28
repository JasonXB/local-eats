import axios from "axios";
import { useRouter } from "next/router";
import React, { useRef, useReducer, useState, useEffect } from "react";
import { Typography, Stack, Button } from "@mui/material"; // prettier-ignore
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import AuthHeader from "./HeaderHelper";
import { getSession } from "next-auth/react";
import GeneralErrorModal from "../../custom-components/Modals/GeneralError";
import { styles } from "../../../styles/auth/manageAccount";
import ReturnHomeBtn from "../../custom-components/ReturnHomeBtn";
import { lengthNoSpaces } from "../../utility-functions/general/lengthNoSpaces";
import Wave from "../../custom-components/LoadingVisuals/Partial/Wave";

function reducer(state, action) {
  switch (action.type) {
    // Actions to take when the user submits a bad input for a field
    case "INVALID_NEW_EMAIL":
      return { ...state, emailText: action.payload, emailError: true };
    case "INVALID_PASSWORD":
      return { ...state, passwordText: action.payload, passwordError: true }; // prettier-ignore
    case "TYPING_NEW_EMAIL":
        return { ...state, emailText: " ", emailError: false }; // prettier-ignore
    case "TYPING_PASSWORD":
      return { ...state, passwordText: " ", passwordError: false }; // prettier-ignore
    case "RESET":
      return {
        emailText: " ",
        emailError: false,
        passwordText: " ",
        passwordError: false,
      };
    default:
      return state;
  }
}

// Since this component is nested within /auth/[panel].js
// We'll let that component take care of redirects if we're on this page while offline (no SSR guards here)

export default function ChangeEmail(props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false); // loading animation state
  // These states and dispatch functions control the error text and colors of each input field
  const [formState, dispatch] = useReducer(reducer, {
    emailText: " ", // allots space for the message before we even want one to be visible
    emailError: false,
    passwordText: " ",
    passwordError: false,
  });

  // Control the general error modal which opens if one of our API route 3rd party services fail
  const [modalVisible, setModalVisible] = useState(false);
  const revealErrorModal = () => setModalVisible(true);

  // Collect values of what's typed in each of the input fields
  const newEmailRef = useRef();
  const passwordRef = useRef();

  const changeEmailHandler = async function () {
    const typedNewEmail = newEmailRef.current.value;
    const typedPassword = passwordRef.current.value;
    dispatch({ type: "RESET" }); // reset form state
    setLoading(true);

    // If one of the input fields is empty, render some error text without looking in the DB
    const typedNewEmail_length = lengthNoSpaces(typedNewEmail);
    const typedPassword_length = lengthNoSpaces(typedPassword);
    if (typedNewEmail_length === 0) return dispatch({ type: "INVALID_NEW_EMAIL", payload: "This field is required" }); // prettier-ignore
    if (typedPassword_length === 0) return dispatch({ type: "INVALID_PASSWORD", payload: "This field is required" }); // prettier-ignore

    try {
      await axios.post("/api/auth/swapEmailP1", {
        newEmail: typedNewEmail,
        submittedPassword: typedPassword,
      });
      localStorage.setItem("emailChangePending", true);
      setLoading(false);
      router.push(`/auth/manage-account/verify-email-change`);
    } catch (error) {
      // Render error messages onscreen depending on the response object recieved
      const errorMSG = error?.response?.data?.message;
      switch (errorMSG) {
        case "User offline":
          router.push("/auth/signin");
          break;
        case "This email's already tied to your Local Eats account":
        case "Invalid email entry":
          dispatch({ type: "INVALID_NEW_EMAIL", payload: errorMSG });
          break;
        case "This email is connected to an existing Local Eats account":
          dispatch({ type: "INVALID_NEW_EMAIL", payload: errorMSG });
          break;
        case "Account password incorrect":
          dispatch({ type: "INVALID_PASSWORD", payload: errorMSG });
          break;
        default:
          revealErrorModal();
          break;
      }
      setLoading(false);
    }
  };

  // Grab the email we're logged in with on startup to use in JSX
  const [currentEmail, setCurrentEmail] = useState("");
  useEffect(async () => {
    const session = await getSession();
    setCurrentEmail(session.user.email);
  }, []);

  if (loading) return <Wave />;
  return (
    <Stack sx={styles.parentContainer}>
      <AuthHeader titleText={"Change Email"} descriptionText={""} />

      <FormControl sx={styles.formControl}>
        <Typography align="left" variant="label" sx={{ mb: 2, mt: "2px" }}>
          CURRENT EMAIL:
          <br />
          <Typography>{currentEmail}</Typography>
        </Typography>

        <Typography
          align="left"
          variant="label"
          color={formState.emailError ? "secondary" : ""}
        >
          New Email:
        </Typography>
        <OutlinedInput
          inputRef={newEmailRef}
          placeholder="Enter new email"
          error={formState.emailError}
          onChange={() => dispatch({ type: "TYPING_NEW_EMAIL" })}
        />
        <FormHelperText sx={styles.formHelperText}>
          {formState.emailText}
        </FormHelperText>
      </FormControl>

      <FormControl sx={styles.formControl}>
        <Typography
          align="left"
          variant="label"
          color={formState.passwordError ? "secondary" : ""}
        >
          Current Account Password:
        </Typography>
        <OutlinedInput
          inputRef={passwordRef}
          placeholder="Enter password"
          type="password"
          error={formState.passwordError}
          onChange={() => dispatch({ type: "TYPING_PASSWORD" })}
        />
        <FormHelperText sx={styles.formHelperText}>
          {formState.passwordText}
        </FormHelperText>
      </FormControl>

      <Button
        variant="contained"
        disableElevation
        onClick={changeEmailHandler}
        sx={{ width: "80%", maxWidth: "20.625rem" }}
      >
        Change account email
      </Button>
      <ReturnHomeBtn />
      <GeneralErrorModal modalVisible={modalVisible} />
    </Stack>
  );
}
