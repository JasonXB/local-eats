import React from "react";
import Success from "../src/custom-components/Success";


export default function testError() {
  // Control the general error modal which opens if one of our API route 3rd party services fail
  const title = "Account email changed!";
  const message =
    "All Local Eats emails will now be directed to your new address. ";
  return <Success title={title} message={message} />;
}
