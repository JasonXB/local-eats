import React from "react";
//  prettier-ignore
import { Typography, Box, Divider, Stack } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { mix } from "../../styles/styleMixins";
import { footerAnchors } from "./Footer";

export default function FooterMobile() {
  return (
    <Box
      sx={(theme) => {
        return {
          mx: 2,
          [theme.breakpoints.up("sm")]: {
            display: "none",
          },
        };
      }}
    >
      <Typography
        variant="h3"
        sx={{
          py: "2.5rem",
          fontWeight: 600,
          textAlign: "center",
        }}
      >
        Search data provided by Yelp Fusion™
      </Typography>
      {Object.keys(footerAnchors).map((headerText, i) => {
        return (
          <Accordion disableGutters key={i}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h6">{headerText}</Typography>
            </AccordionSummary>{" "}
            <AccordionDetails
              sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}
            >
              {Object.keys(footerAnchors[headerText]).map((anchorText, i) => {
                return (
                  <Box
                    component="a"
                    key={i}
                    href={footerAnchors[headerText][anchorText]}
                    // onClick={relocate}
                    sx={{
                      mb: 0.8,
                      mr: 3,
                      ...mix.anchorStyling,
                    }}
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
      <Typography sx={{ pb: 4, textAlign: "center" }}>
        Copyright © 2004–2022 Yelp Incorporated.
      </Typography>
    </Box>
  );
}

/*

<Accordion disableGutters>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
        <Typography>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>

*/
