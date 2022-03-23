import React, { useEffect, useState } from "react";
import { trackWindowScroll } from "react-lazy-load-image-component";
import { Typography, Box, Stack } from "@mui/material";
import PaddedBlock from "../src/custom-components/PaddedBlock";
import HeaderSection from "../src/page-blocks/search/HeaderSection";
import SearchbarModals from "../src/custom-components/Searchbar/SearchbarModals";
import Footer from "../src/custom-components/Footer";
import RestaurantCard from "../src/custom-components/SearchResults/RestaurantCard";
import { useGlobalContext } from "../state-management/globalContext";
import useBookmarks from "../pages/api/helperFunctions/useBookmarks";
import { mix } from "../styles/styleMixins";

function Bookmarks({ scrollPosition }) {
  // Save the restaurants stored in the DB to the Global state
  const initializeBookmarks = useBookmarks(); // f() sets bookmarks on startup
  useEffect(() => {
    initializeBookmarks();
  }, []);

  const { bookmarks } = useGlobalContext();
  return (
    <PaddedBlock>
      <HeaderSection parent={"bookmarks"} breakpoint={800} />
      <Typography sx={styles.title} component="h1">
        Bookmarks
      </Typography>

      {!bookmarks && (
        <Typography variant="h3" sx={{ textAlign: "center", my: 10 }}>
          No businesses saved... yet!
        </Typography>
      )}
      <Box id="desktopList" sx={mix.cards_container_bookmarks}>
        {bookmarks &&
          bookmarks.map((data) => (
            <RestaurantCard
              key={data.storeID}
              dataObj={data}
              // pass scrollPosition to each resto_card (for performance's sake)
              scrollPosition={scrollPosition}
            />
          ))}
      </Box>
      <Footer />
      {/* Modal on standby in case someone clicks one of the buttons on the searchbar drop down menu */}
      <SearchbarModals />
    </PaddedBlock>
  );
}
export default trackWindowScroll(Bookmarks);
const styles = {
  title: {
    fontSize: "1.875rem",
    fontWeight: 500,
    mx: 2,
    mb: 4,
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
