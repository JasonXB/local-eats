import { mix } from "../styleMixins";

export const styles = {
  parentContainer: {
    width: "100%",
    height: "75vh",
    maxWidth: "35rem",
    margin: "auto",
    textAlign: "center",
    ...mix.flexColumn,
    justifyContent: "center",
  },
  formControl: {
    width: "80%",
    maxWidth: "20.625rem",
    mb: 1.5,
    fontWeight: 500,
    mb: 4,
  },
};