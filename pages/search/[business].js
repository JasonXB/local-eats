import React from "react";
import LayoutContainer from "../../src/custom-components/LayoutContainer";
import HeaderSection from "../../src/page-blocks/search/HeaderSection";

export default function Business() {
  return (
    <LayoutContainer>
      <HeaderSection parent={"businessPage"} breakpoint={900}/>
    </LayoutContainer>
  );
}
