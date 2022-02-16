import React from "react";
import { Typography, Box, Stack, Divider } from "@mui/material";
import { mix } from "../../styles/styleMixins";
import FooterMobile from "./FooterMobile";
import { useLocationContext } from "../../state-management/locationContext";

export default function Footer() {
  const { checkForSavedLocation } = useLocationContext();

  return (
    <>
      {/* Only appears on screen sizes below sm (700px) */}
      <FooterMobile />
      {/* Only appears on screen sizes above sm (700px) */}
      <Box
        sx={(theme) => {
          return {
            px: 2,
            pt: 6,
            [theme.breakpoints.down("sm")]: {
              display: "none",
            },
          };
        }}
      >
        <Typography
          variant="h2"
          sx={{
            mb: "2.5rem",
            fontWeight: 600,
            textAlign: "center",
          }}
        >
          Search other types of businesses
        </Typography>
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
          {Object.keys(footerAnchors).map((headerText, index) => {
            return (
              <Stack key={index} sx={{ mb: 3 }}>
                <Typography
                  variant="h6"
                  sx={{ mb: "0.75rem", textAlign: "center" }}
                >
                  {headerText}
                </Typography>
                {Object.keys(footerAnchors[headerText]).map((anchorText, i) => {
                  // Store the destination URL using data attributes (reference them in the relocate function)
                  return (
                    <Box
                      component="a"
                      key={i}
                      onClick={() =>
                        checkForSavedLocation(
                          footerAnchors[headerText][anchorText]
                        )
                      }
                      sx={{ mb: 0.8, ...mix.anchorStyling }}
                    >
                      {anchorText}
                    </Box>
                  );
                })}
              </Stack>
            );
          })}
        </Box>
        <Divider sx={{ mt: 4, mb: 4 }} />
        <Typography sx={{ pb: 4, textAlign: "center" }}>
          Data provided by the Yelp Fusion™ API.
        </Typography>
      </Box>
    </>
  );
}

// We are going to Render a list using this Object twice
// Round 1: To list out each category title
// Round 2: To create anchor tags that navigate users to a new page
export const footerAnchors = {
  "Large Chains": {
    Malls: "/search?term=mall",
    Pharmacies: "/search?term=pharmacy",
    Superstores: "/search?term=superstore",
    Grocery: "/search?term=grocery",
    Furniture: "/search?term=furniture",
    "Men's Clothing": "/search?term=menscloth",
    "Women's Clothing": "/search?term=womenscloth",
  },
  Tech: {
    Arcades: "/search?term=arcades",
    "Video Game Stores": "/search?term=videogamestores",
    "Virtual Reality": "/search?term=virtualrealitycenters",
    Computers: "/search?term=computers",
    Electronics: "/search?term=electronics",
    "Electronics Repair": "/search?term=electronicsrepair",
    "IT Services": "/search?term=itservices",
  },
  Fitness: {
    Gyms: "/search?term=gyms",
    "Sports Equipment": "/search?term=sportswear",
    Supplements: "/search?term=vitaminssupplements",
    "Swimming Pools": "/search?term=swimmingpools",
    "Rock Climbing": "/search?term=rock_climbing",
    Skiing: "/search?term=skiing",
    "Martial Arts": "/search?term=martialarts",
  },
  Automotive: {
    "Driving Schools": "/search?term=driving_schools",
    "Car Dealerships": "/search?term=car_dealers",
    "Auto Repair": "/search?term=autorepair",
    "Auto Detailing": "/search?term=auto_detailing",
    "Gas Stations": "/search?term=servicestations",
  },
  Educational: {
    Preschool: "/search?term=preschools",
    "Elementary School": "/search?term=elementaryschools",
    "High school": "/search?term=highschools",
    "Higher Education": "/search?term=collegeuniv",
    Tutoring: "/search?term=privatetutors",
  },
  Miscellaneous: {
    "Pawn Shops": "/search?term=pawn",
    "Thrift Stores": "/search?term=thrift_stores",
    Massage: "/search?term=massage",
    Dispensaries: "/search?term=cannabisdispensaries",
    "Pet stores": "/search?term=petstore",
    Casinos: "/search?term=casinos",
  },
};
