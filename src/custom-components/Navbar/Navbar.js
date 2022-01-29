import React from "react";
import NavbarDesktop from "./DesktopVersion";
import NavbarMobile from "./MobileVersion";
import { useGlobalContext } from "../../../state-management/globalContext";

export default function Navbar() {
  // Feed each component our logged in status (appearance changes depending on value)
  const { onlineStatus } = useGlobalContext();
  return (
    <>
      {/* <NavbarMobile onlineStatus={onlineStatus} /> */}
      <NavbarDesktop onlineStatus={onlineStatus} />
    </>
  );
  // Only one of these components is visible at a time. (this behaviour's coded inside each component)
  // Before the "sm" breakpoint it's NavbarMobile that's visible (pre 700px)
  // After "sm", it's NavbarDesktop (post 700px)
  // This breakpoint may be changed in the future, inside the MUI_themes.js file
}
