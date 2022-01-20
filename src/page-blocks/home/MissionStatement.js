import SearchbarMobile from "../../custom-components/Searchbar/SearchbarMobile";
//  prettier-ignore
import { Typography, Box, Stack, Button, InputBase, Menu, MenuItem,} from "@mui/material";
import { mix } from "../../../styles/styleMixins";
import SearchbarDesktop from "../../custom-components/Searchbar/SearchbarDesktop";
import { useLocationContext } from "../../state-management/locationContext";

export default function Home() {
  const { locationObj, detectLocation } = useLocationContext();

  return (
    <>
      {/* THE FOLLOWING IS ONLY VISIBLE ON SCREENS BEFORE THE sm BREAKPOINT */}
      <Stack sx={mobileStyles.stackContainer}>
        <Typography
          variant="h2"
          component="h1"
          color="primary"
          align="center"
          sx={mobileStyles.title}
        >
          Local Eats
        </Typography>
        <SearchbarMobile/>
      </Stack>
      {/* THE FOLLOWING IS ONLY VISIBLE ON SCREENS PAST THE sm BREAKPOINT */}
      <Box component="section" sx={desktopStyles.cuisineIMG}>
        <Typography
          variant="h1"
          color="common.white"
          align="center"
          sx={desktopStyles.title}
        >
          Local Eats
        </Typography>
        <Typography
          variant="h3"
          component="h2"
          color="common.white"
          align="center"
          sx={desktopStyles.tagline}
        >
          Discover the best restaurants, cafés, and bars
        </Typography>
        <SearchbarDesktop />
      </Box>
    </>
  );
}

const mobileStyles = {
  stackContainer: (theme) => {
    return {
      m: 0,
      background: "#fffbf7", // apply gray background for mobile onlinr
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    };
  },
  title: {
    ...mix.titleFont,
    ...mix.regMargin("mt"),
  },
}

const desktopStyles = {
  cuisineIMG: (theme) => {
    return {
      height: "31.25rem",
      backgroundColor: "gray",
      background: `linear-gradient(
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.5) ),
      url('/images/backdropA.jpg') no-repeat`,
      backgroundPosition: "100% 10%",
      backgroundSize: "cover",
      position: "relative",

      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      [theme.breakpoints.down("lg")]: {
        height: "24rem",
      },
      // Make it so its only visible on screen sizes past the sm breakpoint
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    };
  },
  title: (theme) => {
    return {
      fontFamily: `'KoHo', sans-serif`,
      fontWeight: 900,
      fontStyle: "italic",
    };
  },
  tagline: (theme) => {
    return {
      mb: 3,
    };
  },
};
