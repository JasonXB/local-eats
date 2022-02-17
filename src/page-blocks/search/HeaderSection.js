import React from "react";
import MissionStatement from "../../../src/page-blocks/home/MissionStatement";
import SearchbarDesktop from "../../../src/custom-components/Searchbar/SearchbarDesktop";
import LayoutContainer from "../../custom-components/LayoutContainer";
import { mix } from "../../../styles/styleMixins";
import { Typography, Box, Stack, Container, Button } from "@mui/material";
import NavbarRow from "./sub/NavbarRow";
import BurgerBtn from "../../custom-components/Navbar/MobileVersion";
import SearchbarMobile from "../../custom-components/Searchbar/SearchbarMobile";
export default function HeaderSection() {
  return (
    <>
      {/*For before 600px */}
      <Stack
        sx={{
          ...mix.responsiveLayout,
          mt: 2,
          display: "block",
          ["@media (min-width: 700px)"]: { display: "none" },
        }}
      >
        <Box sx={{ ...mix.flexRow, mb:2 }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{ ...mix.titleFont, ml: 2 }}
          >
            Local Eats Search
          </Typography>
          <BurgerBtn searchpage={true} />
        </Box>
        <SearchbarMobile />
      </Stack>

      {/*For 600px - 1300px*/}
      <Stack
        sx={{
          ...mix.responsiveLayout,
          display: "none",
          ["@media (min-width: 700px)"]: { display: "block" },
        }}
      >
        <Box
          sx={{
            ...mix.flexRow,
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h3" component="h1" sx={{ ...mix.titleFont }}>
            Local Eats Search
          </Typography>
          <NavbarRow />
        </Box>
        <Box>
          <SearchbarDesktop applyShadow={true} />
        </Box>
      </Stack>


    </>
  );
}

const styles = {};
