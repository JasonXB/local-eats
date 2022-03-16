import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // stops the map from appearing distorted
import { icon } from "leaflet";

// Use a custom location icon since the default one isn't working
// Use an SVG since you can customize color and maintain aspect ratio easily
const ICON = icon({
  iconUrl: "/mapImages/gps.svg", // in public folder
  iconSize: [24, 24],
});

// These parameters make this a static map as oopposed to a dynamic one
// We minimize the user interactions available
const interactionOptions = {
  zoomControl: false,
  doubleClickZoom: false,
  closePopupOnClick: false,
  dragging: false,
  zoomSnap: false,
  zoomDelta: false,
  trackResize: false,
  touchZoom: false,
  scrollWheelZoom: false,
};

export default function StaticMap({ coords }) {
  // Position on the map is dependent on the props
  const position = coords;
  const style = {
    gridArea: "b", // position in the layout grid
    height: 250,
    width: "100%",
    // maxWidth: 
    justifySelf: "center",
  };

  return (
    <MapContainer
      center={position}
      zoom={15}
      scrollWheelZoom={false}
      style={style}
      {...interactionOptions} // makes this map static and non interactible
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker icon={ICON} position={position} />
    </MapContainer>
  );
}
