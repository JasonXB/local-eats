import Head from "next/head";
import Image from "next/image";
//  prettier-ignore
import { Typography, Button, Box, Divider, TextField, InputBase } from "@mui/material";
import SearchbarDesktop from "../src/custom-components/SearchbarDesktop";

export default function Home() {
  return (
    <Box component="section" sx={styles.cuisineIMG}>
      <Typography variant="h1" color="common.white" align="center">
        Local Eats
      </Typography>
      <Typography variant="h3" color="common.white" align="center">
        Discover the best food in your area
      </Typography>
      <SearchbarDesktop/>
    </Box>
  );
}

const styles = {
  cuisineIMG: {
    height: "31.25rem",
    backgroundColor: "gray",
    background: `linear-gradient(
    rgba(0, 0, 0, 0.5),
    rgba(0, 0, 0, 0.5) ),
    url('/images/b.jpg') no-repeat`,
    backgroundPosition: "100% 10%",
    backgroundSize: "cover",
    position: "relative",
  },
};