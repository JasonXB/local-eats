import * as React from "react";
import { Stack } from "@mui/material";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
//--

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

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Stack
      sx={{
        display: "flex",
        height: "100vh",
      }}
    >
      <Typography variant="h2" sx={styles.title}>
        Edit Local Eats Account
      </Typography>
      <Box
        sx={styles.panelContainer}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          <Tab
            label="Change Password"
            sx={styles.tabTitles}
            {...a11yProps(0)}
          />
          <Tab label="Change Email" sx={styles.tabTitles} {...a11yProps(1)} />
          <Tab label="Delete Account" sx={styles.tabTitles} {...a11yProps(2)} />
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
      </Box>
    </Stack>
  );
}

const styles = {
  tabTitles: {
    fontSize: "1.25rem",
    mt: 4,
  },
  title: {
    flex: "0 0 auto", // make it so this doesn't grow or shrink
    mx: "auto",
    my: 3,
  },
  panelContainer: {
    flex: "1 1 auto", // make this extend as far as it can to occupy the entire viewport
    bgcolor: "background.paper",
    display: "flex",
    borderTop: "1px solid #D3D3D3",
  },
};
