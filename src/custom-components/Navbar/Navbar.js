import React, { useEffect, useState } from "react";
import NavbarDesktop from "./DesktopVersion";
import BurgerBtn from "./BurgerBtn";
import { useSession } from "next-auth/react";

export default function Navbar({burgerBP}) {
  // Feed each component our logged in status (appearance changes depending on value)
  const { status } = useSession();
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    if (status === "loading" || status === "unauthenticated") {
      setLoggedIn(false);
    }
    if (status === "authenticated") setLoggedIn(true);
  }, [status]);

  return (
    <>
      <BurgerBtn currentlyOnline={loggedIn} burgerBP={burgerBP}/>
      <NavbarDesktop currentlyOnline={loggedIn} />
    </>
  );
  // Only one of these components is visible at a time. (this behaviour's coded inside each component)
  // Before the "sm" breakpoint it's NavbarMobile that's visible (pre 700px)
  // After "sm", it's NavbarDesktop (post 700px)
  // This breakpoint may be changed in the future, inside the MUI_themes.js file
}
