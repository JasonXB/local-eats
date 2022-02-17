import React from "react";
import MissionStatement from "../../../src/page-blocks/home/MissionStatement";
import SearchbarDesktop from "../../../src/custom-components/Searchbar/SearchbarDesktop";
import LayoutContainer from "../../custom-components/LayoutContainer";
import { mix } from "../../../styles/styleMixins";
import { Typography, Box, Stack, Container, Button } from "@mui/material";
import NavbarRow from "./sub/NavbarRow";

export default function HeaderSection() {
  return (
    <>
    {/* Use past 600px breakpoint */}
    <Stack sx={{ ...mix.responsiveLayout }}>
      <Box sx={{ ...mix.flexRow, justifyContent: "space-between" }}>
        <Typography variant="h3" component="h1" sx={{...mix.titleFont}}>
          Local Eats
        </Typography>
        <NavbarRow />
      </Box>
      <SearchbarDesktop applyShadow={true} />
    </Stack>
    </>
  );
}

const styles = {};
