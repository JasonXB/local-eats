import axios from "axios";
import { useRouter } from "next/router";
import React, { useRef, useReducer } from "react";
import { Typography, Stack, Button } from "@mui/material"; // prettier-ignore
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import { mix } from "../../../styles/styleMixins";
import FormHelperText from "@mui/material/FormHelperText";
import AuthHeader from "./HeaderHelper";
import { getSession } from "next-auth/react";
import GeneralError from "../../custom-components/Modals/GeneralError";

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
    case "INVALID_NEW_EMAIL":
      return { ...state, emailText: action.payload, emailError: true };
    case "INVALID_PASSWORD":
      return { ...state, emailText: "Invalid email entry", emailError: true }; // prettier-ignore
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

export default function ChangeEmail(props) {
  const router = useRouter();
  // These states and dispatch functions control the error text and colors of each input field
  const [formState, dispatch] = useReducer(reducer, {
    emailText: " ", // allots space for the message before we even want one to be visible
    emailError: false,
    passwordText: " ",
    passwordError: false,
  });

  // Control the general error modal which opens if one of our API route 3rd party services fail
  const [modalVisible, setModalVisible] = React.useState(false);
  const revealModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  // Collect values of what's typed in each of the input fields
  const newEmailRef = useRef();
  const passwordRef = useRef();

  const changeEmailHandler = async function () {
    const typedNewEmail = newEmailRef.current.value;
    const typedPassword = passwordRef.current.value;

    // If one of the input fields is empty, render some error text without looking in the DB
    const typedNewEmail_length = typedNewEmail.replaceAll(" ", "").length;
    const typedPassword_length = typedPassword.replaceAll(" ", "").length;
    if (typedNewEmail_length === 0) return dispatch({ type: "INVALID_NEW_EMAIL", payload: "This field is required" }); // prettier-ignore
    if (typedPassword_length === 0) return dispatch({ type: "INVALID_PASSWORD", payload: "This field is required" }); // prettier-ignore

    try {
      await axios.post("/api/auth/swapEmail", {
        newEmail: typedNewEmail,
        submittedPassword: typedPassword,
      });
    } catch (error) {
      // Render error messages onscreen depending on the response object recieved
      console.log(error.response);
      if (!error.response) alert("No response object???");
      // const errorMSG = error.response.data.message;

      // if (errorMSG === "User offline") router.push("/");
      // else if (errorMSG === "New email in use already") {
      //   dispatch({
      //     type: "INVALID_NEW_EMAIL",
      //     payload: "This email is already in use",
      //   });
      // } else if (errorMSG === "Current account password incorrect") {
      //   dispatch({
      //     type: "INVALID_PASSWORD",
      //     payload: "Incorrect account password",
      //   });
      // } else {
      //   revealModal();
      // }
    }
  };
  return (
    <Stack sx={styles.parentContainer}>
      <AuthHeader
        titleText={"Change Email"}
        descriptionText={"Swap your current account email for another. Any emails will be directed to your new address once you're done"} // prettier-ignore
      />

      <FormControl sx={styles.formControl}>
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
      <GeneralError modalVisible={modalVisible} hideModal={hideModal} />
    </Stack>
  );
}

const styles = {
  parentContainer: {
    width: "100%",
    height: "72vh",
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
