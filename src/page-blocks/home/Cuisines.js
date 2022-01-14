import React from "react";
import { mix } from "../../../styles/styleMixins";
//  prettier-ignore
import { Typography, ButtonBase, Box } from '@mui/material';
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LayoutContainer from "../../custom-components/LayoutContainer";
//  prettier-ignore
import { Ca, Cn, Fr, Gr, In, It, Jp, Mx, Pe, Es, Lk, Sy, Th, Us, Vn} from "react-flags-select";
console.log(Ca);
const cuisineList = {
  Canadian: Ca, // these are functions that produce SVG's
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
  return (
    <>
      <LayoutContainer>
        <Typography variant="h2">Popular cuisines around your area</Typography>
      </LayoutContainer>
      {/* LIST OF CUISINE CARDS */}
      <Box
        sx={{
          ["@media (min-width: 500px)"]: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "1rem",
            px: 2,
          },
        }}
      >
        {Object.keys(cuisineList).map((key, index) => {
          // Use props to properly size the flag SVG's
          const nationSVG = cuisineList[key]({ width: "3rem", height: "2rem" });
          return (
            <ButtonBase
              key={index}
              sx={{
                display: "grid",
                gridTemplateColumns: "auto 1fr auto",
                width:"100%",
                border: "1px solid rgb(232,232,232)",
                padding: "1.25rem 1.5rem",
                "&:hover": {
                  boxShadow: `rgba(28, 28, 28, 0.08) 0px 4px 8px`,
                },
              }}
            >
              {nationSVG}
              <Typography
                variant="h5"
                align="left"
                component="p"
                sx={{ ml: 2, mt: 0.6 }}
              >
                {key}
              </Typography>
              <ChevronRightIcon sx={{ ml: 2, mt: 0.6 }} />
            </ButtonBase>
          );
        })}
      </Box>
    </>
  );
}

/*


*/
