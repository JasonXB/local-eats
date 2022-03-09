import React, { useEffect, useState } from "react";
import LinkIcon from "@mui/icons-material/Link";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import DirectionsIcon from "@mui/icons-material/Directions";
import Link from "@mui/material/Link";
import { Typography, Box, Stack, Divider } from "@mui/material";
import { mix } from "../../../styles/styleMixins";
import { useLocationContext } from "../../../state-management/locationContext";
export default function Hours({ hours, infoTableData }) {
  // If the user has a selected location, the maps URL will link to a pg with directions
  // If no location's specified, the maps URL will just point to the restaurant location
  const { locationObject } = useLocationContext();
  const [mapsURL, setMapsURL] = useState(
    `https://www.google.com/maps/search/?api=1&query=${infoTableData.coordinates}`
  );
  useEffect(() => {
    if (!locationObject) return;
    setMapsURL(
      `https://www.google.com/maps/dir/${locationObject.latitude},${locationObject.longitude}/${infoTableData.coordinates}`
    );
  }, [locationObject]);

  return (
    <Stack sx={styles.parent}>
      <Typography sx={{ mb: 1, fontWeight: 600 }} variant="h4">
        Hours
      </Typography>
      <Box sx={styles.openHoursGrid}>
        <Typography sx={{ gridArea: "a" }} variant="p">
          Mon
        </Typography>
        <Typography sx={{ gridArea: "b" }} variant="p">
          {hours.Monday}
        </Typography>
        <Typography sx={{ gridArea: "d" }} variant="p">
          Tues
        </Typography>
        <Typography sx={{ gridArea: "e" }} variant="p">
          {hours.Tuesday}
        </Typography>
        <Typography sx={{ gridArea: "g" }} variant="p">
          Wed
        </Typography>
        <Typography sx={{ gridArea: "h" }} variant="p">
          {hours.Wednesday}
        </Typography>
        <Typography sx={{ gridArea: "j" }} variant="p">
          Thurs
        </Typography>
        <Typography sx={{ gridArea: "k" }} variant="p">
          {hours.Thursday}
        </Typography>
        <Typography sx={{ gridArea: "m" }} variant="p">
          Fri
        </Typography>
        <Typography sx={{ gridArea: "n" }} variant="p">
          {hours.Friday}
        </Typography>
        <Typography sx={{ gridArea: "p" }} variant="p">
          Sat
        </Typography>
        <Typography sx={{ gridArea: "q" }} variant="p">
          {hours.Saturday}
        </Typography>
        <Typography sx={{ gridArea: "s" }} variant="p">
          Sun
        </Typography>
        <Typography sx={{ gridArea: "t" }} variant="p">
          {hours.Sunday}
        </Typography>
        {/* The Yelp URL, phone number, and Google Maps Link */}
        <Stack sx={styles.infoTableGrid}>
          <Link
            color="secondary"
            sx={{ gridArea: "a", justifySelf: "start" }}
            href={infoTableData.yelpURL}
            underline="hover"
          >
            Visit Yelp Page
          </Link>
          <LinkIcon fontSize="large" sx={{ gridArea: "b", ml: 6 }} />
          <Divider sx={{ gridArea: "x", width: "100%" }} />
          <Typography sx={{ gridArea: "c", justifySelf: "start" }} variant="p">
            {infoTableData.phoneNumber}
          </Typography>
          <Divider sx={{ gridArea: "y", width: "100%" }} />
          <PhoneInTalkIcon fontSize="large" sx={{ gridArea: "d" }} />
          <Link
            href={mapsURL}
            underline="hover"
            sx={{ gridArea: "e", justifySelf: "start" }}
            variant="p"
          >
            Get directions
            <br />
            {infoTableData.address}
          </Link>
          <DirectionsIcon fontSize="large" sx={{ gridArea: "f" }} />
        </Stack>
      </Box>
    </Stack>
  );
}
const styles = {
  parent: {
    fontSize: "1rem",
    fontWeight: 500,
    ...mix.responsiveLayout,
    mt: 4,
  },
  openHoursGrid: {
    display: "grid",
    gridTemplateColumns: "auto auto 1fr auto",
    gridTemplateRows: "repeat(7, auto)",
    gridTemplateAreas: `
    "a b c z"
    "d e f z"
    "g h i z"
    "j k l z"
    "m n o z"
    "p q r z"
    "s t u z"`,
    gridGap: "0.5rem 2rem",
  },
  infoTableGrid: {
    gridArea: "z",
    display: "grid",
    gridTemplateColumns: "1fr auto",
    gridTemplateRows: "repeat(3, auto)",
    justifyItems: "end",
    alignItems: "center",
    gridTemplateAreas: `
    "a b"
    "x x" 
    "c d"
    "y y"
    "e f"`,
    fontWeight: 500,
    border: "1px solid rgb(235,235,235)",
    p: 2,
  },
};
