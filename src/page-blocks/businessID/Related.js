import React from "react";
import RestaurantCard from "../../custom-components/SearchResults/RestaurantCard";
import { trackWindowScroll } from "react-lazy-load-image-component";
import { Typography, Box } from "@mui/material";
import { mix } from "../../../styles/styleMixins";

function Related({ relatedList, scrollPosition }) {
  // Make a Yelp API call and fetch some related locations
  let msg = "Similar Places";
  if (!relatedList || relatedList.length === 0) {
    msg = "No similar places found nearby";
  }
  return (
    <>
      <Typography sx={styles.header} variant="h4">
        {msg}
      </Typography>
      {relatedList && (
        <Box sx={mix.cards_container_search}>
          {relatedList.map((r_data) => (
            <RestaurantCard
              key={r_data.storeID}
              dataObj={r_data}
              // pass scrollPosition to each resto_card (for performance's sake)
              scrollPosition={scrollPosition}
            />
          ))}
        </Box>
      )}
    </>
  );
}
export default trackWindowScroll(Related);

const styles = {
  header: {
    mb: 4,
    mt: 4,
    fontWeight: 600,
    ["@media (min-width: 680px)"]: { mb: 2 },
  },
  desktopParent: {
    gridTemplateColumns: "repeat(auto-fit, minmax(20.75rem, 1fr))",
    ["@media (min-width: 400px)"]: {
      display: "grid",
      width: "100%",
      gap: 1.5,
      justifyItems: "center",
    },
    ["@media (min-width: 1100px)"]: {
      justifyItems: "start",
    },
  },
};
