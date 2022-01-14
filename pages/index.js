import React from "react";
// Component building block imports
import MissionStatement from "../src/page-blocks/home/MissionStatement";
import SearchOptionsRow1 from "../src/page-blocks/home/PremadeSearches1";
import { Box, Container } from "@mui/material";
import LayoutContainer from "../src/custom-components/LayoutContainer";
import Cuisines from "../src/page-blocks/home/Cuisines";
export default function index() {
  return (
    <>
      <MissionStatement />
      <LayoutContainer marginAbove="36px">
        <SearchOptionsRow1 />
      </LayoutContainer>
      <Cuisines></Cuisines>
    </>
  );
}
