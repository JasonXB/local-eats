import React from "react";
import Pagination from "@mui/material/Pagination";
import { Typography, Box, Button } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import IconButton from "@mui/material/IconButton";
import { mix } from "../../../../styles/styleMixins";

export default function PaginationRow({ numberOfHits }) {
  // Decide how many pages are required to showcase your search results
  let requiredPages = calcPgRequirements(numberOfHits);
  if (requiredPages < 2) return null; // render no pagination btns if we only have 1 pg of results
  return (
    <>
      <Pagination
        count={requiredPages}
        variant="outlined"
        color="secondary"
        size="large"
        defaultPage={1} // which page we start on
        siblingCount={0} // how many buttons surround the pg we're on currently
        boundaryCount={0} // how many pages shown at start and end
        sx={{ mx: "auto" }}
      />
      
      {requiredPages > 2 && <Typography variant="h6" component="p" sx={{ mt: 4 }}>
        Jump to page "__" of {requiredPages}
      </Typography>}
      {requiredPages > 2 && <Box sx={{ ...mix.flexRow, alignItems: "center" }}>
        <OutlinedInput
          placeholder="page #"
          sx={{ width: 80, mt: 2, height: 42 }}
        />
        <IconButton
          aria-label="jump to page"
          sx={{ mt: 2, ml: 2.5, border: "1px solid rgba(0, 0, 0, 0.23)" }}
        >
          <DoubleArrowIcon fontSize="small" />
        </IconButton>
      </Box>}
    </>
  );
}

function calcPgRequirements(numberOfHits) {
  let requiredPages;
  let divisbleBy50 = numberOfHits % 50 === 0; // Bool
  if (divisbleBy50) requiredPages = Math.trunc(numberOfHits / 50);
  else requiredPages = Math.trunc(numberOfHits / 50) + 1;
  return requiredPages;
}
