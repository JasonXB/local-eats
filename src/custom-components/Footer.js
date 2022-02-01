import React from "react";
import { Typography, Box, Stack, Divider } from "@mui/material";
import { mix } from "../../styles/styleMixins";
import FooterMobile from "./FooterMobile";
export default function Footer() {
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
                      href={footerAnchors[headerText][anchorText]}
                      // onClick={relocate}
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
          Business data provided by the Yelp Fusion™ API.
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
    Malls: "",
    Pharmacies: "",
    Superstores: "",
    Furniture: "",
    Clothing: "",
    Grocery: "",
    "Garden Centers": "",
  },
  Tech: {
    Arcades: "",
    "Video games": "",
    "Virtual Reality": "",
    Computers: "",
    Electronics: "",
    Robotics: "",
    "IT Services": "",
  },
  Fitness: {
    Gyms: "",
    Swimming: "",
    "Sports Equipment": "",
    Supplements: "",
    Swimming: "",
    "Rock Climbing": "",
    Skiing: "",
    "Martial Arts": "",
  },
  Automotive: {
    "Driving Schools": "",
    "Car Dealerships": "",
    Mechanics: "",
    "Body Shops": "",
    Tires: "",
  },
  Educational: {
    "Elementary School": "",
    "High school": "",
    College: "",
    University: "",
    Tutoring: "",
  },
  Miscellaneous: {
    "Pawn Shops": "",
    "Thrift Stores": "",
    Massage: "",
    Dispensaries: "",
    "Pet stores": "",   
  },
};
