import React from "react";

// Redirect users to homepage if they come here offline
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
  return <div>forgot-password</div>;
}
