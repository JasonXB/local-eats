import useSignIn from "../../src/page-blocks/authForms/useSignIn";
import { getSession } from "next-auth/react";

// Redirect users to homepage if they come here online
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req }); // falsy if not logged in. session obj if we are
  if (session) {
    return {
      redirect: {
        destination: "/", // if online, redirect home
        permanent: false, // don't always want to redirect (only if user's logged in)
      },
    };
  }
  return { props: { session } };
}

export default function Signin() {
  const title = "Sign In";
  const descrip =
    "Sign in and gain access to bookmarks plus any new features upon release!";
  ("Log back into your account using your new credentials");
  return useSignIn(title, descrip, true);
}
