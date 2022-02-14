import React from "react";
import { Typography, Box, Stack, Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import { mix } from "../../../styles/styleMixins";

// render general error modal if the failed response message is something other than the options we provided
// should only happen when one of our 3rd party services fail (SendGrid, MongoDB...etc)

export default function GeneralErrorModal({ hideModal, modalVisible }) {
  return (
    <Modal
      component="section"
      sx={style.backdrop}
      open={modalVisible}
      // would allow us to exit the modal if enabled.
      // For now we just have an option to reload the page instead of closing it
      // onClose={hideModal}
    >
      <Stack sx={style.stack}>
        <Typography
          id="modal-modal-title"
          variant="h2"
          component="p"
          sx={(theme) => {
            return {
              fontWeight: 600,
              color: theme.palette.secondary.dark,
            };
          }}
        >
          Local Eats Error
        </Typography>
        <Typography
          id="modal-modal-description"
          sx={{ mt: 0, fontSize: "1rem" }}
        >
          Sorry for the inconvenience, but something's gone wrong with one of
          our services.
        </Typography>
        <Typography sx={{ mt: 2, fontSize: "1rem" }}>
          This issue should resolve itself momentarily, so please try again in a
          few moments or return to our homepage
        </Typography>
        <Button
          onClick={() => window.location.reload()}
          sx={{ mt: 4 }}
          color="info"
        >
          try again
        </Button>
        <Button onClick={() => (window.location.href = "/")} color="info">
          Return to homepage
        </Button>
      </Stack>
    </Modal>
  );
}

const style = {
  backdrop: {
    position: "fixed",
    zIndex: 1,
    height: "100vh",
    width: "100vw",
    background: "rgba(0, 0, 0, 0.5)",
  },
  stack: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    maxWidth: "27.5rem",
    bgcolor: "background.paper",
    border: "2px solid #000",
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
    textAlign: "center",
    ...mix.flexColumn,
  },
};
