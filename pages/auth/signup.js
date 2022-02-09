import axios from "axios";
import { useRouter } from "next/router";
import React, { useRef, useState, useReducer } from "react";
import { Typography, Stack, Button, Box } from "@mui/material"; // prettier-ignore
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import { breakBefore } from "../../src/custom-components/ConditionalBreak"; // prettier-ignore
import FormHelperText from "@mui/material/FormHelperText";
import { mix } from "../../styles/styleMixins";
import { useGlobalContext } from "../../state-management/globalContext";

export default function signup() {
  const router = useRouter();

  const [formState, dispatch] = useReducer(reducer, {
    emailText: " ", // allots space for the message before we even want one to be visible
    emailError: false,
    passwordText: " ",
    passwordError: false,
    verifyPasswordText: " ",
    verifyPasswordError: false,
    passwordRequirements: false,
    emailTaken: undefined,
  });
  // Collect values of what's typed in each of the input fields
  const emailRef = useRef();
  const passwordRef = useRef();
  const verifyPasswordRef = useRef();

  // Whenever the user types something, reset the error state in that input field
  // Check to see if an error state is active first (don't want to redefine state multiple times for no reason)
  const typingEmailHandler = () =>  formState.emailError && dispatch({ type: "RESET" }); // prettier-ignore
  const typingPasswordHandler = () => formState.passwordError && dispatch({ type: "RESET" }); // prettier-ignore
  const typingVerifyHandler = () => formState.verifyPasswordError && dispatch({ type: "RESET" }); // prettier-ignore

  const submitHandler = async function () {
    // Reset the form state to remove any error visuals that were required earlier
    dispatch({ type: "RESET" });
    // Capture what's typed in each input field
    const typedEmail = emailRef.current.value;
    const typedPassword = passwordRef.current.value;
    const typedPassword2 = verifyPasswordRef.current.value;
    // Check if the email's currently being used
    try {
      await axios.post("/api/auth/signupP0", {
        email: typedEmail,
      });
    } catch (error) {
      dispatch({ type: "EMAIL_IS_TAKEN" }); // Being sent here means our email was invalid
      return; // if the email's invalid, stop the execution here
    }

    // Send a request to our API route that validates the email (sees if it is blatantly fake)
    try {
      await axios.post("/api/auth/inspectEmail", {
        email: typedEmail,
      }); // Passing the try catch means our email is valid
    } catch (err) {
      dispatch({ type: "INVALID_EMAIL" }); // Being sent here means our email was invalid
      return; // if the email's invalid, stop the execution here
    }

    // Check to see if our password strength is high enough
    try {
      // Make a request to the API route that checks our password strength
      await axios.post("/api/auth/checkPasswordStrength", { password: typedPassword }); // prettier-ignore
      // If our password is strong enough, the rest of this block executes (if not, we get sent to catch block)
    } catch (err) {
      dispatch({ type: "INVALID_PASSWORD" }); // Being sent here means our password was inadequate
      return; // if the password's too weak, stop the execution here
    }

    // Make sure that the verify password field matches the regular password field
    if (typedPassword !== typedPassword2) {
      dispatch({ type: "INVALID_PASSWORD_2" });
      return; // stop the execution here
    } // Past this point, the email is likely valid, the password is strong, and the password field inputs match

    // Create a pending account that holds your email, hashed password
    // Verification PIN, expiry date for that PIN... etc
    try {
      await axios.post("/api/auth/signupP1", {
        email: typedEmail,
        password: typedPassword,
      });
      // Save the signup email and password to localStorage
      localStorage.setItem("pendingAccountEmail", typedEmail);
      localStorage.setItem("signupPassword", typedPassword);
      router.push("/auth/verify-email"); // redirect
    } catch (error) {
      router.replace("/auth/signupError");
    }
  };
  return (
    <Stack sx={styles.parentContainer}>
      <Typography variant="h2" sx={{ ...mix.titleFont }}>
        Sign Up
      </Typography>
      <Typography
        variant="p"
        sx={{
          fontSize: "1.2rem",
          mb: 4,
          px: 2,
          width: "100%",
          maxWidth: "35rem",
        }}
      >
        Sign up and gain access to bookmarks, preserved search history,
        {breakBefore(454)} plus any new features upon release!
      </Typography>
      <FormControl sx={styles.formControl}>
        <Typography
          align="left"
          variant="label"
          sx={ formState.emailError ? styles.conditionalRed(true) : styles.conditionalRed(false) } // prettier-ignore
        >
          User Email:
        </Typography>
        <OutlinedInput
          inputRef={emailRef}
          placeholder="name@email.com"
          error={formState.emailError}
          onChange={typingEmailHandler}
        />
        <FormHelperText sx={styles.formHelperText}>
          {formState.emailText}
        </FormHelperText>
      </FormControl>
      <FormControl sx={styles.formControl}>
        <Typography
          align="left"
          variant="label"
          sx={ formState.passwordError ? styles.conditionalRed(true) : styles.conditionalRed(false) } // prettier-ignore
        >
          Password:
        </Typography>
        <OutlinedInput
          inputRef={passwordRef}
          placeholder="Enter password"
          type="password"
          error={formState.passwordError}
          onChange={typingPasswordHandler}
        />
        <FormHelperText sx={styles.formHelperText}>
          {formState.passwordText}
        </FormHelperText>
      </FormControl>
      <FormControl sx={styles.formControl}>
        <Typography
          align="left"
          variant="label"
          sx={ formState.verifyPasswordError ? styles.conditionalRed(true) : styles.conditionalRed(false) } // prettier-ignore
        >
          Verify Password:
        </Typography>
        <OutlinedInput
          inputRef={verifyPasswordRef}
          placeholder="Enter password again"
          type="password"
          error={formState.verifyPasswordError}
          onChange={typingVerifyHandler}
        />
        <FormHelperText sx={styles.formHelperText}>
          {formState.verifyPasswordText}
        </FormHelperText>
      </FormControl>
      <Button
        variant="contained"
        disableElevation
        onClick={submitHandler}
        sx={{ width: "80%", maxWidth: "20.625rem" }}
      >
        Submit
      </Button>
      {!formState.emailTaken && (
        <Stack sx={styles.bottomSection}>
          <Typography
            variant="p"
            color="secondary"
            sx={{ mt: 2, opacity: formState.passwordError ? 1 : 0 }}
          >
            PASSWORD REQUIREMENTS
          </Typography>
          <Typography
            variant="p"
            sx={{ opacity: formState.passwordError ? 1 : 0 }}
            color="secondary"
          >
            Must be 8 characters or longer. Requires an uppercase, lowercase,
            plus at least 1 symbol. No punctuation allowed
          </Typography>
        </Stack>
      )}
      {formState.emailTaken && (
        <Stack sx={styles.bottomSection}>
          <Typography variant="p" color="secondary" sx={{ mt: 2 }}>
            This email's already connected to an existing Local Eats account.
          </Typography>
          <Box
            component="a"
            href="/auth/signin"
            sx={(theme) => {
              return { color: theme.palette.secondary.main };
            }}
          >
            Click here to visit our sign in page
          </Box>
        </Stack>
      )}
    </Stack>
  );
}

