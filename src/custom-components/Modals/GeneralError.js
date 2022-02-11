import React from "react";
import { Typography, Box, Stack, Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import { mix } from "../../../styles/styleMixins";
export default function GeneralErrorModal({ hideModal, modalVisible }) {
  return (
    <Modal
      component="section"
      sx={style.backdrop}
      open={modalVisible}
      onClose={hideModal}
    >
      <Stack sx={style.stack}>
        <Box
          component="img"
          src="/images/brokenComputer.png"
          sx={{ width: 85, height: 85 }}
        />
        <Typography
          id="modal-modal-title"
          variant="h2"
          component="p"
          sx={{ my: 2 }}
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
          few moments
        </Typography>
        <Button
          sx={{ mt: 4 }}
          onClick={() => (window.location.href = "/")}
          color="info"
        >
          Return to homepage
        </Button>
        <Button onClick={() => hideModal()} color="info">
          Close pop-up
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
