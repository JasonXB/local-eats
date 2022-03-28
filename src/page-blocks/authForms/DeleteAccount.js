import axios from "axios";
import { useRouter } from "next/router";
import React, { useRef, useState, useReducer } from "react";
import { Typography, Stack, Button, Box } from "@mui/material"; // prettier-ignore
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import { getSession } from "next-auth/react";
import AuthHeader from "./HeaderHelper";
import { styles } from "../../../styles/auth/manageAccount";
import GeneralErrorModal from "../../custom-components/Modals/GeneralError";
import ReturnHomeBtn from "../../custom-components/ReturnHomeBtn";
import Wave from "../../custom-components/LoadingVisuals/Partial/Wave";

// Redirect users to homepage if they come here offline
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req }); // falsy if not logged in. session obj if we are
  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin", // redirect to this path
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

  const [loading, setLoading] = useState(false);
  const [formState, dispatch] = useReducer(reducer, {
    passwordText: " ",
    passwordError: false,
  });

  // Control the general error modal which opens if one of our API route 3rd party services fail
  const [modalVisible, setModalVisible] = useState(false);
  const revealErrorModal = () => setModalVisible(true);

  const submitHandler = async function () {
    setLoading(true);
    const typedPassword = passwordRef.current.value;
    try {
      // Verify password to allow user to delete their account
      await axios.post("/api/auth/deleteAccount", {
        submittedPassword: typedPassword,
      }); // past this point, account deletion has succeeded
      router.replace("/auth/account-deleted");
      setLoading(false); // end loading animation
      //## redirect to this page that instantly logs you out and tells users the account deletion succeeded
      //## We could log users out here, but the SSR page guards on [panel].js would reroute us to a sign in page
      //## That makes no sense if the user just deleted their account
    } catch (error) {
      const errorMSG = error?.response?.data?.message;
      switch (errorMSG) {
        case "Incorrect password":
          dispatch({ type: "INVALID_PASSWORD" });
          break;
        default:
          revealErrorModal();
          break;
      }
      setLoading(false); // end loading animation
    }
  };

  if (loading) return <Wave />;
  return (
    <Stack sx={styles.parentContainer}>
      <AuthHeader
        titleText={"Delete Account"}
        descriptionText={"We're sad to see you go! Before proceeding, know that deleting your account will erase all your bookmarks"} // prettier-ignore
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
      <ReturnHomeBtn />
      <GeneralErrorModal modalVisible={modalVisible} />
    </Stack>
  );
}
