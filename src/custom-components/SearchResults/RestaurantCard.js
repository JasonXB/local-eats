import React from "react";
import StarRateIcon from "@mui/icons-material/StarRate";
import { Typography, Box, Stack } from "@mui/material";
import { useRouter } from "next/router";
import { mix } from "../../../styles/styleMixins";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import LazyImage from "./LazyImage";

export default function RestaurantCard({ dataObj, scrollPosition }) {
  const router = useRouter();
  const cardData = dataObj;

  const redirect = function (url) {
    router.push(url);
    //!!! edit the redirect destination when we make the next page
    //!!! CTRL F every onClick on this page
  };

  // Choose which color to use on the star rating blurb
  let blurbColor; // yellow, lime green, dark green
  if (cardData.rating < 3) blurbColor = "#dbac07";
  else if (cardData.rating < 4) blurbColor = "#3ab757";
  else if (cardData.rating < 5.1) blurbColor = "#267e3e";
  else blurbColor = "#7F7D9C";

  // Choose what color the bookmark Icons should be
  const iconColor = {
    default: "rgba(232, 232, 232, 0.9)",
    selected: "rgb(255,215,0)",
  };

  return (
    <Stack sx={styles.container}>
      <Box sx={styles.imageParent}>
        <LazyImage src={cardData.image} scrollPosition={scrollPosition} />
        <BookmarkIcon
          sx={{
            ...styles.bookmark,
            color: iconColor.default,
            "&:hover": { color: iconColor.selected },
          }}
        />
      </Box>

      <Box
        sx={{ ...mix.flexRow, justifyContent: "space-between" }}
        onClick={() => redirect("/")}
      >
        <Typography variant="p" sx={{ ...styles.name, ...styles.trailingDots }}>
          {cardData.storeName}
        </Typography>
        <Box
          sx={{
            ...mix.flexRow,
            background: blurbColor,
            borderRadius: 1,
            px: 0.5,
          }}
        >
          <Typography
            variant="p"
            sx={{ ...styles.text, fontWeight: 500, color: "white", mb: 0 }}
          >
            {cardData.rating}
          </Typography>
          <StarRateIcon
            fontSize="small"
            sx={{ ...styles.text, mb: "2px", ml: "2px", color: "white" }}
          />
        </Box>
      </Box>

      <Box
        sx={{ ...mix.flexRow, justifyContent: "space-between" }}
        onClick={() => redirect("/")}
      >
        <Typography variant="p" sx={{ ...styles.text, ...styles.trailingDots }}>
          {cardData.category}
        </Typography>
        <Typography variant="p" sx={styles.text}>
          Price: {cardData.price}
        </Typography>
      </Box>

      <Box
        sx={{ ...mix.flexRow, justifyContent: "space-between" }}
        onClick={() => redirect("/")}
      >
        <Typography variant="p" sx={styles.text}>
          {cardData.hours}
        </Typography>
        <Typography variant="p" sx={styles.text}>
          {cardData.distance}
        </Typography>
      </Box>
    </Stack>
  );
}

const styles = {
  container: {
    display: "grid",

    p: 0,
    mb: 6,
    width: "100%",
    "&:hover": { cursor: "pointer" },
    ["@media (min-width: 400px)"]: {
      gridTemplateColumns: "13.75rem, auto",
      gridTemplateRows: "repeat(4, auto)",
      width: "20.75rem",
      p: 2,
      "&:hover": {
        borderColor: "rgb(232, 232, 232)",
        boxShadow: "rgb(28 28 28 / 12%) 0px 0.4rem 1.8rem",
        borderRadius: 4,
      },
    },
  },
  bookmark: {
    position: "absolute",
    fontSize: "2.5rem",
    right: "5%",
    top: "5%",
    p: 0.5,
    borderRadius: 2,
    background: "black",
  },
  imageParent: {
    position: "relative",
    height: "14rem",
  },
  image: {
    borderRadius: 4,
    gridColumn: 1 / -1,
    // Resize image without compression
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  name: {
    fontSize: "1.1rem",
    fontWeight: 600,
    lineHeight: "1.275rem",
    my: 1,
  },
  text: {
    fontSize: "0.9375rem",
    fontWeight: 400, // 300
    lineHeight: "1.3125rem",
    mb: 0.5,
  },
  trailingDots: {
    textOverflow: "ellipsis",
    overflow: "hidden",
    width: "11.125rem", // must apply a hardcoded width to know where ellipses start
    whiteSpace: "nowrap",
    // On mobile, decrease the allotted space for text
    ["@media (min-width: 400px)"]: {
      width: "13.125rem",
    },
  },
};
