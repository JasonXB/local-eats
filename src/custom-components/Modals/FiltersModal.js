import React from "react";
import Modal from "@mui/material/Modal";
import { Typography, Box, Button, Container, IconButton, Divider  } from '@mui/material'; // prettier-ignore
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { mix } from "../../../styles/styleMixins";
import FilterMenu from "../../page-blocks/search/filterModalTabs.js/desktop/FilterMenu";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: 2,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Container sx={{ ...mix.flexRow, justifyContent: "space-between" }}>
            <Typography
              id="modal-modal-title"
              variant="h3"
              component="h2"
              sx={(theme) => {
                return { p: 2.5, color: theme.palette.secondary.main };
              }}
            >
              Filters
            </Typography>
            <IconButton
              aria-label="delete"
              sx={{ p: 2.5 }}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </Container>
          <Divider color="#7E7E7E" />
          <FilterMenu />
        </Box>
      </Modal>
    </div>
  );
}

const styles = {
  tab: {
    fontSize: "1.125rem",
    py: 3,
    px: 1.5,
  },
};
