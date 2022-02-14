import React, {useEffect} from "react"
import useSignIn from "../../src/page-blocks/authForms/useSignIn";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react"

export default function signinPostPasswordChange() {
  const { data: session, status } = useSession()
  if(status==="authenticated"){
    signOut(); // sign out if you're online
  }
  // useEffect(()=>{

  // },[])

  const title = "Password Changed Successfully";
  const descrip = "Log back into your account using your new credentials";
  return useSignIn(title, descrip, false);
}
