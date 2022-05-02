import React from "react";
// Component building block imports
import MissionStatement from "../src/page-blocks/home/MissionStatement";
import SearchOptionsRow1 from "../src/page-blocks/home/PremadeSearches1";
import LayoutContainer from "../src/custom-components/LayoutContainer";
import Cuisines from "../src/page-blocks/home/Cuisines";
import RestaurantTypes from "../src/page-blocks/home/RestaurantTypes";
import Footer from "../src/custom-components/Footer";
import SearchbarModals from "../src/custom-components/Searchbar/SearchbarModals";
import Navbar from "../src/custom-components/Navbar/Navbar";
import Head from "next/head";

// Use Static Generation to render the HTML during build (speeds up page load times)
export async function getStaticProps() {
  return {
    props: { pg: "home" },
  };
}

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Local Eats</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navbar burgerBP={700} />
      <MissionStatement />
      <SearchOptionsRow1 />
      <Cuisines />
      <LayoutContainer marginAbove="4.5rem">
        <RestaurantTypes />
      </LayoutContainer>
      <Footer />
      {/* These fixed position Modals are on standby and will pop up depending on Redux state values */}
      <SearchbarModals />
    </>
  );
}
