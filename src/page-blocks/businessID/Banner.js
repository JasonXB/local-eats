import React from "react";
import { Typography, Box, Stack, Rating } from "@mui/material";
import { mix } from "../../../styles/styleMixins";
import { getRatingColor } from "../../utility-functions/search/getRatingColor";
import { useSession } from "next-auth/react";
import StarRateIcon from "@mui/icons-material/StarRate";
import StarsRoundedIcon from "@mui/icons-material/StarsRounded";
import { styled } from "@mui/material/styles";
import LayoutContainer from "../../custom-components/LayoutContainer";
import BookmarkButton from "../../custom-components/SearchResults/BookmarkButton";
import PreviewImage from "../../custom-components/SearchResults/PreviewImage";

const StyledRating = styled(Rating)({
  width: 120,
  "& .MuiRating-iconFilled": { color: "#ff6d75" },
  "& .MuiRating-iconHover": { color: "#ff3d47" },
  "& .MuiRating-icon": { fontSize: "1.6rem" },
  ["@media (min-width: 550px)"]: { display: "none" },
});

export default function Banner(props) {
  // Extract data from the props
  const { name, rating, categories, photos, address } = props.bannerData; // prettier-ignore
  const { bookmarkData } = props;
  const { status } = useSession(); //hide bookmarks for non logged in users

  // Get the bgColor for the star rating component
  const ratingColor = getRatingColor(rating);

  const images = [
    photos[0] || "/images/noIMG.webp",
    photos[1] || "/images/noIMG.webp",
    photos[2] || "/images/noIMG.webp",
  ];

  return (
    <LayoutContainer>
      {/* Panel of restaurant images */}
      <Stack id="preview_images" sx={styles.imageContainer}>
        {images.map((src, index) => {
          return <PreviewImage src={src} index={index} />;
        })}
      </Stack>

      {/* Name, restaurant category, address */}
      <Box sx={styles.dataContainer}>
        <Typography variant="h3" component="h1" sx={styles.name}>
          {name}
        </Typography>
        <Box sx={styles.dataRow}>
          <StyledRating
            name="customized-color"
            defaultValue={rating}
            readOnly
            precision={0.5}
            icon={<StarsRoundedIcon fontSize="inherit" />}
            emptyIcon={<StarsRoundedIcon fontSize="inherit" />}
          />
          {status === "authenticated" && (
            <BookmarkButton viewportType="mobile" bookmarkData={bookmarkData} />
          )}
        </Box>

        {categories && (
          <Typography variant="p" sx={styles.categories}>
            {categories}
          </Typography>
        )}
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
          <BookmarkButton viewportType="desktop" bookmarkData={bookmarkData} />
        )}
      </Box>
    </LayoutContainer>
  );
}

const styles = {
  imageContainer: {
    width: "100%",
    gap: 1,
    ["@media (min-width: 550px)"]: {
      display: "grid",
      gap: 2,
      gridTemplateColumns: "repeat(2,1fr)",
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
  dataRow: {
    ...mix.flexRow,
    width: "100%",
    justifyContent: "space-between",
    ["@media (min-width: 550px)"]: { display: "none" },
  },
};
