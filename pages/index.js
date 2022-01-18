import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../src/state-management/globalContext";
// Component building block imports
import MissionStatement from "../src/page-blocks/home/MissionStatement";
import SearchOptionsRow1 from "../src/page-blocks/home/PremadeSearches1";
import LayoutContainer from "../src/custom-components/LayoutContainer";
import Cuisines from "../src/page-blocks/home/Cuisines";
import RestaurantTypes from "../src/page-blocks/home/RestaurantTypes";
import Footer from "../src/custom-components/Footer";
import LocationModal from "../src/custom-components/LocationModal/LocationModal";

export default function index() {
  const { establishNewLocation } = useGlobalContext();
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
      // If geolocation returns an error, render the error modal
      const onError = function (builtInParam) {
        revealModal();
      };
      // If geolocation is supported, find our current position and save it to Global Context
      const onSuccess = async function (builtInParam) {
        try {
          // Extract lat and loongitude from Geolocation API
          const latitude = await builtInParam.coords.latitude;
          const longitude = await builtInParam.coords.longitude;
          // Request API route that will give us the location name for the coordinates we supply
          const apiRouteResponse = await axios.get("/api/mapquest", {
            latitude, // send it lat and long (will be required to make a request to mapquest's API)
            longitude,
          });
          console.log(apiRouteResponse); //! log for now
          // Use in this ContextAPI function that saves it to localStorage and to the project's state
          // establishNewLocation(apiRouteResponse);
        } catch (err) {
          revealModal(); // Render the location error modal
        }
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
