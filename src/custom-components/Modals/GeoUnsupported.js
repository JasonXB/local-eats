import React from 'react';
import { useSelector, useDispatch } from "react-redux";

export default function GeoUnsupported() {
  //@ Import redux variables that determine the visibility of our entire component
  const geolocationUnsupported= useSelector((state) => state.homepageModals.geolocationUnsupported); // prettier-ignore
  if(!geolocationUnsupported) return "" // if falsy, don't render this component
  

  return <div></div>;
}
