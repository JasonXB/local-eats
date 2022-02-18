import React from "react";
import { Typography, Box, Stack, Rating } from "@mui/material"; // prettier-ignore
import { mix } from "../../../../../styles/styleMixins";

export default function RatingFilter() {
  return (
    <Stack spacing={1} sx={styles.container}>
      <Typography variant="h4" sx={styles.tab}>DISTANCE</Typography>
      <Box sx={{ m: 0 }}></Box>

      <Typography variant="h4" sx={styles.tab}>PRICE</Typography>
      <Box sx={{ m: 0 }}></Box>

      <Typography variant="h4" sx={styles.tab}>RATING</Typography>
      <Rating
        name="half-rating"
        defaultValue={0}
        precision={0.5}
        // onChange={} // should update redux store vals
        sx={{
          m:0,
          "span.MuiRating-decimal": {
            fontSize: "2rem",
          },
        }}
      />

      <Typography variant="h4" sx={styles.tab}>
        HOURS
      </Typography>
      <Box sx={{ m: 0 }}></Box>
    </Stack>
  );
}

const styles = {
  container: {
    width: "100%",
    height: "100%",
    display: "grid",
    gridTemplateColumns: "auto 1fr",
    gridTemplateRows: "repeat(4, auto)",
    // Quash a few auto-applied margins
    "h4.MuiTypography-root": { margin: 0 },
    "div.MuiBox-root": { margin: 0 },
    "span.MuiRating-root": { margin: 0 },
  },
  tab: {
    py: 2,
    px: 2,
    borderRight: "1px solid black",
    mt: 0,
  },
};
