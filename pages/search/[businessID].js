import React from "react";
import LayoutContainer from "../../src/custom-components/LayoutContainer";
import HeaderSection from "../../src/page-blocks/search/HeaderSection";
import { getBusinessData } from "../api/search/businessID";
import NoResults from "../../src/page-blocks/search/NoResults";
import Banner from "../../src/page-blocks/businessID/Banner";
import { Divider } from "@mui/material";

export async function getServerSideProps(context) {
  const id = context.params.businessID;
  const response = await getBusinessData(id); // we make a request to Yelp API in here
  // Pass the Yelp Data to our component via props, or pass null if the op fails
  if (response.status === "error") return { props: { yelpData: null } };
  return { props: { yelpData: response } };
}

export default function Business(props) {
  const { yelpData } = props;
  const info = yelpData.info;
  const bannerData = {
    name: info.name,
    rating: info.rating,
    numberOfReviews: info.reviewQty,
    mainIMG: info.mainImg,
    photos: info.photos,
    categories: info.categories.join(", "),
    address: `${info.address.address}, ${info.address.city}, ${info.address.state}`,
  };

  // If the fetching to Yelp fails, render a success msg but let the user nav back to prev pages
  if (!yelpData)
    return (
      <LayoutContainer>
        <HeaderSection parent={"businessPage"} breakpoint={820} />
        <NoResults msg="No info available for this business. Please search for others using the searchbar" />
      </LayoutContainer>
    );
  return (
    <LayoutContainer>
      <HeaderSection parent={"businessPage"} breakpoint={820} />
      <Divider sx={styles.divider} />
      <Banner bannerData={bannerData} />
    </LayoutContainer>
  );
}

//! test for no hours available example http://localhost:3000/search/0cFLGS7cLdBv3-CRrv2rQg
//! code fallbacks in case an resto_data KVP's equal a falsy where they shouldn't

const styles = {
  divider: {
    mx: 4,
    my: 0,
    ["@media (min-width: 550px)"]: { mb: 4 },
    ["@media (min-width: 820px)"]: { my: 4 },
  },
};
