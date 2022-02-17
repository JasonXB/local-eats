import React, {useEffect} from "react";
import SearchbarDesktop from "../../../src/custom-components/Searchbar/SearchbarDesktop";
import LayoutContainer from "../../custom-components/LayoutContainer";
import { mix } from "../../../styles/styleMixins";
import { Typography, Box, Stack, Breadcrumbs, Link, Button } from "@mui/material"; // prettier-ignore
import NavbarRow from "./sub/NavbarRow";
import BurgerBtn from "../../custom-components/Navbar/BurgerBtn";
import SearchbarMobile from "../../custom-components/Searchbar/SearchbarMobile";
import { useSession } from "next-auth/react";

export default function HeaderSection() {
  // Feed the BurgerBtn our authStatus as a prop in JSX so it knows what buttons to render
  const { data: session, status } = useSession();

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
        <Box sx={{ ...mix.flexRow, mb: 2 }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{ ...mix.titleFont, ml: 2 }}
          >
            Local Eats Search
          </Typography>
          <BurgerBtn
            searchpage={true}
            currentlyOnline={status === "authenticated" ? true : false}
            addHomepageButton={true}
          />
        </Box>
        <SearchbarMobile />
      </Stack>

      {/*For 600px and higher*/}
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
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: 5,
            alignItems: "center",
          }}
        >
          <SearchbarDesktop applyShadow={true} />
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Homepage
            </Link>
            <Typography color="text.primary">Search</Typography>
          </Breadcrumbs>
        </Box>
      </Stack>
    </>
  );
}

const styles = {};
