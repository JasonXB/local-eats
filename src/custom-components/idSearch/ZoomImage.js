import React from "react";
import { Box } from "@mui/system";

export default function ZoomImage(props) {
  const { imgURL, gridRow, gridColumn, remHeight, getOnClick, zIndex } = props; // prettier-ignore
  return (
    <Box
      sx={{
        gridRow: gridRow,
        gridColumn: gridColumn,
        width: "100%",
        height: "100%",
        // zIndex: zIndex
      }}
      component="a"
      href={imgURL}
      onClick={getOnClick(imgURL)}
    >
      <Box
        component="img"
        src={imgURL}
        sx={{ width: "100%", height: remHeight, objectFit: "cover" }}
      />
    </Box>
  );
}
