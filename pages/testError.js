import React from "react";
import DeleteAccount from "../src/page-blocks/authForms/DeleteAccount";
import ChangePassword from "../src/page-blocks/authForms/ChangePassword";
import ChangeEmail from "../src/page-blocks/authForms/ChangeEmail";
import GeneralError from "../src/custom-components/Modals/GeneralError";

export default function testError() {
  // Control the general error modal which opens if one of our API route 3rd party services fail
  const [modalVisible, setModalVisible] = React.useState(true);
  const revealModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);
  return <GeneralError modalVisible={modalVisible} />;
}
