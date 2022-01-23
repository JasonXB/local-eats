import React, { useState, useEffect } from "react";
import { useLocationContext } from "../src/state-management/locationContext";
// Component building block imports
import MissionStatement from "../src/page-blocks/home/MissionStatement";
import SearchOptionsRow1 from "../src/page-blocks/home/PremadeSearches1";
import LayoutContainer from "../src/custom-components/LayoutContainer";
import Cuisines from "../src/page-blocks/home/Cuisines";
import RestaurantTypes from "../src/page-blocks/home/RestaurantTypes";
import Footer from "../src/custom-components/Footer";
import LocationDenial from "../src/custom-components/Modals/LocationDenial/whole";

export default function index() {
  const { modalVisible, devButton } = useLocationContext();
  // Decide which error module to render when something goes wrong
  // let modalToShow = undefined; // render nothing by default
  // if (modalVisible === "case1") modalToShow = <GeoUnsupported />;
  // else if (modalVisible === "case2") modalToShow = <LocationDenial />;
  // else modalToShow = undefined; // render nothing
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
      {/* {modalToShow} */}
      {devButton}
    </>
  );
}
