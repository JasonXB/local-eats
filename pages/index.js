import React from "react";
// Component building block imports
import MissionStatement from "../src/page-blocks/home/MissionStatement";
import SearchOptionsRow1 from "../src/page-blocks/home/PremadeSearches1";
import { Box, Container } from "@mui/material";
import LayoutContainer from "../src/custom-components/LayoutContainer";
export default function index() {
  return (
    <>
      <MissionStatement />
      <LayoutContainer marginAbove="36px">
        <SearchOptionsRow1 />
      </LayoutContainer>
      <h2>Howdy</h2>
    </>
  );
}

// const gridPlacement = {
//   customBreakpoint: `@media (min-width:500px)`,
//   webpageLayout: {
//     display: "grid",
//     gridTemplateColumns: "100%",
//     gridTemplateRows: "auto auto",
//     [`@media (min-width:500px)`]: {
//       gridTemplateColumns: "1fr 1100px 1fr",
//     },
//   },
//   // mission : {
//   //   gri
//   // }
// };
