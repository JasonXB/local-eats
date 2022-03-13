import React from "react";
import { mix } from "../../styles/styleMixins";
import { getSession } from "next-auth/react";
import SubmitEmail from "../../src/page-blocks/authForms/forgotPassword/SubmitEmail";
// Redirect users to homepage if they come here online
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req }); // falsy if not logged in. session obj if we are
  if (session) {
    return {
      redirect: {
        destination: "/", // redirect home if we're online
        permanent: false, // don't always want to redirect (only if user's logged in)
      },
    };
  }
  return { props: { session } };
}

export default function ForgotPassword() {
  return <SubmitEmail />;
}
