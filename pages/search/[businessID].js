import React from "react";
import LayoutContainer from "../../src/custom-components/LayoutContainer";
import HeaderSection from "../../src/page-blocks/search/HeaderSection";
import { getBusinessData } from "../api/search/businessID";
import { Typography, Box, Stack } from "@mui/material";
import NoResults from "../../src/page-blocks/search/NoResults";
import Banner from "../../src/page-blocks/businessID/Banner";
import Hours from "../../src/page-blocks/businessID/Hours";
import Footer from "../../src/custom-components/Footer";
import SearchbarModals from "../../src/custom-components/Searchbar/SearchbarModals";
import PaddedBlock from "../../src/custom-components/PaddedBlock";

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
    categories: info.categories ? info.categories.join(", ") : "",
    address: `${info.address.address}, ${info.address.city}, ${info.address.state}`,
  };
  const infoTableData = {
    address: info.address.address,
    phoneNumber: info.phoneNumber,
    yelpURL: info.yelpURL,
    destination: info.address.mapsDestination,
  };
  console.log(yelpData);
  // If the fetching to Yelp fails, render a success msg but let the user nav back to prev pages
  if (!yelpData)
    return (
      <LayoutContainer>
        <HeaderSection parent={"businessPage"} breakpoint={820} />
        <NoResults msg="No info available for this business. Please search for others using the searchbar" />
      </LayoutContainer>
    );
  return (
    <PaddedBlock px={2}>
      <HeaderSection parent={"businessPage"} breakpoint={820} />
      <Banner bannerData={bannerData} />
      <Hours hours={info.hours} infoTableData={infoTableData} />
      <Footer />
      <SearchbarModals />
    </PaddedBlock>
  );
}

