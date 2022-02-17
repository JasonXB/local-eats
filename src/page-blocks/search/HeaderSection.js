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
          ["@media (min-width: 600px)"]: { display: "none" },
        }}
      >
        <Box sx={{ ...mix.flexRow, mb:2 }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{ ...mix.titleFont, ml: 2 }}
          >
            Local Eats
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
          ["@media (min-width: 600px)"]: { display: "block" },
          ["@media (min-width: 1200px)"]: { display: "none" },
        }}
      >
        <Box
          sx={{
            ...mix.flexRow,
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h3" component="h1" sx={{ ...mix.titleFont }}>
            Local Eats
          </Typography>
          <NavbarRow />
        </Box>
        <SearchbarDesktop applyShadow={true} />
      </Stack>

      {/*For beyond 1300px*/}
      <Stack
        sx={{
          ...mix.responsiveLayout,
          display: "none",
          ["@media (min-width: 1200px)"]: { display: "block" },
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "auto 1fr auto",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            sx={{ ...mix.titleFont, mr: 4 }}
          >
            Local Eats
          </Typography>
          <SearchbarDesktop applyShadow={{ width: "100%" }} />
          <NavbarRow />
        </Box>
      </Stack>
    </>
  );
}

const styles = {};
