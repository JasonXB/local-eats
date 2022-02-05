import React, { useState, useEffect } from "react";
import { useLocationContext } from "../state-management/locationContext";
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
import { homepageModalActions } from "../state-management/store/homepage/ModalVisibility";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../src/custom-components/Navbar/Navbar";
export default function index() {
  // const dispatch = useDispatch();
  // const revealGeo = () => dispatch(homepageModalActions.geolocationUnsupported()); // prettier-ignore

  // console.log()
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
      {/* Modals that appear conditionally based on states saved in the Redux store */}
      {/* <button onClick={revealGeo}>SHOW GEO UNSUPPORTED</button> */}
      <LocationDenialModal />
      <PredeterminedLocationModal />
      <GeoUnsupportedModal />
      <DynamicSnackbar msg="Must select a location first" />
    </>
  );
}
