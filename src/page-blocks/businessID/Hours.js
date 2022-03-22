import React, { useEffect, useState, useCallback } from "react";
import LinkIcon from "@mui/icons-material/Link";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import DirectionsIcon from "@mui/icons-material/Directions";
import Link from "@mui/material/Link";
import { Typography, Box, Stack, Divider } from "@mui/material";
import { mix } from "../../../styles/styleMixins";
import { useLocationContext } from "../../../state-management/locationContext";
import dynamic from "next/dynamic";

export default function Hours({ hours, infoTableData, coords }) {
  const { locationObject } = useLocationContext();
  // console.log(999);
  // console.log(infoTableData);
  // If no location's specified, the maps URL will just point to the restaurant location
  const [mapsURL, setMapsURL] = useState(`https://maps.google.com?daddr=${infoTableData.destination}`); // prettier-ignore
  // If the user has a selected location, the maps URL will link to a pg with directions
  useEffect(() => {
    if (!locationObject) return;
    setMapsURL(
      `https://www.google.com/maps/dir/?api=1&origin=${locationObject.latitude},${locationObject.longitude}&destination=${infoTableData.destination}`
    );
  }, [locationObject]);

  const StaticMap = useCallback(
    dynamic(
      () => import("../../../src/page-blocks/businessID/StaticMap"), // replace '@components/map' with your component's location
      { ssr: false } // prevents server-side render
    ),
    []
  );

  return (
    <>
      <Stack sx={styles.parent}>
        <Typography sx={{ mb: 2, fontWeight: 600 }} variant="h4">
          Hours and Location
        </Typography>

        <Box sx={styles.layoutGrid}>
          <Box sx={styles.hoursGrid}>
            <Typography sx={{ gridArea: "a" }} variant="p">
              Mon
            </Typography>
            <Typography sx={{ gridArea: "b" }} variant="p">
              {hours ? hours.Monday : "hours unknown"}
            </Typography>
            <Typography sx={{ gridArea: "c" }} variant="p">
              Tues
            </Typography>
            <Typography sx={{ gridArea: "d" }} variant="p">
              {hours ? hours.Tuesday : "hours unknown"}
            </Typography>
            <Typography sx={{ gridArea: "e" }} variant="p">
              Wed
            </Typography>
            <Typography sx={{ gridArea: "f" }} variant="p">
              {hours ? hours.Wednesday : "hours unknown"}
            </Typography>
            <Typography sx={{ gridArea: "g" }} variant="p">
              Thurs
            </Typography>
            <Typography sx={{ gridArea: "h" }} variant="p">
              {hours ? hours.Thursday : "hours unknown"}
            </Typography>
            <Typography sx={{ gridArea: "i" }} variant="p">
              Fri
            </Typography>
            <Typography sx={{ gridArea: "j" }} variant="p">
              {hours ? hours.Friday : "hours unknown"}
            </Typography>
            <Typography sx={{ gridArea: "k" }} variant="p">
              Sat
            </Typography>
            <Typography sx={{ gridArea: "l" }} variant="p">
              {hours ? hours.Saturday : "hours unknown"}
            </Typography>
            <Typography sx={{ gridArea: "m" }} variant="p">
              Sun
            </Typography>
            <Typography sx={{ gridArea: "n" }} variant="p">
              {hours ? hours.Sunday : "hours unknown"}
            </Typography>
          </Box>
          {/* The map with a pointer at the restaurant location */}
          <StaticMap coords={coords} />
          {/* The Yelp URL, phone number, and Google Maps Link */}
          <Stack sx={styles.infoTableGrid}>
            <Link
              color="secondary"
              sx={{ gridArea: "a", justifySelf: "start", mb: 1 }}
              href={infoTableData.yelpURL}
              underline="hover"
            >
              Visit Yelp Page
            </Link>
            <LinkIcon fontSize="large" sx={{ gridArea: "b", ml: 2, mb:1 }} />
            <Divider sx={{ gridArea: "x", width: "100%" }} />
            <Typography
              sx={{ gridArea: "c", justifySelf: "start", my: 1 }}
              variant="p"
            >
              {infoTableData.phoneNumber}
            </Typography>
            <Divider sx={{ gridArea: "y", width: "100%" }} />
            <PhoneInTalkIcon fontSize="large" sx={{ gridArea: "d" }} />
            <Link
              href={mapsURL}
              underline="hover"
              sx={(theme) => ({
                gridArea: "e",
                justifySelf: "start",
                mt: 1,
                color: theme.palette.info.main,
              })}
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
    </>
  );
}

// Google maps URL's guide:
// https://gearside.com/easily-link-to-locations-and-directions-using-the-new-google-maps/
// Remember, you can mix using coordinates and string addresses when linking to a directions page
// We do that in this component:  coordinates for origin/start point → verbal address for destination

const styles = {
  parent: {
    fontSize: "1rem",
    fontWeight: 500,
    ...mix.responsiveLayout,
    mt: 4,
  },
  // Grid containing hours, map, and other details
  layoutGrid: {
    display: "grid",
    gridGap: "2rem 2rem",
    gridTemplateAreas: `
      "a"
      "c"
      "b"`,
    ["@media (min-width: 600px)"]: {
      gridTemplateColumns: "auto 17rem",
      gridTemplateAreas: `
      "a c"
      "b b"`,
    },
    ["@media (min-width: 1000px)"]: {
      gridGap: "0.5rem 4rem",
      gridTemplateColumns: "auto 1fr auto",
      gridTemplateAreas: ` "a b c"`,
    },
  },
  infoTableGrid: {
    gridArea: "c", // position in the layout grid
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
  // Grid containing operating hours
  hoursGrid: {
    gridArea: "a", // position in the layout grid
    display: "grid",
    gridTemplateColumns: "auto auto",
    gridTemplateRows: "repeat(7, auto)",
    gridTemplateAreas: `
    "a b"
    "c d"
    "e f"
    "g h"
    "i j"
    "k l"
    "m n"`,
    gridGap: "0.5rem 2rem",
    width: "16.5rem",
  },
};
