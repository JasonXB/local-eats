import { useState, useEffect } from "react";

export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    responsiveWidth: undefined,
    responsiveHeight: undefined,
  });

  useEffect(() => {
    // Only render this code on the client (Next js pre rendering causes problems without this)
    if (typeof window !== "undefined") {
      // Handler to call on window resize
      function handleResize() {
        setWindowSize({
          responsiveWidth: window.innerWidth,
          responsiveHeight: window.innerHeight,
        });
      }
      window.addEventListener("resize", handleResize);
      handleResize(); // call immediately so state gets updated
      // Remove listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  return windowSize;
}
