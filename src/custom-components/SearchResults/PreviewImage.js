import React from "react";
import { Box } from "@mui/material";

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
    <Box
      component="img"
      key={index}
      src={src}
      // prettier-ignore
      sx={{ gridRow, gridColumn, ...styles.image(index) }}
      alt=""
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    />
  );
}

const styles = {
  imageContainer: {
    width: "100%",
    gap: 0.5,
    ["@media (min-width: 550px)"]: {
      display: "grid",
      gap: 2,
      gridTemplateColumns: "repeat(2,1fr)",
    },
  },
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
