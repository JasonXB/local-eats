import React from "react";
import { Typography, Box, Stack, Rating } from "@mui/material"; // prettier-ignore
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Slider from "@mui/material/Slider";
import { mix } from "../../../../../styles/styleMixins";
import { styled } from "@mui/material/styles";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": { color: "#118C4F" },
  "& .MuiRating-iconHover": { color: "#118C4F" },
});

export default function RatingFilter() {
  
  // Manage distance filter
  const [alignment1, setAlignment1] = React.useState(20000);
  const handleChange1 = (event, newAlignment) => {
    setAlignment1(newAlignment);
  };
  // Manage price filter
  const [alignment2, setAlignment2] = React.useState("any");
  const handleChange2 = (event, newAlignment) => {
    setAlignment2(newAlignment);
  };
  // Manage rating filter
  const [alignment3, setAlignment3] = React.useState("any");
  const handleChange3 = (event, newAlignment) => {
    setAlignment3(newAlignment);
  };
  // Manage hours filter
  const [alignment4, setAlignment4] = React.useState("any");
  const handleChange4 = (event, newAlignment) => {
    setAlignment4(newAlignment);
  };
  return (
    <Stack spacing={1} sx={styles.container}>
      <Typography variant="h4" sx={styles.tab}>
        Max Distance
      </Typography>
      <ToggleButtonGroup
        color="secondary"
        value={alignment1}
        exclusive
        onChange={handleChange1}
        sx={styles.btnGroup}
      >
        <ToggleButton value={10000}>10 km</ToggleButton>
        <ToggleButton value={15000}>15 km</ToggleButton>
        <ToggleButton value={20000}>20 km</ToggleButton>
        <ToggleButton value={25000}>25 km</ToggleButton>
        <ToggleButton value={30000}>30 km</ToggleButton>
      </ToggleButtonGroup>

      <Typography variant="h4" sx={styles.tab}>
        Max Price
      </Typography>
      <ToggleButtonGroup
        color="secondary"
        value={alignment2}
        exclusive
        onChange={handleChange2}
        sx={styles.btnGroup}
      >
        <ToggleButton value={"any"}>Any</ToggleButton>
        <ToggleButton value={1}>$</ToggleButton>
        <ToggleButton value={2}>$$</ToggleButton>
        <ToggleButton value={3}>$$$</ToggleButton>
        <ToggleButton value={4}>$$$$</ToggleButton>
      </ToggleButtonGroup>

      <Typography variant="h4" sx={styles.tab}>
        Min Rating
      </Typography>
      <ToggleButtonGroup
        color="secondary"
        value={alignment3}
        exclusive
        onChange={handleChange3}
        sx={styles.btnGroup}
      >
        <ToggleButton value={"any"}>Any</ToggleButton>
        <ToggleButton value={1}>1</ToggleButton>
        <ToggleButton value={2}>2</ToggleButton>
        <ToggleButton value={3}>3</ToggleButton>
        <ToggleButton value={4}>4</ToggleButton>
        <ToggleButton value={5}>5</ToggleButton>
      </ToggleButtonGroup>

      <Typography variant="h4" sx={styles.tab}>
        Hours
      </Typography>
      <ToggleButtonGroup
        color="secondary"
        value={alignment4}
        exclusive
        onChange={handleChange4}
        sx={styles.btnGroup}
      >
        <ToggleButton value={"any"}>Any</ToggleButton>
        <ToggleButton value={"open_now"}>Open now</ToggleButton>
      </ToggleButtonGroup>
      <Box sx={{ m: 0 }}></Box>
    </Stack>
  );
}

const styles = {
  container: {
    width: "100%",
    height: "100%",
    py: 1,
    display: "grid",
    gridTemplateColumns: "auto 1fr",
    gridTemplateRows: "repeat(4, auto)",
    alignItems: "center",
    // Quash a few auto-applied margins
    "h4.MuiTypography-root": { margin: 0 },
    "div.MuiBox-root": { margin: 0 },
    "span.MuiRating-root": { margin: 0 },
    "span.MuiSlider-colorPrimary": { margin: 0 },
    "div.MuiToggleButtonGroup-root": { margin: 0 },
  },
  tab: {
    py: 2,
    px: 2,
    mt: 0,
    color: "#7E7E7E",
  },
  btnGroup: {
    pl: 2,
  },
};
