import React from "react";
import { mix } from "../../../styles/styleMixins";
//  prettier-ignore
import { Typography, ButtonBase, Box } from '@mui/material';
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Canada from "../../../public/flags/canada.svg";

export default function Cuisines() {
  return (
    <>
      <Typography variant="h2">Popular cuisines around your area</Typography>
      {/* LIST OF CUISINE CARDS */}
      <ButtonBase
        sx={{
          border: "1px solid rgb(232,232,232)",
          padding: "1.25rem 1.5rem",
          "&:hover": {
            boxShadow: `rgba(28, 28, 28, 0.08) 0px 4px 8px`,
          },
        }}
      >
        <Box sx={{ ...mix.flexRow }}>
          <Box sx={{ height: "2rem", width: "3rem" }}>
            <Canada />
          </Box>
          <Typography variant="h5" component="p" sx={{ ml: 2, mt: 0.6 }}>
            Canada
          </Typography>
        </Box>
        <ChevronRightIcon sx={{ ml: 2, mt: 0.6 }} />
      </ButtonBase>
    </>
  );
}
