import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // stops the map from appearing distorted
import { icon } from "leaflet";

// Use a custom icon since the default one isn't working 
// Use SVG's since you can customize color and maintain ratio easily
const ICON = icon({
  iconUrl: "/mapImages/gps.svg",
  iconSize: [24, 24],
});

export default function StaticMap() {
  // Position on the map is dependent on the props
  const position = [43.8549, -79.4365];
  const style = { height: 500, width: 500 };

  return (
    <MapContainer
      center={position}
      zoom={15}
      scrollWheelZoom={false}
      style={style}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker icon={ICON} position={position} />
    </MapContainer>
  );
}
