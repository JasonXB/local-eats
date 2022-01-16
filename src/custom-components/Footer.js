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
          Search data provided by Yelp Fusion™
        </Typography>
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
          {Object.keys(footerAnchors).map((headerText, index) => {
            return (
              <Stack key={index}>
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
          Copyright © 2004–2022 Yelp Incorporated.
        </Typography>
      </Box>
    </>
  );
}

// We are going to Render a list using this Object twice
// Round 1: To list out each category title
// Round 2: To create anchor tags that navigate users to a new page
export const footerAnchors = {
  About: {
    "About Yelp": "https://www.yelp.com/about",
    Careers: "https://www.yelp.com/careers/home",
    Press: "https://www.yelp.com/press",
    "Investor Relations": "http://yelp-ir.com/",
    "Trust & Safety": "https://trust.yelp.com/",
    "Content Guidelines": "https://www.yelp.com/guidelines",
    "Accessibility Statement":
      "https://www.yelp-support.com/article/Yelp-Accessibility-Statement",
    "Terms of Service": "https://www.yelp.com/static?p=tos",
    "Privacy Policy": "https://www.yelp.com/tos/privacy_policy",
    "Ad Choices": "https://www.yelp.com/static?p=tos#third-parties",
  },
  Discover: {
    "Project Cost Guides": "https://www.yelp.com/costs",
    Collections: "https://www.yelp.com/collections",
    Talk: "https://www.yelp.com/talk",
    Events: "https://www.yelp.com/events",
    "The Local Yelp": "https://www.yelp.com/local_yelp",
    "Yelp Blog": "https://officialblog.yelp.com/",
    Support: "https://www.yelp-support.com/",
    "Yelp Mobile": "https://www.yelp.com/yelpmobile?source=footer",
    Developers: "https://www.yelp.com/developers?country=US",
    RSS: "https://www.yelp.com/rss",
  },
  "Yelp for Business": {
    "Claim your Business Page":
      "https://biz.yelp.com/?utm_source=footer&utm_medium=www&utm_content=claim_footer_link&utm_campaign=claim_business",
    "Advertise on Yelp": "https://www.yelp.com/advertise",
    "Yelp for Restaurant Owners": "https://restaurants.yelp.com/",
    "Table Management":
      "https://restaurants.yelp.com/products/waitlist-table-management-software/",
    "Business Success Stories": "https://biz.yelp.com/support/case_studies",
    "Business Support":
      "https://www.yelp-support.com/Yelp_for_Business?l=en_US",
    "Yelp Blog for Business ": "https://www.yelpblog.com/section/business",
  },
};
