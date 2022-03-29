import React from "react";
import { Typography, Box, Stack } from "@mui/material";
import { mix } from "../../../styles/styleMixins";
import FullSpin from "../../custom-components/LoadingVisuals/FullSpin";

export default function NoResults(props) {
  // At first, render a loading animation for a max of 10 seconds
  // Afterwards, render a message (whichever we fed to this component via props)
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const tempSpinner = setTimeout(() => {
      setLoading(false);
    }, props.delay || 2000);
    return () => {
      clearTimeout(tempSpinner);
    };
  }, []);

  if (loading) return <FullSpin />;
  return (
    <Stack
      sx={(theme) => ({
        ...mix.flexRow,
        textAlign: "center",
        pt: 5,
        px: 2,
        [theme.breakpoints.up("sm")]: { pt: 15 },
      })}
    >
      <Typography
        variant="h5"
        sx={{ fontSize: "2rem", fontWeight: 400, textAlign: "center" }}
      >
        {props.msg}
      </Typography>
    </Stack>
  );
}
