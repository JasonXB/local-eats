import React from "react";
import { Typography, Box, Stack, Rating, Container, Divider } from "@mui/material";
import { mix } from "../../../../../styles/styleMixins";
export default function RatingFilter() {
  
  return (
    <Stack
      spacing={1}
      sx={{
        width: "100%",
        height: "100%",
        display:"grid",
        gridTemplateColumns: "auto 1fr",
        gridTemplateRows: "repeat(4, auto)",
      }}
    >
      <Container >
        <Typography variant="h4" sx={styles.filterTitle}>DISTANCE</Typography>
        <Divider orientation="vertical" />
      </Container>
      <div></div>
      <Container>
        <Typography variant="h4" sx={styles.filterTitle}>PRICE</Typography>
        <Divider orientation="vertical" />
      </Container>
      <div></div>
      <Container>
        <Typography variant="h4" sx={styles.filterTitle}>RATING</Typography>
        <Divider orientation="vertical" />
      </Container>
      <div></div>
      <Container>
        <Typography variant="h4" sx={styles.filterTitle}>HOURS</Typography>
        {/* <Divider orientation="vertical" /> */}
      </Container>
      {/* <Rating
        name="half-rating"
        defaultValue={0}
        precision={0.5}

        // onChange={} // should update redux store vals
        sx={{
          "span.MuiRating-decimal": {
            fontSize: "3rem",
          },
        }}
      /> */}
    </Stack>
  );
}

const styles = {
  filterTitle : { py:2 , px:2, }
  // borderRight : "1px solid black"
}