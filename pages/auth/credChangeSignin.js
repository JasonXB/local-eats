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
export default function credChangeSignin() {
  const title = "Credentials Changed Successfully";
  const descrip =
    "Log back into your account using your new info";
  return useSignIn(title, descrip, false);
}

// http://localhost:3000/auth/signinPostEmailChange