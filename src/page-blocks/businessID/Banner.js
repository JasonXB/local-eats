import React from "react";
import { Typography, Box, Stack, Divider } from "@mui/material";
import { mix } from "../../../styles/styleMixins";
import { getRatingColor } from "../../utility-functions/search/getRatingColor";
import StarRateIcon from "@mui/icons-material/StarRate";

export default function Banner(props) {
  // Extract data from the props
  const { name, rating, categories, numberOfReviews, photos, address } = props.bannerData; // prettier-ignore
  console.log(props.bannerData);
  // Get the bgColor for the star rating component
  const ratingColor = getRatingColor(rating);

  return (
    <Stack sx={{ px: 4, mt: 4 }}>
      {/* Panel of restaurant images */}
      <Box sx={styles.imageContainer}>
        <Box sx={styles.img(photos[0] || "/images/noIMG.png", "1/-1")}></Box>
        <Box sx={styles.img(photos[1] || "/images/noIMG.png", "1/2")}></Box>
        <Box sx={styles.img(photos[2] || "/images/noIMG.png", "2/3")}></Box>
      </Box>

      <Box sx={styles.dataContainer}>
        {/* Name, restaurant category, address */}
        <Typography variant="h3" component="h1">
          {name}
        </Typography>
        <Typography
          variant="p"
          sx={{ ...styles.text, gridRow: "2/3", my: 1 }}
        >
          {categories}
        </Typography>
        <Typography variant="p" sx={{ ...styles.text, gridRow: "3/4" }}>
          {address}
        </Typography>
        {/* Average Yelp Rating */}
        <Box sx={styles.starRating(ratingColor)}>
          <Typography
            variant="p"
            sx={{
              ...styles.text,
              fontWeight: 500,
              color: "white",
              fontSize: "1.5rem",
            }}
          >
            {rating ? rating : "?"}
          </Typography>
          <StarRateIcon
            fontSize="small"
            sx={{ mb: "0.125rem", ml: "2px", color: "white" }}
          />
        </Box>
      </Box>
    </Stack>
  );
}

const styles = {
  imageContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(2,1fr)",
    gridTemplateRows: "repeat(2,1fr)",
    height: 300,
    width: "100%",
    gap: 2,
  },
  dataContainer: {
    display: "grid",
    gridTemplateColumns: "auto 1fr",
    gridTemplateRows: "repeat(3,auto)",
    mt: 2,
  },
  img: (url, rows) => ({
    width: "100%",
    height: "100%",
    background: `linear-gradient(
      rgba(0, 0, 0, 0.0),
      rgba(0, 0, 0, 0.0) ),
      url('${url}') no-repeat`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    gridRow: rows,
  }),
  starRating: (ratingColor) => ({
    ...mix.flexRow,
    justifyContent: "flex-start",
    ml: "auto",
    background: ratingColor,
    borderRadius: 1,
    px: 0.5,
  }),
  text : {
    fontSize: "1.125rem"
  }
};
