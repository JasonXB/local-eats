import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export async function quickLogin(email, password) {
  const result = await signIn("credentials", {
    redirect: false, //!!! may want a redirect afterwards??
    email,
    password,
  }); // the callbackFN we define in [...nextauth].js runs
  if (!result.error) {
    // Redirect user to homepage
    router.push("/");
  }
  console.log(result);
  alert("Sign in failed!"); //!!! test with bad password
  return;
}