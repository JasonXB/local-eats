import React, { useCallback } from "react";
import LayoutContainer from "../../src/custom-components/LayoutContainer";
import HeaderSection from "../../src/page-blocks/search/HeaderSection";
import { getBusinessData } from "../api/search/businessID";
import NoResults from "../../src/page-blocks/search/NoResults";
import Banner from "../../src/page-blocks/businessID/Banner";
import Hours from "../../src/page-blocks/businessID/Hours";
import Footer from "../../src/custom-components/Footer";
import SearchbarModals from "../../src/custom-components/Searchbar/SearchbarModals";
import TabTitle from "../../src/custom-components/TabTitle";
import PaddedBlock from "../../src/custom-components/PaddedBlock";
import Related from "../../src/page-blocks/businessID/Related";
import { getRelatedBusinesses } from "../api/search/related";
import useBookmarks from "../api/helperFunctions/useBookmarks";

export async function getServerSideProps(context) {
  const id = context.params.businessID;
  const response = await getBusinessData(id); // we make a request to Yelp API in here
  // Pass the Yelp Data to our component via props, or pass null if the op fails
  if (response.status === "error") return { props: { companyData: null } };
  // Fetch surface level data for related businesses using the list of categories
  const categoryString = response.info.categories
    ? response.info.categories.join(", ")
    : "any";
  const lat = response.info.coords[0];
  const long = response.info.coords[1];
  const response2 = await getRelatedBusinesses(categoryString, lat, long, id);
  return { props: { companyData: response, related: response2 } };
}

export default function Business(props) {
  // Save the restaurants stored in the DB to the Global state
  const initializeBookmarks = useBookmarks(); // set bookmarks on startup
  React.useEffect(() => {
    initializeBookmarks();
  }, []);

  // Organize props data into separate objects that get passed down to diff components
  const { companyData, related } = props;
  const info = companyData.info;
  const bannerData = useCallback(
    {
      name: info.name,
      rating: info.rating,
      numberOfReviews: info.reviewQty,
      mainIMG: info.mainImg,
      photos: info.photos,
      categories: info.categories ? info.categories.join(", ") : "",
      address: `${info.address.address}, ${info.address.city}, ${info.address.state}`,
    },
    [companyData]
  );

  const infoTableData = useCallback(
    {
      address: info.address.address,
      phoneNumber: info.phoneNumber,
      yelpURL: info.yelpURL,
      destination: info.address.mapsDestination,
    },
    [companyData]
  );
  const bookmarkData = useCallback(
    {
      address: `${info.address.address}, ${info.address.city}, ${info.address.state}`,
      category: info.categories ? info.categories.join(", ") : "",
      image: info.mainImg,
      price: info.price,
      rating: info.rating,
      storeID: info.storeID,
      storeName: info.name,
    },
    [companyData]
  );

  // If the fetching to Yelp fails, render a success msg but let the user nav back to prev pages
  if (!companyData)
    return (
      <LayoutContainer>
        <TabTitle title="Business Info | Local Eats" />
        <HeaderSection parent={"businessPage"} breakpoint={820} />
        <NoResults msg="No info available for this business. Please search for others using the searchbar" />
      </LayoutContainer>
    );
  return (
    <PaddedBlock px={2}>
      <TabTitle title="Business Info | Local Eats" />
      <HeaderSection parent={"businessPage"} breakpoint={820} />
      <Banner bannerData={bannerData} bookmarkData={bookmarkData} />
      <Hours
        hours={info.hours}
        infoTableData={infoTableData}
        coords={info.coords}
      />
      <Related relatedList={related} />
      <Footer />
      {/* Modals on standby for when someone opens the searchbar's drop down menu */}
      <SearchbarModals />
    </PaddedBlock>
  );
}
