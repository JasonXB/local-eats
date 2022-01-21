import React, { useEffect } from "react";
import { useLocationContext } from "../state-management/locationContext";
import LocationDenial from "../custom-components/ErrorModals/LocationDenial";
import GeoUnsupported from "../custom-components/ErrorModals/GeoUnsupported";

// This abstracts the task of deciding what modal to display based on ContextAPI state
export default function ConditionalModal() {
  const { modalVisible } = useLocationContext(); // import a state value from ContextAPI
  let modalToShow = undefined; // render nothing by default

  // Decide what modal should be rendered based on the state value at any given time
  useEffect(() => {
    if (modalVisible === "case1") modalToShow = <GeoUnsupported />;
    if (modalVisible === "case2") modalToShow = <LocationDenial />;
    else modalToShow = undefined; // render nothing
  }, [modalVisible]); // decide again whenever modalVisible changes

  return { modalToShow };
}
