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
  const [showModal, setShowModal] = useState(false); //! may belong in Context API
  const revealModal = () => setShowModal(true);
  const hideModal = () => setShowModal(false);
  //^ On startup, find the user's location
  useEffect(() => {
    const checkLocation = async function () {
      // Check the visitor's browser supports Geolocation
      if (!navigator.geolocation) {
        revealModal(); // if it doesn't, show the error Modal
        return;
      }
      // If geolocation is supported, find our current position and save it to Global Context
      const onSuccess = async function (builtInParam) {
        const latitude = await builtInParam.coords.latitude;
        const longitude = await builtInParam.coords.longitude;
        const locatonObject={
          latitude,
          longitude,
          town: "", //! Get from an API
        }
        console.log(latitude, longitude);
        //@ Save to Context API with setPrevLocation
      };
      const onError = function (builtInParam) {
        console.error(builtInParam); //! fix
      };
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    };
  }, []);
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
      <LocationModal
        showModal={showModal}
        revealModal={revealModal}
        hideModal={hideModal}
      />
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
