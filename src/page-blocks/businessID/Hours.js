import React from "react";
import { Typography, Box, Stack } from "@mui/material";

export default function Hours({ hours }) {
  return (
    <Stack sx={styles.container}>
      <Typography sx={{ gridArea: "a" }} variant="p">
        Mon
      </Typography>
      <Typography sx={{ gridArea: "b" }} variant="p">
        {hours.Monday.join(" - ")}
      </Typography>

      <Typography sx={{ gridArea: "d" }} variant="p">
        Tues
      </Typography>
      <Typography sx={{ gridArea: "e" }} variant="p">
        {hours.Tuesday.join(" - ")}
      </Typography>

      <Typography sx={{ gridArea: "g" }} variant="p">
        Wed
      </Typography>
      <Typography sx={{ gridArea: "h" }} variant="p">
        {hours.Wednesday.join(" - ")}
      </Typography>

      <Typography sx={{ gridArea: "j" }} variant="p">
        Thurs
      </Typography>
      <Typography sx={{ gridArea: "k" }} variant="p">
        {hours.Thursday.join(" - ")}
      </Typography>

      <Typography sx={{ gridArea: "m" }} variant="p">
        Fri
      </Typography>
      <Typography sx={{ gridArea: "n" }} variant="p">
        {hours.Friday.join(" - ")}
      </Typography>

      <Typography sx={{ gridArea: "p" }} variant="p">
        Sat
      </Typography>
      <Typography sx={{ gridArea: "q" }} variant="p">
        {hours.Saturday.join(" - ")}
      </Typography>

      <Typography sx={{ gridArea: "s" }} variant="p">
        Sun
      </Typography>
      <Typography sx={{ gridArea: "t" }} variant="p">
        {hours.Sunday.join(" - ")}
      </Typography>
    </Stack>
  );
}
const styles = {
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(3, auto) 1fr",
    gridTemplateRows: "repeat(7, auto)",
    gridTemplateAreas: `
    "a b c z0"
    "d e f z1"
    "g h i z2"
    "j k l z3"
    "m n o z4"
    "p q r z5"
    "s t u z6"`,
    gridGap: "0.5rem 2rem" ,
    px: 4,
    mt: 4,
    fontSize: "1rem",
    ["@media (min-width: 500px)"]: {
      fontSize: "1.25rem",
    }
  },
};
