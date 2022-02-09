import React, { useState, useRef } from "react";
import { Typography, Box, Stack, Divider, Button } from "@mui/material"; // prettier-ignore
import { mix } from "../../styles/styleMixins";

// Redirect users to homepage if they come here online
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req }); // falsy if not logged in. session obj if we are
  if (session) {
    return {
      redirect: {
        destination: "/", // redirect to this path
        permanent: false, // don't always want to redirect (only if user's logged in)
      },
    };
  }
  return { props: { session } };
}

export default function UseFormControl() {
  const inputRef = useRef(); // access field value with inputRef.current.value
  return (
    <>
      <Box sx={{ ...mix.flexRow, justifyContent: "center" }}>
        <Stack sx={styles.container}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="54"
            height="54"
            viewBox="0 0 24 24"
          >
            <path
              fill="crimson"
              d="M16.971 0h-9.942l-7.029 7.029v9.941l7.029 7.03h9.941l7.03-7.029v-9.942l-7.029-7.029zm-1.402 16.945l-3.554-3.521-3.518 3.568-1.418-1.418 3.507-3.566-3.586-3.472 1.418-1.417 3.581 3.458 3.539-3.583 1.431 1.431-3.535 3.568 3.566 3.522-1.431 1.43z"
            />
          </svg>
          <Typography sx={styles.header} color="primary" variant="h2">
            Error Encountered!
          </Typography>
          <Divider sx={{ width: "100%", my: 2 }} />
          <Typography sx={styles.para}>
            {" "}
            We apologize for the issue and encourage you to try creating an
            account again later.
          </Typography>
          <Typography sx={styles.para}>
            For now, feel free to enjoy the site as a guest (most site features
            are still available)
          </Typography>
          <Button variant="contained" sx={{ mt: 2 }} href="/">
            Return to homepage as a guest
          </Button>
        </Stack>
      </Box>
    </>
  );
}
const styles = {
  container: {
    width: "80%",
    maxWidth: "40rem",
    height: "60vh",
    ...mix.flexColumn,
    justifyContent: "center",
  },
  header: {
    fontWeight: 600,
    textAlign: "center",
    my: 2,
    maxWidth: "50ch",
  },
  para: {
    maxWidth: "40ch",
    textAlign: "center",
    fontSize: "1.25rem",
    mb: 2,
  },
};
