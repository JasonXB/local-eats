import { Typography, Box } from "@mui/material";
import SearchbarDesktop from "../../../../src/custom-components/SearchbarDesktop";
import MobileMissionStatement from "../mobile/MissionStatement";
export default function Home() {
  return (
    <>
      {/* THE FOLLOWING IS ONLY VISIBLE ON SCREENS BEFORE THE sm BREAKPOINT */}
      <MobileMissionStatement />
      {/* THE FOLLOWING IS ONLY VISIBLE ON SCREENS PAST THE sm BREAKPOINT */}
      <Box component="section" sx={styles.cuisineIMG}>
        <Typography
          variant="h1"
          color="common.white"
          align="center"
          sx={styles.title}
        >
          Local Eats
        </Typography>
        <Typography
          variant="h3"
          color="common.white"
          align="center"
          sx={styles.tagline}
        >
          Discover the best restaurant, cafés,
          <br /> and bars in your area
        </Typography>
        <SearchbarDesktop />
      </Box>
    </>
  );
}

const styles = {
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
