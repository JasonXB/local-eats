//  prettier-ignore
import { Typography, Box, Stack, Button, InputBase, Menu, MenuItem,} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import { mix } from "../../../styles/styleMixins";
import SearchbarDesktop from "../../../src/custom-components/SearchbarDesktop";

export default function Home() {
  return (
    <>
      {/* THE FOLLOWING IS ONLY VISIBLE ON SCREENS BEFORE THE sm BREAKPOINT */}
      <Stack sx={mobileStyles.stackContainer}>
        <Typography
          variant="h1"
          color="primary"
          align="center"
          sx={mobileStyles.title}
        >
          Local Eats
        </Typography>
        <Box sx={mobileStyles.boxParent}>
          <Button sx={mobileStyles.locationBtn}>
            <GpsFixedIcon fontSize="large" color="secondary" sx={{ mr: 1.5 }} />
            <Stack sx={{ mr: 1.5 }}>
              <Typography color="secondary" variant="h6" component="p">
                Get current location
              </Typography>
              <Typography color="secondary" align="left">
                using GPS
              </Typography>
            </Stack>
          </Button>
          <Box sx={{ ...mix.flexRow }}>
            <Stack sx={{ mr: 1 }}>
              <Typography variant="h6" component="p" color="primary">
                Most recent location:
              </Typography>
              <Typography color="primary">Richmond Hill</Typography>
            </Stack>
          </Box>
        </Box>
        <Box sx={mobileStyles.searchbar}>
          <SearchIcon sx={{ mx: 1.25 }} color="secondary" />
          <InputBase
            sx={{ ml: 1, flex: 1, p: 0.5 }}
            placeholder="Restaurant, cuisine, or dish"
          />
        </Box>
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
          color="common.white"
          align="center"
          sx={desktopStyles.tagline}
        >
          Discover the best restaurant, cafés,
          <br /> and bars in your area
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
      background: "#F5F5F5", // apply gray background for mobile onlinr
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    };
  },
  title: {
    fontFamily: `'KoHo', sans-serif`,
    fontWeight: 900,
    fontStyle: "italic",
    fontSize: "2.25rem",
    ...mix.regMargin("mt"),
  },
  boxParent: {
    ...mix.flexRow,
    ...mix.regMargin("!bottom"),
    justifyContent: "space-between",
    borderRadius: "10px",
  },
  locationBtn: {
    ...mix.flexRow,
    m: 0,
    textTransform: "none", // disables all caps in button
    "&:hover": {
      cursor: "pointer",
    },
    "& .MuiTypography-root": {
      textAlign: "start",
    },
  },
  searchbar: {
    display: "flex",
    bgcolor: "white",
    alignItems: "center",
    border: "1px solid #D6CFC7",
    borderRadius: "10px",
    boxShadow: "0 0 1px 1px #D6CFC7",
    mt: 0,
    ...mix.regMargin("m"),
    "& .MuiInputBase-root": { ml: 0 },
  },
};

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
      mb: 5,
      [theme.breakpoints.down("lg")]: {
        fontSize: "4rem",
      },
    };
  },
  tagline: (theme) => {
    return {
      mb: 3,
      fontSize: "2rem",
      [theme.breakpoints.down("lg")]: {
        fontSize: "1.5rem",
      },
    };
  },
};
