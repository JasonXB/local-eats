import React from "react";
import { Typography, Box, IconButton } from '@mui/material'; // prettier-ignore
import { mix } from "../../../styles/styleMixins";
import Brightness2Icon from "@mui/icons-material/Brightness2";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useGlobalContext } from "../../../state-management/globalContext";
export default function ThemeBtn() {
  const { themeString } = useGlobalContext();
  // Decide what theme icon to render based on what the poject's theme is currently
  let themeIcon;
  if (themeString === "light" || !themeString) {
    themeIcon = (
      <>
        <Box sx={{ ...mix.flexRow }}>
          <IconButton
            aria-label="delete"
            size="medium"
            sx={{ color: "#000000" }}
          >
            <Brightness2Icon fontSize="medium" />
          </IconButton>
          <Typography variant="p" sx={styles.enableDarkText}>
            Enable Dark Mode
          </Typography>
        </Box>
      </>
    );
  }
  if (themeString === "dark") {
    themeIcon = (
      <Box sx={{ ...mix.flexRow }}>
        <IconButton
          aria-label="delete"
          size="medium"
          sx={{
            color: "#FFFFFF",
            "&:hover": {
              color: "yellow",
            },
          }}
        >
          <LightModeIcon fontSize="medium" />
        </IconButton>
        <Typography variant="p" sx={styles.enableLightText}>
          Enable light mode
        </Typography>
        
      </Box>
    );
  }
  return <>{themeIcon}</>;
}

const styles = {
  enableDarkText: (theme) => {
    return {
      ml: 1,
      fontWeight: "bold",
      fontSize: "1.2rem",
      color: theme.palette.primary.main,
    };
  },
  enableLightText: (theme) => {
    return {
      ml: 1,
      fontWeight: "bold",
      fontSize: "1.2rem",
      color: theme.palette.common.white,
    };
  },
};
