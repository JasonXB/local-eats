import React from "react";
import { Typography, Box, Stack } from "@mui/material";
import { mix } from "../../../styles/styleMixins";
import Wave from "../../custom-components/LoadingVisuals/FullScreen/Wave";

export default function NoResults(props) {
  // At first, render a loading animation for a max of 10 seconds
  // Afterwards, render a message (whichever we fed to this component via props)
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const tempSpinner = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => {
      clearTimeout(tempSpinner);
    };
  }, []);

  if (loading) return <Wave />;
  return (
    <Stack
      sx={(theme) => {
        return {
          ...mix.flexRow,
          pt: 5,
          textAlign: "center",
          px: 2,
          [theme.breakpoints.up("sm")]: { pt: 15 },
        };
      }}
    >
      <Typography variant="h3">{props.msg}</Typography>
    </Stack>
  );
}
