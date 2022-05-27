import React from "react";
import { mix } from "../../../styles/styleMixins";
import { Typography, ButtonBase, Box } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import useGetFilters from "../../utility-functions/search/useGetFilters";
import useVisitSearchPage from "../../utility-functions/search/useVisitSearchPage";
import { Ca, Cn, Fr, Gr, In, It, Jp, Mx, Pe, Es, Lk, Sy, Th, Us, Vn} from "react-flags-select"; // prettier-ignore

const cuisineList = {
  Canadian: Ca, // these are functions that produce SVG's that render flags
  American: Us,
  Chinese: Cn,
  Japanese: Jp,
  Thai: Th,
  Vietnamese: Vn,
  Indian: In,
  Italian: It,
  Spanish: Es,
  Mexican: Mx,
  Peruvian: Pe,
  "Middle Eastern": Sy,
  "Sri Lankan": Lk,
  Greek: Gr,
  French: Fr,
};

export default function Cuisines() {
  const filters = useGetFilters();
  const navToSearchPage = useVisitSearchPage();
  return (
    <>
      <Box sx={{ ...mix.responsiveLayout, mt: "4.5rem" }}>
        <Typography variant="h2">Popular Local Cuisines</Typography>
      </Box>
      {/* LIST OF CUISINE CARDS */}
      <Box sx={stylesLocal.cuisinesGrid}>
        {Object.keys(cuisineList).map((key, index) => {
          // Use props to properly size the flag SVG's
          const nationSVG = cuisineList[key]({ width: 48, height: 32 });
          return (
            <ButtonBase
              key={index}
              sx={stylesLocal.btn}
              onClick={() =>
                navToSearchPage({
                  term: key.toLowerCase(),
                  sort_by: filters.sort_by,
                })
              }
            >
              {nationSVG}
              <Typography
                variant="h5"
                align="left"
                component="p"
                sx={{ mb: 0.4, ml: 2 }}
              >
                {key}
              </Typography>
              <ChevronRightIcon sx={{ mt: 0.6, ml: 1 }} />
            </ButtonBase>
          );
        })}
      </Box>
    </>
  );
}

const stylesLocal = {
  cuisinesGrid: {
    ...mix.responsiveLayout,
    ["@media (min-width: 500px)"]: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "1rem",
      px: 2,
    },
    ["@media (min-width: 900px)"]: {
      gridTemplateColumns: "1fr 1fr 1fr",
    },
  },
  btn: {
    display: "grid",
    gridTemplateColumns: "auto 1fr auto",
    width: "100%",
    border: "1px solid rgb(232,232,232)",
    padding: "1.25rem 1.25rem",
    ...mix.hoverShadow,
  },
};
