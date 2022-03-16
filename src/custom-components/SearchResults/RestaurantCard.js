import React from "react";
import { useRouter } from "next/router";
import StarRateIcon from "@mui/icons-material/StarRate";
import { Typography, Box, Stack } from "@mui/material";
import { useSession } from "next-auth/react";
import LazyImage from "./LazyImage";
import { getRatingColor } from "../../utility-functions/search/getRatingColor";
import { mix } from "../../../styles/styleMixins";
import IdBookmark from "../Bookmarks/IdBookmark";

export default function RestaurantCard({ dataObj, scrollPosition }) {
  const router = useRouter();
  const cardData = dataObj;
  const { status } = useSession(); //hide bookmarks for non logged in users

  const redirect = () => router.push(`/search/${dataObj.storeID}`);

  // Choose which color to use on the star rating blurb
  let ratingColor = getRatingColor(cardData.rating);

  return (
    <Stack sx={styles.container}>
      <Box sx={styles.imageParent}>
        <LazyImage
          src={cardData.image}
          scrollPosition={scrollPosition}
          id={dataObj.storeID}
        />
        {status === "authenticated" && <IdBookmark />}
      </Box>

      <Box
        sx={{ ...mix.flexRow, justifyContent: "space-between" }}
        onClick={redirect}
      >
        <Typography variant="p" sx={{ ...styles.name, ...styles.trailingDots }}>
          {cardData.storeName}
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
            {cardData.rating ? cardData.rating : "?"}
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
          {cardData.category}
        </Typography>
        <Typography variant="p" sx={styles.text}>
          Price: {cardData.price}
        </Typography>
      </Box>

      <Box
        sx={{ ...mix.flexRow, justifyContent: "space-between" }}
        onClick={redirect}
      >
        <Typography variant="p" sx={{ ...styles.text, ...styles.trailingDots }}>
          {cardData.address}
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
