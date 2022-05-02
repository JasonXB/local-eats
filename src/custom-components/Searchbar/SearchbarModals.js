import React from "react";
import LocationDenialModal from "../Modals/LocationDenial/DenialModal";
import PredeterminedLocationModal from "../Modals/Predetermined";
import GeoUnsupportedModal from "../Modals/GeoUnsupported";
import DynamicSnackbar from "../DynamicSnackbar";
import SpecifyLocation from "../Modals/SpecifyLocation";
import GeoLocked from "../Modals/GeoLocked";

export default function SearchbarModals() {
  return (
    <>
      <LocationDenialModal />
      <PredeterminedLocationModal />
      <GeoUnsupportedModal />
      <DynamicSnackbar msg="Must select a location first" />
      <SpecifyLocation />
      <GeoLocked />
    </>
  );
}
