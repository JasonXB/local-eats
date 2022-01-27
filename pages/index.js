import React, { useState, useEffect } from "react";
import { useLocationContext } from "../state-management/locationContext";
// Component building block imports
import MissionStatement from "../src/page-blocks/home/MissionStatement";
import SearchOptionsRow1 from "../src/page-blocks/home/PremadeSearches1";
import LayoutContainer from "../src/custom-components/LayoutContainer";
import Cuisines from "../src/page-blocks/home/Cuisines";
import RestaurantTypes from "../src/page-blocks/home/RestaurantTypes";
import Footer from "../src/custom-components/Footer";
import DenialModal from "../src/custom-components/Modals/LocationDenial/DenialModal";
import GeoUnsupported from "../src/custom-components/Modals/GeoUnsupported";
import PredeterminedModal from "../src/custom-components/Modals/Predetermined";
export default function index() {
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
      {/* Modals that appear conditionally based on states saved in the Redux store */}
      <DenialModal />
      <PredeterminedModal />
      <GeoUnsupported />
    </>
  );
}
