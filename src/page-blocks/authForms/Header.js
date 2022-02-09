import React from "react";
import { Typography } from "@mui/material";
import { mix } from "../../../styles/styleMixins";

// This component will provide a title and a description below
// The styling will remain consistent across every dedicated form page in our project
export default function AuthHeader({ titleText, descriptionText }) {
  return (
    <>
      <Typography variant="h2" sx={mix.titleFont}>
        {titleText}
      </Typography>
      {descriptionText ? (
        <Typography variant="p" sx={styles.titleDescription}>
          {descriptionText}
        </Typography>
      ) : (
        ""
      )}
    </>
  );
}

const styles = {
  titleDescription: {
    fontSize: "1.2rem",
    mb: 4,
    px: 2,
    width: "100%",
    maxWidth: "35rem",
  },
};
