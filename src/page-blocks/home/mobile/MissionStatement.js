import React from "react";
//  prettier-ignore
import { Typography, Button, Box,Stack, Divider, TextField, InputBase, Menu, MenuItem } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { mix } from "../../../../styles/styleMixins";
export default function MissionStatement() {
  return (
    <>
      <Stack
        sx={(theme) => {
          return {
            m: 0,
            bgcolor: "#F5F5F5",
            [theme.breakpoints.up("sm")]: {
              display: "none",
            },
          };
        }}
      >
        <Typography
          variant="h1"
          color="primary"
          align="center"
          sx={{
            fontFamily: `'KoHo', sans-serif`,
            fontWeight: 900,
            fontStyle: "italic",
            fontSize: "2.25rem",
            ...mix.regMargin("mt"),
          }}
        >
          Local Eats
        </Typography>
        <Box
          sx={{
            ...mix.flexRow,
            ...mix.regMargin("!bottom"),
            justifyContent: "space-between",
            borderRadius: "10px",
          }}
        >
          <Button
            sx={{
              ...mix.flexRow,
              m: 0,
              textTransform: "none", // disables all caps in button
              "&:hover": {
                cursor: "pointer",
              },
              "& .MuiTypography-root": {
                textAlign: "start",
              },
            }}
          >
            <GpsFixedIcon fontSize="large" color="secondary" sx={{ mr: 1.5 }} />
            <Stack sx={{ mr: 1.5 }}>
              <Typography color="secondary" variant="h6" component="p">
                Get current location
              </Typography>
              <Typography color="secondary" align="start">
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
        <Box
          sx={{
            display: "flex",
            bgcolor: "white",
            alignItems: "center",
            border: "1px solid #D6CFC7",
            borderRadius: "10px",
            boxShadow: "0 0 1px 1px #D6CFC7",
            mt: 0,
            ...mix.regMargin("m"),
            "& .MuiInputBase-root": { ml: 0 },
          }}
        >
          <SearchIcon sx={{ mx: 1.25 }} color="secondary" />
          <InputBase
            sx={{ ml: 1, flex: 1, p: 0.5 }}
            placeholder="Restaurant, cuisine, or dish"
          />
        </Box>
      </Stack>
    </>
  );
}
