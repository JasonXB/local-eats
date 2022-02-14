import React, { useState, useLayoutEffect, useEffect } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ChangeEmail from "../../../src/page-blocks/authForms/ChangeEmail";
import ChangePassword from "../../../src/page-blocks/authForms/ChangePassword";
import DeleteAccount from "../../../src/page-blocks/authForms/DeleteAccount";
import { getSession } from "next-auth/react";
import useWindowSize from "../../../src/utility-functions/general/useWindowSize";

// Redirect users to homepage if they come here offline
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req }); // falsy if not logged in. session obj if we are
  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin", // if offline, redirect to sign in page
        permanent: false, // don't always want to redirect (only if user's logged in)
      },
    };
  }
  return { props: { session } };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ManageAccount(props) {
  const router = useRouter();

  // The URL of this dynamic page dictates which tab's selected @ start
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // The URL should determine which panel gets auto-selected first
  useEffect(() => {
    const query = router.query.panel;
    const tabSelect = {
      general: 0,
      "change-email": 0,
      "change-password": 1,
      "delete-account": 2,
    };
    if (!tabSelect[query]) setValue(0);
    else setValue(tabSelect[query]);
    
    /*  Use the following links across your project
    /auth/manage-account/general                  /auth/manage-account/change-email     
    /auth/manage-account/change-password          /auth/manage-account/delete-account   */
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
        variant="fullWidth"
      >
        <Tab label="Change Email" {...a11yProps(0)} />
        <Tab label="Change Password" {...a11yProps(1)} />
        <Tab label="Delete Account" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <ChangeEmail />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ChangePassword />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <DeleteAccount />
      </TabPanel>
    </Box>
  );
}
