import React from "react";
import { Typography, Box, Button, Stack } from "@mui/material";
import { mix } from "../../../styles/styleMixins";
import { styles, StyledModal } from "../../../styles/modal_styles";
import { useSelector, useDispatch } from "react-redux";
import { homepageModalActions } from "../../../state-management/store/homepage/ModalVisibility";

export default function ModalComponent(props) {
  // Only show this modal when Redux state value equals a non-falsy
  const showSpecifyLocationModal = useSelector(
    (r) => r.homepageModals.showSpecifyLocation
  );

  if (!showSpecifyLocationModal) return null;
  return (
    <Box sx={styles.backdrop}>
      <StyledModal>
        <Stack sx={{ ...styles.modalCard, ...mix.flexRow }}>
          {/* Modal title centered with bold red text */}
          <Typography
            color="secondary"
            variant="h3"
            sx={{
              fontWeight: 600,
              ...mix.flexRow,
              justifyContent: "center",
              mb: 2,
            }}
          >
            {props.headerText}
          </Typography>
          {props.children}
          <Box
            sx={{ ...mix.flexRow, justifyContent: "end", mt: 3.5, ml: "auto" }}
          >
            <Button size="medium" onClick={() => props.closeModal()}>
              Cancel
            </Button>
            <Button onClick={() => props.submit()} size="medium" sx={{ ml: 2 }}>
              Submit
            </Button>
          </Box>
        </Stack>
      </StyledModal>
    </Box>
  );
}
