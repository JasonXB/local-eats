import axios from "axios";
import React, { useRef, useReducer } from "react";
import { Typography, Stack, Button, FormControl } from "@mui/material";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import OutlinedInput from "@mui/material/OutlinedInput";
import { blurInputField } from "../../../src/utility-functions/general/blurInputField";
import FormHelperText from "@mui/material/FormHelperText";
import AuthHeader from "../../../src/page-blocks/authForms/HeaderHelper";
import { styles } from "../../../styles/auth/verifyPIN";
import GeneralErrorModal from "../../../src/custom-components/Modals/GeneralError";
import TabTitle from "../../../src/custom-components/TabTitle";

// Redirect users to homepage if they come here online
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req }); // falsy if not logged in. session obj if we are
  if (session) {
    return {
      redirect: {
        destination: "/", // redirect home if we're online
        permanent: false, // don't always want to redirect (only if user's logged in)
      },
    };
  }
  return { props: { session } };
}

function reducer(state, action) {
  switch (action.type) {
    case "INVALID_PIN":
      return {
        pinText: action.payload,
        pinError: true,
      };
    case "INVALID_PASSWORD":
      return {
        passwordText: action.payload,
        passwordError: true,
      };
    case "RESET_PIN":
      return {
        pinText: " ",
        pinError: false,
      };
    case "RESET_PASSWORD":
      return {
        passwordText: " ",
        passwordError: false,
      };
    case "RESET":
      return {
        passwordText: " ",
        passwordError: false,
        pinText: " ",
        pinError: false,
      };
    default:
      return;
  }
}

export default function ForgetPasswordVerify() {
  // Get query parameters from URL and capture field inputs
  const router = useRouter();
  const { query } = useRouter();
  const pinRef = useRef(); // the value of the verification PIN field
  const passwordRef = useRef();

  // Control the text underneath the password input field using state values
  const [formState, dispatch] = useReducer(reducer, {
    pinText: " ",
    pinError: false,
    passwordText: " ",
    passwordError: false,
  });

  // Control the general error modal should open if one of our API route 3rd party services fail
  const [modalVisible, setModalVisible] = React.useState(false);
  const revealErrorModal = () => setModalVisible(true);

  // Reset error states when you type into a field
  const typingPinHandler = () => dispatch({ type: "RESET_PIN" });
  const typingPasswordHandler = () => dispatch({ type: "RESET_PASSWORD" });

  const verifyHandler = async function () {
    dispatch({ type: "RESET" });
    try {
      await axios.post("/api/auth/forgotPasswordP2", {
        email: query.email,
        pin: pinRef.current.value,
        newPassword: passwordRef.current.value,
      });
      router.push(`/auth/credChangeSignin`);
    } catch (error) {
      const errorMSG = error?.response?.data?.message;
      switch (errorMSG) {
        // Leave error feedback but do not redirect for these first few errors
        case "Invalid PIN":
          dispatch({ type: "INVALID_PIN", payload: "Invalid entry" });
          break;
        case "New password field empty":
          dispatch({ type: "INVALID_PASSWORD", payload: "This field is required" }); // prettier-ignore
          break;
        case "Password does not meet requirements":
          dispatch({ type: "INVALID_PASSWORD", payload: errorMSG });
          break;
        // The following errors should trigger redirects
        case "No account found for the submitted email":
          router.push(`/auth/forgot-password`);
          break;
        case "Incorrect PIN":
          dispatch({ type: "INVALID_PIN", payload: "Incorrect entry" });
          router.push(`/auth/forgot-password`);
          break;
        case "PIN has expired":
          dispatch({ type: "INVALID_PIN", payload: errorMSG });
          router.push(`/auth/forgot-password`);
          break;
        // If one of our 3rd party services fail, render a generic error modal
        default:
          revealErrorModal();
          break;
      }
    }
  };

  const msg = `We just sent a 6 digit verification code to ${query.email}- be sure to check your spam folder if you cannot find it. The code
  expires in 30 minutes and you only get 1 try before you must restart on our "forgot-password" page`;

  return (
    <Stack sx={{ ...styles.parentContainer, mt: 8 }}>
      <TabTitle title="Password Recovery | Local Eats" />
      <AuthHeader
        titleText={`Submit the PIN we sent and create a new password`}
        descriptionText={""}
      />
      <Typography variant="p" sx={{ mb: 3.75 }}>
        Password must be 8 characters or longer. Requires an uppercase,
        lowercase, plus at least 1 symbol. No punctuation allowed
      </Typography>

      <FormControl sx={{ ...styles.formControl, mb: 0 }}>
        <Typography
          align="left"
          variant="label"
          sx={(theme) => ({
            mb: 0.5,
            color: formState.pinError
              ? theme.palette.secondary.main
              : theme.palette.text.primary,
          })}
        >
          Verification Code:
        </Typography>
        <OutlinedInput
          inputRef={pinRef}
          placeholder="6-digit code"
          type="text"
          inputProps={{ maxLength: 6 }}
          error={formState.pinError}
          onChange={typingPinHandler}
          inputProps={blurInputField}
        />
        <FormHelperText
          sx={(theme) => ({
            ...stylesLocal.helperText,
            color: formState.pinError
              ? theme.palette.secondary.main
              : theme.palette.text.primary,
          })}
        >
          {formState.pinText}
        </FormHelperText>
      </FormControl>
      <FormControl sx={{ ...styles.formControl }}>
        <Typography
          align="left"
          variant="label"
          sx={(theme) => ({
            ...stylesLocal.helperText,
            mb: 0.5, // override
            color: formState.passwordError
              ? theme.palette.secondary.main
              : theme.palette.text.primary,
          })}
        >
          New Password:
        </Typography>
        <OutlinedInput
          inputRef={passwordRef}
          placeholder="Enter password"
          type="text"
          error={formState.passwordError}
          onChange={typingPasswordHandler}
          inputProps={blurInputField}
        />
        <FormHelperText
          sx={(theme) => ({
            ...stylesLocal.helperText,
            color: formState.passwordError
              ? theme.palette.secondary.main
              : theme.palette.text.primary,
          })}
        >
          {formState.passwordText}
        </FormHelperText>
        <Button variant="contained" disableElevation onClick={verifyHandler}>
          VERIFY
        </Button>
        <Button variant="outlined" href="/auth/forgot-password" sx={{ mt: 2 }}>
          RESTART PROCESS
        </Button>
      </FormControl>

      <Stack sx={{ height: "5rem" }}>
        <Typography variant="p" sx={{ mb: 1 }}>
          {msg}
        </Typography>
      </Stack>
      <GeneralErrorModal modalVisible={modalVisible} />
    </Stack>
  );
}

const stylesLocal = {
  helperText: {
    mx: 0,
    mb: 1,
    height: "1.25rem",
  },
};
