import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Typography, Box, Stack, Button, FormControl, OutlinedInput } from "@mui/material"; // prettier-ignore
import { mix } from "../../../styles/styleMixins";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { getSession } from "next-auth/react";
import AuthHeader from "../../../src/page-blocks/authForms/HeaderHelper";
import { styles } from "../../../styles/auth/verifyPIN";

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

export default function verifyEmail() {
  // Redirect visitors who arrived without going through /auth/signup first
  const router = useRouter();
  const pinRef = useRef(); // the value of the verification PIN field

  useEffect(() => {
    const isChangePending = localStorage.getItem("emailChangePending"); // string or null
    if (!isChangePending) router.replace("/auth/manage-account/change-email ");
  }, []);

  const verifyHandler = async function () {
    const typedPIN = pinRef.current.value;
    try {
      // Verify your account to gain access to new features
      await axios.post("/api/auth/swapEmailP2", {
        submittedPIN: typedPIN, // the pin we type in this pg's form
      });
      localStorage.removeItem("emailChangePending");
      router.replace("/"); //!!! render success component
    } catch (error) {
      localStorage.removeItem("emailChangePending");
      router.replace("/auth/manage-account/change-email");
    }
  };

  return (
    <Stack sx={styles.parentContainer}>
      <AuthHeader titleText={"Verify Email Change"} descriptionText={""} />
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
          expires in 30 minutes and you only get 1 try before you must start the
          process over
        </Typography>
      </Stack>
    </Stack>
  );
}
