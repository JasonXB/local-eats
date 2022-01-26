import React from 'react';
import { Typography, Box } from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import { mix } from '../../../../styles/styleMixins';

export default function GeoUnsupported() {
  //@ Import redux variables that determine the visibility of our entire component
  const geolocationUnsupported= useSelector((state) => state.homepageModals.geolocationUnsupported); // prettier-ignore
  if(!geolocationUnsupported) return "" // if falsy, don't render this component
  

  return <>
    
  </>;
}
