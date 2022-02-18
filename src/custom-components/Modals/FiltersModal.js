import React from "react";
import Modal from "@mui/material/Modal";
import { Typography, Box, Button, Container, IconButton, Divider  } from '@mui/material'; // prettier-ignore
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { mix } from "../../../styles/styleMixins";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function BasicModal() {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Control Vertical Tabs
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => setValue(newValue);

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
              sx={(theme) => { return { p: 2.5, color: theme.palette.secondary.dark }}}
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
          <Divider />
          <Box
            sx={{
              flexGrow: 1,
              bgcolor: "background.paper",
              display: "flex",
            }}
          >
            <Tabs
              orientation="vertical"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs"
              sx={{ borderRight: 1, borderColor: "divider" }}
            >
              <Tab label="Distance" sx={styles.tab} {...a11yProps(0)} />
              <Tab label="Price" sx={styles.tab} {...a11yProps(1)} />
              <Tab label="Rating" sx={styles.tab} {...a11yProps(2)} />
              <Tab label="Open now" sx={styles.tab} {...a11yProps(3)} />
            </Tabs>
            <TabPanel value={value} index={0}>
              Item One
            </TabPanel>
            <TabPanel value={value} index={1}>
              Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
              Item Three
            </TabPanel>
            <TabPanel value={value} index={3}>
              Item Four
            </TabPanel>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

const styles = {
  tab: {
    fontSize: "1.125rem",
    py: 3,
    px: 2,
  },
};
