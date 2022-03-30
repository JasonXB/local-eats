import React from "react";
import { Typography, Box, Stack, Divider } from "@mui/material";
import { mix } from "../../styles/styleMixins";
import FooterMobile from "./FooterMobile";
import useVisitSearchPage from "../utility-functions/search/useVisitSearchPage";
import useGetFilters from "../utility-functions/search/useGetFilters";
import LayoutContainer from "./LayoutContainer";

export default function Footer() {
  const filters = useGetFilters();
  const navToSearchPage = useVisitSearchPage();

  return (
    <LayoutContainer>
      {/* Only appears on screen sizes below sm (700px) */}
      <FooterMobile />
      {/* Only appears on screen sizes above sm (700px) */}
      <Box sx={stylesLocal.container}>
        <Typography variant="h2" sx={stylesLocal.title}>
          Seek out all kinds of places
        </Typography>
        <Box sx={stylesLocal.gridContainer}>
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
                        navToSearchPage({
                          term: footerAnchors[headerText][anchorText],
                          sort_by: filters.sort_by,
                        })
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
        <Typography sx={stylesLocal.copywright}>
          Data provided by the Yelp Fusion™ API.
        </Typography>
      </Box>
    </LayoutContainer>
  );
}

// We are going to Render a list using this Object twice
// Round 1: To list out each category title
// Round 2: To create anchor tags that navigate users to a new page
export const footerAnchors = {
  "Large Chains": {
    Malls: "mall",
    Pharmacies: "pharmacy",
    Grocery: "grocery",
    Furniture: "furniture",
    "Men's Clothing": "men's clothing",
    "Women's Clothing": "women's clothing",
    Banks: "banks",
  },
  Tech: {
    "Virtual Reality": "virtual reality",
    "Video Game Stores": "video games",
    Arcades: "arcades",
    Computers: "computers",
    Electronics: "electronics",
    "IT Services": "IT services",
    "Electronics Repair": "electronics repair",
  },
  Fitness: {
    Gyms: "gyms",
    Supplements: "vitamins supplements",
    Skiing: "skiing",
    "Martial Arts": "martial arts",
    "Swimming Pools": "swimming pools",
    "Sports Equipment": "sportswear",
    "Rock Climbing": "rock climbing",
  },
  Automotive: {
    "Driving Schools": "driving schools",
    "Car Dealerships": "car dealers",
    "Auto Repair": "auto repair",
    "Gas Stations": "service stations",
    "Auto Detailing": "auto detailing",
  },
  Educational: {
    Preschool: "preschools",
    Elementary: "elementary schools",
    "High school": "highschools",
    Tutoring: "private tutors",
    "Higher Education": "college",
  },
  Miscellaneous: {
    "Pawn Shops": "pawn",
    "Thrift Stores": "thrift stores",
    Massage: "massage",
    Dispensaries: "cannabis",
    "Pet stores": "petstore",
    Casinos: "casinos",
  },
};

const stylesLocal = {
  container: (theme) => ({
    pt: 6,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  }),
  title: {
    mb: "2.5rem",
    fontWeight: 600,
    textAlign: "center",
  },
  gridContainer: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr" },
  copywright: { pb: 4, textAlign: "center" },
};
