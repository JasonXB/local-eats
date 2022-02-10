import React, { useRef, useState, useReducer } from "react";
import { Typography, Stack, Button } from "@mui/material"; // prettier-ignore
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import { mix } from "../../styles/styleMixins";
import FormHelperText from "@mui/material/FormHelperText";
import AuthHeader from "../../src/page-blocks/authForms/Header";
import { getSession } from "next-auth/react";

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
      return { ...state, emailText: "Invalid email entry", emailError: true };
    case "EMAIL_IS_TAKEN":
      return { ...state, emailText: "Email already in use", emailError: true };
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
  // These states and dispatch functions control the error text and colors of each input field
  const [formState, dispatch] = useReducer(reducer, {
    emailText: " ", // allots space for the message before we even want one to be visible
    emailError: false,
    passwordText: " ",
    passwordError: false,
  });

  // Collect values of what's typed in each of the input fields
  const newEmailRef = useRef();
  const passwordRef = useRef();

  const changeEmailHandler = async function () {
    const typedNewEmail = newEmailRef.current.value;
    const typedPassword = passwordRef.current.value;

    // Access session object since we know we're logged in
    const session = await getSession(); // session obj
    const currentEmail = session.user.email;

    // If one of the input fields is empty, render some error text without looking in the DB
    const typedNewEmail_length = typedNewEmail.replaceAll(" ", "").length;
    const typedPassword_length = typedPassword.replaceAll(" ", "").length;
    if (typedNewEmail_length === 0) return dispatch({ type: "INVALID_NEW_EMAIL" }); // prettier-ignore
    if (typedPassword_length === 0) return dispatch({ type: "INVALID_PASSWORD" }); // prettier-ignore
    console.log("past empty checks");

    // Check if the email's currently being used
    try {
      await axios.post("/api/auth/inspectEmail", {
        email: currentEmail,
      });
    } catch (error) {
      dispatch({ type: "INVALID_NEW_EMAIL" }); // Being sent here means our email was invalid
      console.log(error.response);
      return; // if the email's invalid, stop the execution here
    }
    console.log("Past email's in use gate");
    // // Send a request to our API route that validates the email (sees if it is blatantly fake)
    // try {
    //   await axios.post("/api/auth/inspectEmail", {
    //     email: typedEmail,
    //   }); // Passing the try catch means our email is valid
    // } catch (err) {
    //   dispatch({ type: "INVALID_EMAIL" }); // Being sent here means our email was invalid
    //   return; // if the email's invalid, stop the execution here
    // }

    // // Verify that the email provided is not blatantly fake
    // try {
    //   await axios.post("/api/auth/inspectEmail", {
    //     email: typedNewEmail, // Passing the try catch means our email is valid
    //   });
    // } catch (err) {
    //   dispatch({ type: "INVALID_NEW_EMAIL" });
    //   return; // if the email's invalid, stop the execution here
    // }
    // console.log("past email inspection r1");

    // Check if the email's currently being used
    // try {
    //   await axios.post("/api/auth/checkForUniqueEmail", {
    //     email: typedNewEmail,
    //   });
    // } catch (error) {
    //   dispatch({ type: "EMAIL_IS_TAKEN" }); // Render error text conveying the problem
    //   return; // if the email's invalid, stop the execution here
    // }
    // console.log(2);

    // Make sure the password is correct with /api/auth/changeEmail
    //! Need to get user email for that
    /*
    try {
      await axios.post("/api/auth/changeEmail", {
        newEmail: typedNewEmail,
        submittedPassword: typedPassword,
        currentEmail, // grabbed from session object earlier in component
      });
      // Save the signup email and password to localStorage
      localStorage.setItem("pendingAccountEmail", typedEmail);
      localStorage.setItem("signupPassword", typedPassword);
      router.push("/auth/verify-email"); // redirect
    } catch (error) {
      router.replace("/auth/signupError");
      //! may need to be changed depending on what errors are thrown in API route
    }
    */
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
