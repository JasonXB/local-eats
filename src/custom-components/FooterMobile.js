import React from "react";
import { Typography, Box, Divider, Stack } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { mix } from "../../styles/styleMixins";
import { footerAnchors } from "./Footer";

export default function FooterMobile() {
  return (
    <Box sx={stylesLocal.container}>
      <Typography variant="h3" sx={stylesLocal.title}>
        Search other types of businesses
      </Typography>
      {Object.keys(footerAnchors).map((headerText, i) => {
        return (
          <Accordion disableGutters key={i}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={headerText}
              // id={"panel1a-header"}
            >
              <Typography variant="h6">{headerText}</Typography>
            </AccordionSummary>{" "}
            <AccordionDetails sx={stylesLocal.accordionGrid}>
              {Object.keys(footerAnchors[headerText]).map((anchorText, i) => {
                return (
                  <Box
                    component="a"
                    key={i}
                    href={footerAnchors[headerText][anchorText]}
                    // onClick={relocate}
                    sx={stylesLocal.anchor}
                  >
                    {anchorText}
                  </Box>
                );
              })}{" "}
            </AccordionDetails>
          </Accordion>
        );
      })}
      <Divider sx={{ mt: 4, mb: 4 }} />
      <Typography sx={stylesLocal.copywright}>
        Search data provided by the Yelp Fusion™ API.
      </Typography>
    </Box>
  );
}

const stylesLocal = {
  container: (theme) => ({ [theme.breakpoints.up("sm")]: { display: "none" } }),
  title: { my: "2.5rem", fontWeight: 600, textAlign: "center" },
  accordionGrid: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)" },
  anchor: { mb: 0.8, mr: 3, ...mix.anchorStyling },
  copywright: { pb: 4, textAlign: "center" },
};
