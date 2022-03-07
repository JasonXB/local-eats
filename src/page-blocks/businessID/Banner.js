import React from "react";
import { Typography, Box, Stack, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import StarsRoundedIcon from "@mui/icons-material/StarsRounded";
import LayoutContainer from "../../custom-components/LayoutContainer";
import { mix } from "../../../styles/styleMixins";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
  "& .MuiRating-icon":{
    fontSize: "2.25rem"
  }
  
});

export default function Banner(props) {
  // Extract data from the props
  const { name, rating, categories, numberOfReviews, photos } = props.bannerData; // prettier-ignore

  return (
    <Stack sx={{ px: 4, mt: 4 }}>
      <Box sx={styles.imageContainer}>
        <Box sx={styles.img(photos[0], "1/-1")}></Box>
        <Box sx={styles.img(photos[1], "1/2")}></Box>
        <Box sx={styles.img(photos[2], "2/3")}></Box>
      </Box>

      <Typography variant="h3" sx={{ lineHeight: "2.5rem", mt: 2, mb: 1 }}>
        {name}
      </Typography>
      <Typography variant="p" sx={{fontSize: 18, mb:1}}>{categories}</Typography>
      <Box sx={{...mix.flexRow, mb:1}}>
        <StyledRating
          name="customized-color"
          defaultValue={rating}
          readOnly
          precision={0.5}
          icon={<StarsRoundedIcon fontSize="inherit" />}
          emptyIcon={<StarsRoundedIcon fontSize="inherit" />}
        />
        <Typography variant="p" sx={{mx:2,}}>(based on {numberOfReviews} Yelp reviews)</Typography>
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
};
