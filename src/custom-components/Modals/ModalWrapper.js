import React from "react";
import { styled } from "@mui/system";
import { Typography, Box } from "@mui/material";
import { mix } from "../../../styles/styleMixins";

const StyledModal = styled("div")`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export default function ModalWrapper(props) {
  return (
    <>
      <Box sx={styles.backdrop}>
        <StyledModal>
          <Box sx={styles.modalCard}>
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
          </Box>
        </StyledModal>
      </Box>
    </>
  );
}

const styles = {
  backdrop: {
    position: "fixed",
    zIndex: 1299,
    right: 0,
    bottom: 0,
    top: 0,
    left: 0,
    bgcolor: "rgb(0, 0, 0, 0.4)",
    width: "100vw",
    height: "100vh",
  },
  modalCard: {
    width: "100%",
    maxWidth: "40rem",
    bgcolor: "background.paper",
    border: "2px solid #000",
    borderRadius: "24px",
    p: 2,
    px: 4,
    pb: 3,
  },
};
