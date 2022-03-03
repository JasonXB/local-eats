import React from "react";
import Pagination from "@mui/material/Pagination";

export default function PaginationRow({ numberOfHits }) {
  let divisbleBy50 = numberOfHits % 50 === 0; // Bool
  let requiredPages;
  if (divisbleBy50) requiredPages = Math.trunc(numberOfHits / 50);
  else requiredPages = Math.trunc(numberOfHits / 50) + 1;

  // React.useEffect(() => {
  //   // Figure out how many pages we need, depending on the number of hits we get
  //   const buttonsRequired = (hits) => {
  //     // See if the number of hits is divisble by 50
  //     let divisbleBy50 = hits % 50 === 0; // Bool
  //     let requiredPages;
  //     if (divisbleBy50) requiredPages = Math.trunc(hits / 50);
  //     else requiredPages = Math.trunc(hits / 50) + 1;
  //     return requiredPages;
  //   };
  // }, []);

  return (
    <Pagination
      count={requiredPages}
      // count={6}
      variant="outlined"
      color="secondary"
      size="large"
      siblingCount={0}
      boundaryCount={0}
      sx={{ mx: "auto" }}
    />
  );
}
