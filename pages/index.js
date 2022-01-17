import React, { useState, useEffect } from "react";
// Component building block imports
import MissionStatement from "../src/page-blocks/home/MissionStatement";
import SearchOptionsRow1 from "../src/page-blocks/home/PremadeSearches1";
import LayoutContainer from "../src/custom-components/LayoutContainer";
import Cuisines from "../src/page-blocks/home/Cuisines";
import RestaurantTypes from "../src/page-blocks/home/RestaurantTypes";
import Footer from "../src/custom-components/Footer";
import LocationModal from "../src/custom-components/LocationModal/LocationModal";
import { Typography, Box } from "@mui/material";
export default function index() {
  // Use this variable to decide whether the error modal should be visible or not
  // Will be shown if browser doesn't support geolocation, or if the permission got denied
  const [showModal, setShowModal] = useState(false);
  //^ On startup, find the user's location
  useEffect(() => {}, []);
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
      <LocationModal showModal={showModal} />
    </>
  );
}

export const summation = async function () {
  //^ Find current location
  checkLocation();
  //^ Save location to the global context
  //^ Check if a saved location exists
  //^ Override it with our new location
};

export const checkLocation = async function () {
  // Make sure the visitor's browser supports Geolocation
  if (!navigator.geolocation) {
    // If geolocation is denied or not supported, make an error modal appear
    // It'll give the user options that allow them to use the app without it enabled

    return;
  }
  // If geolocation is supported, find our current position and save it to Global Context
  const onSuccess = function (builtInParam) {
    const latitude = builtInParam.coords.latitude;
    const longitude = builtInParam.coords.longitude;
    console.log(latitude, longitude);
  };
  const onError = function (builtInParam) {
    console.error(builtInParam); //! fix
  };
  navigator.geolocation.getCurrentPosition(onSuccess, onError);
};
