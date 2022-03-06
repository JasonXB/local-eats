import React from "react";
import LayoutContainer from "../../src/custom-components/LayoutContainer";
import HeaderSection from "../../src/page-blocks/search/HeaderSection";
import { getBusinessData } from "../api/search/businessID";
import NoResults from "../../src/page-blocks/search/NoResults";

export async function getServerSideProps(context) {
  const id = context.params.businessID;
  const response = await getBusinessData(id); // we make a request to Yelp API in here
  // Pass the Yelp Data to our component via props, or pass null if the op fails
  if (response.status === "error") return { props: { info: null } };
  return { props: { yelpData: "response6" } };
}

export default function Business(props) {
  console.log(props);
  // If the fetching to Yelp fails, render a success msg but let the user nav back to prev pages
  // if (!yelpData)
  //   return (
  //     <LayoutContainer>
  //       <HeaderSection parent={"businessPage"} breakpoint={820} />
  //       <NoResults msg="No info available for this business. Please search for others using the searchbar"/>
  //     </LayoutContainer>
  //   );
  return (
    <LayoutContainer>
      <HeaderSection parent={"businessPage"} breakpoint={820} />
    </LayoutContainer>
  );
}
