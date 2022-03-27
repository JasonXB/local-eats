import React from "react";
import { Typography, Box, Button, Stack } from "@mui/material";
import { mix } from "../../../styles/styleMixins";
import { styles, StyledModal } from "../../../styles/modal_styles";

export default function ModalComponent(props) {
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
          <Box sx={stylesLocal.buttonRow}>
            <Button size="medium" onClick={() => props.cancelModal()}>
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

const stylesLocal = {
  buttonRow: { ...mix.flexRow, justifyContent: "end", mt: 3.5, ml: "auto" },
};
