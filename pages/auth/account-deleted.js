import React from "react";
import { Typography, Stack } from "@mui/material";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import GuestBtn from "../../src/custom-components/GuestBtn";
import { mix } from "../../styles/styleMixins";

// Speed up page load times using Static Generation
export async function getStaticProps() {
  return {
    props: { pg: "account-deleted" },
  };
}

export default function AccountDeleted() {
  // Instant signOut if we're logged in when we reach this page
  const { data: session, status } = useSession();
  if (status === "authenticated") signOut();

  return (
    <Stack sx={stylesLocal.container}>
      <Typography variant="h2" sx={stylesLocal.title}>
        Local Eats Account deleted!
      </Typography>

      <Typography
        variant="h6"
        component="p"
        sx={{ textAlign: "center", mb: 2 }}
      >
        We're sorry to see you go, but we hope you continue to get use out of
        our site! Most features will still be available to you!
      </Typography>
      <GuestBtn />
      <img src="/images/wave.png" style={stylesLocal.img} />
    </Stack>
  );
}

const stylesLocal = {
  container: {
    width: "80%",
    maxWidth: "40rem",
    height: "100vh",
    marginInline: "auto",
    ...mix.flexColumn,
    justifyContent: "center",
  },
  img: { width: "500px", marginTop: "4rem" },
  title: (theme) => {
    return {
      textAlign: "center",
      fontWeight: 600,
      color: theme.palette.secondary.main,
    };
  },
};
