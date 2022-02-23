import React from "react";
import StarRateIcon from "@mui/icons-material/StarRate";
import { Typography, Box, Stack } from "@mui/material";
import { mix } from "../../styles/styleMixins";

export default function RestaurantCard() {
  const cardData = {
    category: "Canadian (New)",
    distance: "3.3 km away",
    hours: "Open now",
    image:
      "https://s3-media2.fl.yelpcdn.com/bphoto/r9TtYxENN_p1e1OlXw2mOg/o.jpg",
    priceLevel: 4,
    rating: 4.5,
    searchIndex: 1,
    storeID: "1p82CEeIjqmw-ioc4YoibA",
    storeName: "Frilu Restaurant",
  };
  const convertPriceLevel = (int)=>{
    let str= ""
    for(let i = 0; i< int ; i++ ) str= str + "$"
    return str
  }
  // Go with grid
  return (
    <Stack sx={styles.container}>
      <Box component="img" src={cardData.image} sx={styles.image} />

      <Box sx={{ ...mix.flexRow, justifyContent: "space-between" }}>
        <Typography variant="p" sx={styles.name}>
          {cardData.storeName}
        </Typography>
        <Box
          sx={{
            ...mix.flexRow,
            background: "#267e3e",
            borderRadius: 1,
            px: 0.5,
          }}
        >
          <Typography
            variant="p"
            sx={{ ...styles.text, fontWeight: 500, color: "white" }}
          >
            {cardData.rating}
          </Typography>
          <StarRateIcon
            fontSize="small"
            sx={{ ...styles.text, mb: "1px", ml: "2px", color: "white" }}
          />
        </Box>
      </Box>

      <Box sx={{ ...mix.flexRow, justifyContent: "space-between" }}>
        <Typography variant="p" sx={styles.text}>
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
    gridTemplateColumns: "auto, auto",
    gridTemplateRows: "repeat(4, auto)",
    width: "18.75rem",
    ml: "5rem",
  },
  image: {
    borderRadius: 5,
    gridColumn: 1 / -1,
    width: "100%",
  },
  name: {
    fontSize: "1.0625rem",
    fontWeight: 500,
    lineHeight: "1.275rem",
    // Trailing dots ... if text is too long
    overflowX: "hidden",
    textOverflow: "ellipsis",
    my: 1,
  },
  text: {
    fontSize: "0.875rem",
    fontWeight: 300,
    lineHeight: "1.3125rem",
    // Trailing dots ... if text is too long
    overflowX: "hidden",
    textOverflow: "ellipsis",
  },
};
