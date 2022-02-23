import React from "react";
import StarRateIcon from "@mui/icons-material/StarRate";
import { Typography, Box, Stack } from "@mui/material";
import { useRouter } from "next/router";
import { mix } from "../../styles/styleMixins";

export default function RestaurantCard({ dataObj }) {
  const router = useRouter();
  const cardData = dataObj;

  // Turns 4 into "$$$$" for example
  const convertPriceLevel = (int) => {
    let str = "";
    for (let i = 0; i < int; i++) str = str + "$";
    return str;
  };

  const redirect = function (url) {
    router.push(url); //!!! edit the redirect destination when we make the next page
  };

  // Choose which color to use on the star rating blurb
  let blurbColor;
  if (cardData.rating < 3) blurbColor = "#dbac07";
  else if (cardData.rating < 4) blurbColor = "#3ab757";
  else if (cardData.rating < 5.1) blurbColor = "#267e3e";
  else blurbColor = "#7F7D9C";

  return (
    <Stack sx={styles.container} onClick={() => redirect("/")}>
      <Box component="img" src={cardData.image} sx={styles.image} />

      <Box sx={{ ...mix.flexRow, justifyContent: "space-between" }}>
        <Typography
          variant="p"
          sx={{ ...styles.name, ...styles.trailingDots, width: "210px" }}
        >
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

      <Box sx={{ ...mix.flexRow, justifyContent: "space-between" }}>
        <Typography variant="p" sx={{ ...styles.text, ...styles.trailingDots }}>
          {cardData.category}
        </Typography>
        <Typography variant="p" sx={styles.text}>
          Price: {convertPriceLevel(cardData.priceLevel)}
        </Typography>
      </Box>

      <Box sx={{ ...mix.flexRow, justifyContent: "space-between" }}>
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
    gridTemplateColumns: "13.75rem, auto",
    gridTemplateRows: "repeat(4, auto)",
    width: "20.75rem",
    
    p: 2,
    "&:hover": {
      borderColor: "rgb(232, 232, 232)",
      boxShadow: "rgb(28 28 28 / 12%) 0px 0.4rem 1.8rem",
      borderRadius: 4,
      cursor: "pointer",
    },
  },
  image: {
    borderRadius: 4,
    gridColumn: 1 / -1,
    //!!! Resize image without compression
    width: "100%",
    height: "14rem",
    objectFit: 'cover',
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
    width: "210px", // must apply a hardcoded width to know where ellipses start
    whiteSpace: "nowrap",
  },
};
