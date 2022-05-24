import React, { useRef, useReducer, useState } from "react";
import axios from "axios";
import { mix } from "../../../styles/styleMixins";
import { getSession } from "next-auth/react";
import { Typography, Stack, Button, FormControl } from "@mui/material"; // prettier-ignore
import { useRouter } from "next/router";
import OutlinedInput from "@mui/material/OutlinedInput";
import { blurInputField } from "../../../src/utility-functions/general/blurInputField";
import FormHelperText from "@mui/material/FormHelperText";
import { styles } from "../../../styles/auth/form";
import AuthHeader from "../../../src/page-blocks/authForms/HeaderHelper";
import GeneralErrorModal from "../../../src/custom-components/Modals/GeneralError";
import { lengthNoSpaces } from "../../../src/utility-functions/general/lengthNoSpaces";
import AbsoluteCenter from "../../../src/custom-components/LoadingVisuals/AbsoluteCenter"; // prettier-ignore
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

export default function ForgotPassword() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // Control the text underneath the input fields using state values
  const emailRef = useRef(); // whats typed in the input field
  const [formState, dispatch] = useReducer(reducer, {
    emailText: " ", // allots space for the message before we even want one to be visible
    emailError: false,
  });

  // Control the general error modal should open if one of our API route 3rd party services fail
  const [modalVisible, setModalVisible] = React.useState(false);
  const revealErrorModal = () => setModalVisible(true);

  const submitHandler = async function () {
    setLoading(true);
    // If the input field is empty, render some error text
    const typedEmail = emailRef.current.value;
    const thinnedEmailLength = lengthNoSpaces(typedEmail);
    if (thinnedEmailLength === 0) {
      setLoading(false);
      return dispatch({
        type: "INVALID_EMAIL",
        payload: "This field is required",
      });
    }

    // Send a 6 digit PIN to the email specified then redirect to a verification page
    try {
      await axios.post("/api/auth/forgotPasswordP1", {
        email: typedEmail,
      });
      setLoading(false);
      router.push(`/auth/forgot-password/${typedEmail}`);
    } catch (error) {
      switch (error?.response?.data?.message) {
        case "Invalid email":
          dispatch({ type: "INVALID_EMAIL", payload: "Invalid email" });
          break;
        // Don't tell potentially ill-intentioned users if they're testing an email with no verified account
        case "Email not tied to a verified account":
          router.push(`/auth/forgot-password/${typedEmail}`); // proceed as if successful
          break;
        // If one of our 3rd party services fail, render a generic error modal
        default:
          revealErrorModal();
          break;
      }
      setLoading(false);
    }
    return;
  };

  // The state values in useReducer influence the JSX based on their values
  if (loading) return <AbsoluteCenter />;
  return (
    <Stack sx={styles.parentContainer}>
      <TabTitle title="Password Recovery | Local Eats" />
      <AuthHeader
        titleText={"Forgot your password?"}
        descriptionText={
          "Create new login credentials after you verify ownership of a Local Eats account email"
        }
      />

      <FormControl sx={styles.formControl}>
        <Typography
          align="left"
          variant="label"
          color={formState.emailError ? "secondary" : ""}
          sx={{ mb: 0.5 }}
        >
          Account Email:
        </Typography>
        <OutlinedInput
          inputRef={emailRef}
          placeholder="name@email.com"
          error={formState.emailError}
          onChange={() => dispatch({ type: "RESET_EMAIL" })}
          inputProps={blurInputField}
        />
        <FormHelperText sx={styles.formHelperText}>
          {formState.emailText}
        </FormHelperText>
      </FormControl>
      <Button
        variant="contained"
        onClick={submitHandler}
        sx={styles.btn}
        disableElevation
      >
        Submit
      </Button>
      <Button
        href="/"
        variant="outlined"
        fullWidth
        sx={{ ...mix.formButtonWidth, mt: 2 }}
      >
        Return to homepage
      </Button>
      <Typography variant="p" sx={{ mt: 2 }}>
        Submit the email connected to your Local Eats account and we&apos;ll send it
        a 6 digit PIN. You&apos;ll be redirected to a new page where that PIN can be
        entered to change your login credentials
      </Typography>
      <GeneralErrorModal modalVisible={modalVisible} />
    </Stack>
  );
}

function reducer(state, action) {
  switch (action.type) {
    case "INVALID_EMAIL":
      return {
        emailText: action.payload,
        emailError: true,
      };
    case "RESET_EMAIL":
      return {
        ...state,
        emailText: " ",
        emailError: false,
      };
    case "RESET":
      return {
        emailText: " ",
        emailError: false,
      };
    default:
      return;
  }
}
