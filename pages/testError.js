import React, { useRef } from "react";
import ModalComponent from "../src/custom-components/Modals/ModalComponent";
import { Typography, Box, Stack, FormControl, OutlinedInput, FormHelperText } from '@mui/material'; // prettier-ignore
import { mix } from "../styles/styleMixins";
import { useSelector, useDispatch } from "react-redux";
import { homepageModalActions } from "../state-management/store/homepage/ModalVisibility";

export default function testError() {
  const dispatch = useDispatch();
  const addressRef = useRef();
  const cityRef = useRef();

  // Reusable function that closes the SpecifyLocation Modal
  const closeModal = () => dispatch(homepageModalActions.closeAllModals());

  //! Send a request to the Mapquest API to grab location data based on the user inputs
  const submitHandler = async function () {
    closeModal();
  };

  return (
    <ModalComponent
      headerText="Specify your location"
      closeModal={closeModal}
      submit={submitHandler}
    >
      <FormControl>
        <Typography align="left" variant="label">
          Address:
        </Typography>
        <OutlinedInput
          placeholder="Enter address"
          inputRef={addressRef}
        />
      </FormControl>
      <FormControl>
        <Typography align="left" variant="label">
          City:
        </Typography>
        <OutlinedInput
          inputRef={cityRef}
          placeholder="Enter town/city"
          type="password"
        />
      </FormControl>

    </ModalComponent>
  );
}
