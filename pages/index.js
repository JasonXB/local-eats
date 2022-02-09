import React from "react";
// Component building block imports
import MissionStatement from "../src/page-blocks/home/MissionStatement";
import SearchOptionsRow1 from "../src/page-blocks/home/PremadeSearches1";
import LayoutContainer from "../src/custom-components/LayoutContainer";
import Cuisines from "../src/page-blocks/home/Cuisines";
import RestaurantTypes from "../src/page-blocks/home/RestaurantTypes";
import Footer from "../src/custom-components/Footer";
import LocationDenialModal from "../src/custom-components/Modals/LocationDenial/DenialModal";
import GeoUnsupportedModal from "../src/custom-components/Modals/GeoUnsupported";
import PredeterminedLocationModal from "../src/custom-components/Modals/Predetermined";
import DynamicSnackbar from "../src/custom-components/DynamicSnackbar";
import Navbar from "../src/custom-components/Navbar/Navbar";

export default function index() {
  return (
    <>
      <Navbar />
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
      <LocationDenialModal />
      <PredeterminedLocationModal />
      <GeoUnsupportedModal />
      <DynamicSnackbar msg="Must select a location first" />
    </>
  );
}
