import React from "react";
import { Typography, Box, Stack, Button, Rating } from "@mui/material";
import { mix } from "../../../styles/styleMixins";
import { getRatingColor } from "../../utility-functions/search/getRatingColor";
import { useSession } from "next-auth/react";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import StarRateIcon from "@mui/icons-material/StarRate";
import StarsRoundedIcon from "@mui/icons-material/StarsRounded";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";

const StyledRating = styled(Rating)({
  width: 120,
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
  "& .MuiRating-icon": {
    fontSize: "1.6rem",
  },
  ["@media (min-width: 550px)"]: {
    display: "none", // only show on small screens
  },
});

export default function Banner(props) {
  // Extract data from the props
  const { name, rating, categories, numberOfReviews, photos, address } = props.bannerData; // prettier-ignore
  const { status } = useSession(); //hide bookmarks for non logged in users

  console.log(props.bannerData);
  // Get the bgColor for the star rating component
  const ratingColor = getRatingColor(rating);
  // Choose what color the bookmark Icons should be
  const iconColor = {
    default: "rgba(232, 232, 232, 0.9)",
    selected: "rgb(255,215,0)",
  };

  return (
    <Stack sx={{ px: 4, mt: 4 }}>
      {/* Panel of restaurant images */}
      <Stack sx={styles.imageContainer}>
        <Box sx={styles.img(photos[0] || "/images/noIMG.png", "1/-1")}></Box>
        <Box sx={styles.img(photos[1] || "/images/noIMG.png", "1/2")}></Box>
        <Box sx={styles.img(photos[2] || "/images/noIMG.png", "2/3")}></Box>
      </Stack>

      <Box sx={styles.dataContainer}>
        {/* Name, restaurant category, address */}
        <Typography variant="h3" component="h1" sx={styles.name}>
          {name}
        </Typography>
        <Box
          sx={{
            ...mix.flexRow,
            width: "100%",
            justifyContent: "space-between",
            ["@media (min-width: 550px)"]: { display: "none" },
          }}
        >
          <StyledRating
            name="customized-color"
            defaultValue={rating}
            readOnly
            precision={0.5}
            icon={<StarsRoundedIcon fontSize="inherit" />}
            emptyIcon={<StarsRoundedIcon fontSize="inherit" />}
          />
          {/* Icon button for mobile screens only */}
          {status === "authenticated" && (
            <IconButton
              aria-label="delete"
              sx={styles.bookmarkDesktop}
            >
              <BookmarkIcon
                sx={{
                  color: iconColor.default,
                  "&:hover": {
                    background: "#00162e",
                    color: "rgb(255,215,0)",
                  },
                }}
              />
            </IconButton>
          )}
        </Box>

        <Typography variant="p" sx={styles.categories}>
          {categories}
        </Typography>
        <Typography variant="p" sx={styles.address}>
          {address}
        </Typography>
        {/* Average Yelp Rating */}
        <Box sx={styles.ratingParent(ratingColor)}>
          <Typography variant="p" sx={styles.ratingText}>
            {rating ? rating : "?"}
          </Typography>
          <StarRateIcon fontSize="small" sx={{ ml: "2px", color: "white" }} />
        </Box>
        {/* Icon button for screens larger than 550px only */}
        {status === "authenticated" && (
          <BookmarkIcon
            sx={{
              ...mix.idBookmark,
              color: iconColor.default,
              borderRadius: 20,
              p: 0.75,
              "&:hover": { color: iconColor.selected, cursor: "pointer" },
              ["@media (max-width: 549px)"]: {
                display: "none",
              },
            }}
          />
        )}
      </Box>
    </Stack>
  );
}

const styles = {
  imageContainer: {
    height: 300,
    width: "100%",
    gap: 2,
    ["@media (min-width: 550px)"]: {
      display: "grid",
      gridTemplateColumns: "repeat(2,1fr)",
      gridTemplateRows: "repeat(2,1fr)",
    },
  },
  dataContainer: {
    mt: 2,
    ["@media (min-width: 550px)"]: {
      display: "grid",
      gridTemplateColumns: "1fr 4.75rem",
      gridTemplateRows: "repeat(3,auto)",
    },
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
    borderRadius: 2,
  }),
  ratingParent: (ratingColor) => ({
    ...mix.flexRow,
    justifyContent: "flex-start",
    ml: "auto",
    background: ratingColor,
    borderRadius: 1,
    px: 0.5,
    height: "2.25rem",
    ["@media (max-width: 549px)"]: {
      display: "none",
    },
  }),
  ratingText: {
    fontSize: "1.125rem",
    fontWeight: 500,
    color: "white",
    fontSize: "1.5rem",
  },
  name: {
    fontWeight: "700",
    ["@media (max-width: 549px)"]: {
      fontSize: "1.5rem",
      mb: 1,
    },
  },
  categories: {
    fontSize: "1.125rem",
    gridRow: "2/3",
    mt: 1,
    ["@media (max-width: 549px)"]: {
      display: "block",
    },
  },
  address: {
    fontSize: "1.125rem",
    gridRow: "3/4",
    ["@media (max-width: 549px)"]: {
      display: "block",
    },
  },
  bookmarkDesktop: {
    background: "#00162e",
    "&:hover": {
      background: "#00162e",
      color: "rgb(255,215,0)",
    },
    ["@media (min-width: 550px)"]: {
      display: "none", // only show on small screens
    },
  },
  bookmarkDesktopIcon: {
    
  }
};
