import React from "react";
import Modal from "@mui/material/Modal";
import { Typography, Box, Button, Container, IconButton, Divider  } from '@mui/material'; // prettier-ignore
import CloseIcon from "@mui/icons-material/Close";
import { mix } from "../../../styles/styleMixins";
import { useSelector, useDispatch } from "react-redux";
import FilterMenu from "../../page-blocks/search/filterModalTabs.js/desktop/FilterMenu";
import { filterActions } from "../../../state-management/store/search/filters";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: 420,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: 2,
  ["@media (min-width: 700px)"]: { 
    maxWidth: 600,
  },
};

export default function BasicModal() {
  const dispatch = useDispatch();
  // Open and close the modal using Redux state values
  const isModalOpen = useSelector((r) => r.searchFilters.modalOpen);
  const closeFilterModal = () => dispatch(filterActions.closeModal());
  return (
    <Modal
      open={isModalOpen}
      onClose={closeFilterModal}
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
            onClick={closeFilterModal}
          >
            <CloseIcon />
          </IconButton>
        </Container>
        <Divider color="#7E7E7E" />
        <FilterMenu />
      </Box>
    </Modal>
  );
}
