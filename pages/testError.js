import React from "react";
import ModalComponent from "../src/custom-components/Modals/ModalComponent";
import { Typography, Box, Stack, FormControl, OutlinedInput, FormHelperText } from '@mui/material'; // prettier-ignore
import { mix } from "../styles/styleMixins";
import { useSelector, useDispatch } from "react-redux";
import { homepageModalActions } from "../state-management/store/homepage/ModalVisibility";

export default function testError() {
  const dispatch = useDispatch();

  // Only show this modal when Redux state value equals a non-falsy
  const showSpecifyLocationModal = useSelector(
    (r) => r.homepageModals.showSpecifyLocation
  );
  const closeModal = () => dispatch(homepageModalActions.closeAllModals());
  return (
    <ModalComponent headerText="Specify your location" closeModal={closeModal}>
      <FormControl>
        <Typography align="left" variant="label">
          User Email:
        </Typography>
        <OutlinedInput
          placeholder="name@email.com"
          // error={formState.emailError}
          // onChange={typingEmailHandler}
        />
        {/* <FormHelperText>
          {formState.emailText}
        </FormHelperText> */}
      </FormControl>
      <FormControl>
        <Typography align="left" variant="label">
          Password:
        </Typography>
        <OutlinedInput
          // inputRef={passwordRef}
          placeholder="Enter password"
          type="password"
          // error={formState.passwordError}
          // onChange={typingPasswordHandler}
        />
        {/* <FormHelperText>
          {formState.passwordText}
        </FormHelperText> */}
      </FormControl>
      <FormControl>
        <Typography align="left" variant="label">
          Verify Password:
        </Typography>
        <OutlinedInput
          // inputRef={verifyPasswordRef}
          placeholder="Enter password again"
          type="password"
          // error={formState.verifyPasswordError}
          // onChange={typingVerifyHandler}
        />
        {/* <FormHelperText>
          {formState.verifyPasswordText}
        </FormHelperText> */}
      </FormControl>
    </ModalComponent>
  );
}
