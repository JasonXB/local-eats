import { signIn } from "next-auth/react";

export const credentialSignIn = async function (email, password) {
  // Invoke the [...nextAuth].js callback function which always resolves
  const request = await signIn("credentials", {
    redirect: false, // will prevent a page redirect if something goes wrong
    email, // will equal credentials.email in the backend
    password, // will equal credentials.password in the backend
  });
  console.log(request);
};
