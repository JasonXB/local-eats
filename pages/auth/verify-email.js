import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Typography, Box, Stack, Button, FormControl, OutlinedInput } from "@mui/material"; // prettier-ignore
import { mix } from "../../styles/styleMixins";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { getSession } from "next-auth/react";
import AuthHeader from "../../src/page-blocks/authForms/HeaderHelper";
import { styles } from "../../styles/auth/verifyPIN";
import Wave from "../../src/custom-components/LoadingVisuals/FullScreen/Wave";

// Redirect users to homepage if they come here online
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req }); // falsy if not logged in. session obj if we are
  if (session) {
    return {
      redirect: {
        destination: "/", // redirect to this path
        permanent: false, // don't always want to redirect (only if user's logged in)
      },
    };
  }
  return { props: { session } };
}

export default function verifyEmail() {
  // Render a loading spinner during some of this page's async operations
  const [spinner, setSpinner] = useState(false);

  // Redirect visitors who arrived without going through /auth/signup first
  let pendingEmail;
  useEffect(() => {
    pendingEmail = localStorage.getItem("pendingAccountEmail");
    if (!pendingEmail) window.location.href = "/auth/signup";
  }, []);

  // const [bottomMessage, setbottomMessage] = useState("start"); // sets text @ bottom
  const router = useRouter();
  const pinRef = useRef(); // the value of the verification PIN field

  // Logs in a user
  const loginProcedure = async function (email, password) {
    // Call the log in callback function defined in [...nextauth].js
    const result = await signIn("credentials", {
      redirect: false, // prevents a redirect if something fails
      email,
      password,
    });
    // If the signup procedure succeeded, the parameters we pass are guaranteed to be correct
    // Error handling not required in this 1 niche scenario
    return;
  };

  const endSignupProcess = function (resultString) {
    let redirectLocation;
    // If login attempt fails, delete LocalStorage data and redirect
    if (resultString == "failure") {
      localStorage.removeItem("pendingAccountEmail");
      localStorage.removeItem("signupPassword");
      redirectLocation = "/auth/signup";
    }
    // If signup succeeds, immediately log in then redirect to home
    if (resultString == "success") {
      // Save localStorage data temporarily inside variables
      const signupEmail = localStorage.getItem("pendingAccountEmail");
      const signupPassword = localStorage.getItem("signupPassword");
      // Delete localStorage data
      localStorage.removeItem("pendingAccountEmail");
      localStorage.removeItem("signupPassword");
      redirectLocation = "/";
      // Log in using the email/password used during sign up
      loginProcedure(signupEmail, signupPassword);
    }
    // Redirect to homepage while signed in
    router.push(redirectLocation);
  };

  const verifyHandler = async function () {
    const typedPIN = pinRef.current.value;
    setSpinner(true);
    try {
      // Verify your account to gain access to new features
      await axios.post("/api/auth/signupP2", {
        pendingEmail,
        submittedPIN: typedPIN, // the pin we type in this pg's form
      }); // past this point, account creation has succeeded
      // Sign in immediately, delete localStorage data and redirect
      endSignupProcess("success");
    } catch (error) {
      endSignupProcess("failure"); // delete localStorage data and redirect
    }
  };

  if (spinner) return <Wave />;
  return (
    <Stack sx={styles.parentContainer}>
      <AuthHeader titleText={"Verify Email"} descriptionText={""} />
      <FormControl sx={styles.formControl}>
        <Typography align="left" variant="label" sx={{ mb: 0.5 }}>
          Verification Code:
        </Typography>
        <OutlinedInput
          sx={{ mb: 2 }}
          inputRef={pinRef}
          placeholder="6-digit code"
          type="text"
          inputProps={{ maxLength: 6 }}
          // disabled={bottomMessage && true}
          // error={formState.passwordError}
          // onChange={typingPasswordHandler}
        />
        <Button variant="contained" disableElevation onClick={verifyHandler}>
          VERIFY
        </Button>
      </FormControl>
      <Stack sx={{ height: "5rem" }}>
        <Typography variant="p" sx={{ mb: 1 }}>
          We just sent a 6 digit verification code to the email you submitted
          (be sure to check your spam folder if you cannot find it). The code
          expires in 30 minutes and you only get 1 try before you must restart
          on our sign up page
        </Typography>
      </Stack>
    </Stack>
  );
}
