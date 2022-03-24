import React from "react";
import { Typography, Box, Stack, Button, Rating } from "@mui/material";
import { mix } from "../../../styles/styleMixins";
import { getRatingColor } from "../../utility-functions/search/getRatingColor";
import { useSession } from "next-auth/react";
import StarRateIcon from "@mui/icons-material/StarRate";
import StarsRoundedIcon from "@mui/icons-material/StarsRounded";
import { styled } from "@mui/material/styles";
import LayoutContainer from "../../custom-components/LayoutContainer";
import BookmarkButton from "../../custom-components/SearchResults/BookmarkButton";
import { useImageViewer } from "react-image-viewer-hook";
import ZoomImage from "../../custom-components/idSearch/ZoomImage";

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
  const { getOnClick, ImageViewer } = useImageViewer();
  // Extract data from the props
  const { name, rating, categories, photos, address } = props.bannerData; // prettier-ignore
  const { bookmarkData } = props;
  const { status } = useSession(); //hide bookmarks for non logged in users

  // Get the bgColor for the star rating component
  const ratingColor = getRatingColor(rating);

  // Create links to the Yelp images and fallback photos in case they have none
  const photo0 = photos[0] || "/images/noIMG.png";
  const photo1 = photos[1] || "/images/noIMG.png";
  const photo2 = photos[2] || "/images/noIMG.png";
  let remHeight = "15rem";
  return (
    <LayoutContainer>
      {/* Panel of restaurant images */}
      <Stack id="preview_images" sx={styles.imageContainer}>
        <ZoomImage
          imgURL={photo0}
          gridRow={"1/2"}
          gridColumn={"1/2"}
          remHeight={remHeight}
          getOnClick={getOnClick}
          zIndex={1}
        />
        <ZoomImage
          imgURL={photo1}
          gridRow={"1/2"}
          gridColumn={"2/3"}
          remHeight={remHeight}
          getOnClick={getOnClick}
          zIndex={0}
        />
        <ZoomImage
          imgURL={photo2}
          gridRow={"1/2"}
          gridColumn={"1/2"}
          remHeight={remHeight}
          getOnClick={getOnClick}
          zIndex={0}
        />
        <ImageViewer />
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
    height: "15rem",
    width: "100%",
    gap: 2,
    ["@media (min-width: 550px)"]: {
      display: "grid",
      gridTemplateColumns: "repeat(2,1fr)",
      gridTemplateRows: "1fr",
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
};
