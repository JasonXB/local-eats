import { styled } from "@mui/system";

export const styles = {
  backdrop: {
    position: "fixed",
    zIndex: 1299,
    right: 0,
    bottom: 0,
    top: 0,
    left: 0,
    bgcolor: "rgb(0, 0, 0, 0.4)",
    width: "100vw",
    height: "100vh",
  },
  modalCard: {
    width: "100%",
    maxWidth: "40rem",
    bgcolor: "background.paper",
    border: "2px solid #000",
    borderRadius: "24px",
    p: 2,
    px: 4,
    pb: 3,
  },
  inputField : {
    width:"100%",
    maxWidth: "20.625rem",
    mt:3
  }
};

export const StyledModal = styled("div")`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
