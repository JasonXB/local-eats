import React from "react";
import SearchbarDesktop from "../../../src/custom-components/Searchbar/SearchbarDesktop";
import { mix } from "../../../styles/styleMixins";
import { Typography, Box, Stack, Breadcrumbs, Link } from "@mui/material"; // prettier-ignore
import NavbarRow from "./sub/NavbarRow";
import BurgerBtn from "../../custom-components/Navbar/BurgerBtn";
import SearchbarMobile from "../../custom-components/Searchbar/SearchbarMobile";
import { useSession } from "next-auth/react";

export default function HeaderSection({ parent, breakpoint }) {
  // Feed the BurgerBtn our authStatus as a prop in JSX so it knows what buttons to render
  const { status } = useSession();

  let breadcrumbs;
  if (parent === "searchPage") {
    breadcrumbs = (
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Typography color="text.primary">Search</Typography>
      </Breadcrumbs>
    );
  }
  if (parent === "businessPage") {
    breadcrumbs = (
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Typography color="text.primary">Business info</Typography>
      </Breadcrumbs>
    );
  }
  if (parent === "bookmarks") {
    breadcrumbs = (
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Typography color="text.primary">Bookmarks</Typography>
      </Breadcrumbs>
    );
  }
  return (
    <>
      {/*Before the breakpoint, render the following */}
      <Stack
        sx={{
          ...stylesLocal.mobileContainer,
          [`@media (min-width: ${breakpoint}px)`]: { display: "none" },
        }}
      >
        <Box sx={{ ...mix.flexRow, mb: 2 }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{ ...mix.titleFont, ml: 2 }}
          >
            Local Eats
          </Typography>
          <BurgerBtn
            parent={parent}
            currentlyOnline={status === "authenticated" ? true : false}
            addHomepageButton={true}
            burgerBP={breakpoint}
          />
        </Box>
        <SearchbarMobile />
      </Stack>

      {/*Past the breakpoint*/}
      <Stack
        sx={{
          ...stylesLocal.desktopContainer,
          [`@media (min-width: ${breakpoint}px)`]: { display: "block" },
        }}
      >
        <Box sx={stylesLocal.titleContainer}>
          <Typography variant="h3" component="h1" sx={mix.titleFont}>
            Local Eats
          </Typography>
          <NavbarRow />
        </Box>
        <Box sx={stylesLocal.breadcrumbContainer}>
          <SearchbarDesktop applyShadow={true} />
          {breadcrumbs}
        </Box>
      </Stack>
    </>
  );
}

const stylesLocal = {
  mobileContainer: {
    ...mix.responsiveLayout,
    display: "block",
    my: 2,
    px: 0,
  },
  desktopContainer: {
    ...mix.responsiveLayout,
    display: "none",
    mb: 4,
  },
  breadcrumbContainer: {
    display: "grid",
    gridTemplateColumns: "1fr auto",
    gap: 3,
    alignItems: "center",
  },
  titleContainer: { ...mix.flexRow, justifyContent: "space-between" },
};
