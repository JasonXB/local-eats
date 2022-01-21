import React, { useState, useEffect } from "react";
import { useLocationContext } from "../src/state-management/locationContext";
// Component building block imports
import MissionStatement from "../src/page-blocks/home/MissionStatement";
import SearchOptionsRow1 from "../src/page-blocks/home/PremadeSearches1";
import LayoutContainer from "../src/custom-components/LayoutContainer";
import Cuisines from "../src/page-blocks/home/Cuisines";
import RestaurantTypes from "../src/page-blocks/home/RestaurantTypes";
import Footer from "../src/custom-components/Footer";
import LocationDenial from "../src/custom-components/ErrorModals/LocationDenial";
import GeoUnsupported from "../src/custom-components/ErrorModals/GeoUnsupported";

export default function index() {
  const { detectLocation, devButton } = useLocationContext();
  // Decide which error module to render when something goes wrong
  
  return (
    <>
      <MissionStatement />
      <LayoutContainer marginAbove="2.25rem">
        <SearchOptionsRow1 />
      </LayoutContainer>
      <LayoutContainer marginAbove="4.5rem">
        <Cuisines />
      </LayoutContainer>
      <LayoutContainer marginAbove="4.5rem">
        <RestaurantTypes />
      </LayoutContainer>
      <LayoutContainer marginAbove="4.5rem" bg="#fffbf7">
        <Footer />
      </LayoutContainer>
      <LocationDenial />
      {devButton}
    </>
  );
}
