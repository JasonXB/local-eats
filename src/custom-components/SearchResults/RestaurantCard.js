import React from "react";
import { useRouter } from "next/router";
import StarRateIcon from "@mui/icons-material/StarRate";
import { Typography, Box, Stack } from "@mui/material";
import { useSession } from "next-auth/react";
import LazyImage from "./LazyImage";
import { getRatingColor } from "../../utility-functions/search/getRatingColor";
import { mix } from "../../../styles/styleMixins";
import BookmarkButton from "../SearchResults/BookmarkButton";
import { useGlobalContext } from "../../../state-management/globalContext";

export default function RestaurantCard({ dataObj, scrollPosition }) {
  const router = useRouter();
  const redirect = () => router.push(`/search/${dataObj.storeID}`);

  // Hide bookmarks depending on auth status and a certain state value in Global Context
  const { status } = useSession(); // disable bookmarks when offline
  const { bookmarksEnabled } = useGlobalContext(); // disable bookmarks when false

  // Choose which color to use on the star rating blurb
  let ratingColor = getRatingColor(dataObj.rating);

  return (
    <Stack sx={styles.container}>
      <Box sx={styles.imageParent}>
        <LazyImage
          src={dataObj.image}
          scrollPosition={scrollPosition}
          id={dataObj.storeID}
        />
        {status === "authenticated" && bookmarksEnabled && (
          <BookmarkButton dataObj={dataObj} />
        )}
      </Box>

      <Box
        sx={{ ...mix.flexRow, justifyContent: "space-between" }}
        onClick={redirect}
      >
        <Typography variant="p" sx={{ ...styles.name, ...styles.trailingDots }}>
          {dataObj.storeName}
        </Typography>
        <Box
          sx={{
            ...mix.flexRow,
            background: ratingColor,
            borderRadius: 1,
            px: 0.5,
          }}
        >
          <Typography
            variant="p"
            sx={{ ...styles.text, fontWeight: 500, color: "white", mb: 0 }}
          >
            {dataObj.rating ? dataObj.rating : "?"}
          </Typography>
          <StarRateIcon
            fontSize="small"
            sx={{ ...styles.text, mb: "2px", ml: "2px", color: "white" }}
          />
        </Box>
      </Box>

      <Box
        sx={{ ...mix.flexRow, justifyContent: "space-between" }}
        onClick={redirect}
      >
        <Typography variant="p" sx={{ ...styles.text, ...styles.trailingDots }}>
          {dataObj.category}
        </Typography>
        <Typography variant="p" sx={styles.text}>
          Price: {dataObj.price}
        </Typography>
      </Box>

      <Box
        sx={{ ...mix.flexRow, justifyContent: "space-between" }}
        onClick={redirect}
      >
        <Typography variant="p" sx={{ ...styles.text, ...styles.trailingDots }}>
          {dataObj.address}
        </Typography>
        <Typography variant="p" sx={styles.text}>
          {dataObj.distance}
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

  imageParent: {
    position: "relative",
    height: "14rem",
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
