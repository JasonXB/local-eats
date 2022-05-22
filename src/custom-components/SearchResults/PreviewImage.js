import React from "react";
import { Box } from "@mui/material";
import { ImageViewer } from "react-image-viewer-dv";

// A reusable component for the zoomable preview images on the [businessID].js page
export default function PreviewImage({ index, src }) {
  // Dim the brightness when you hover over an image
  const onHover = React.useCallback((e) => e.target.classList.add("darken"), []); // prettier-ignore
  const onLeave = React.useCallback((e) => e.target.classList.remove("darken"), []); // prettier-ignore

  // Determine place in grid
  let gridRow, gridColumn;
  if (index === 0) {
    (gridRow = "1/3"), (gridColumn = "1/2");
  } else if (index === 1) {
    (gridRow = "1/2"), (gridColumn = "2/3");
  }
  return (
    <Box sx={{ gridRow, gridColumn, height: "9rem" }}>
      <ImageViewer>
        <Box
          component="img"
          key={index}
          src={src}
          sx={{ ...styles.image(index) }}
          alt=""
          onMouseEnter={onHover}
          onMouseLeave={onLeave}
        />
      </ImageViewer>
    </Box>
  );
}

const styles = {
  image: (num) => {
    if (num === 0)
      return {
        height: "9rem",
        objectFit: "cover",
        width: "100%",
        borderRadius: 2,
        ["@media (min-width: 550px)"]: { height: "19rem" },
      };
    else
      return {
        objectFit: "cover",
        width: "100%",
        height: "9rem",
        borderRadius: 2,
      };
  },
};