function reducer(state, action) {
  if (action.type === "INVALID_EMAIL") {
    return {
      emailText: "Invalid entry",
      emailError: true,
      emailTaken: undefined,
      // Reset other states back to init value
      passwordText: " ",
      passwordError: false,
      verifyPasswordText: " ",
      verifyPasswordError: false,
      passwordRequirements: false,
    };
  }
  if (action.type === "EMAIL_IS_TAKEN") {
    return {
      emailText: "Email already in use",
      emailError: true,
      emailTaken: true, //! now here
      // Reset other states back to init value
      passwordText: " ",
      passwordError: false,
      verifyPasswordText: " ",
      verifyPasswordError: false,
      passwordRequirements: false,
    };
  }
  if (action.type === "INVALID_PASSWORD") {
    return {
      passwordText: "Password does not meet requirements",
      passwordError: true,
      passwordRequirements: true,
      // Reset other states back to init value
      emailText: " ",
      emailError: false,
      emailTaken: undefined,
      verifyPasswordText: " ",
      verifyPasswordError: false,
    };
  }
  if (action.type === "INVALID_PASSWORD_2") {
    return {
      verifyPasswordText: "Passwords do not match",
      verifyPasswordError: true,
      // Reset other states back to init value
      emailText: " ",
      emailError: false,
      emailTaken: undefined,
      passwordText: " ",
      passwordError: false,
      passwordRequirements: false,
    };
  }
  if (action.type === "RESET") {
    return {
      emailText: " ",
      emailError: false,
      emailTaken: undefined,
      passwordText: " ",
      passwordError: false,
      verifyPasswordText: " ",
      verifyPasswordError: false,
      passwordRequirements: false,
    };
  }
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
