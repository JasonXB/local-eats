import { mix } from "../styleMixins";

export const styles = {
  parentContainer: {
    width: "100%",
    marginTop: "5vh",
    maxWidth: "35rem",
    marginInline: "auto",
    textAlign: "center",
    ...mix.flexColumn,
    justifyContent: "center",
  },
  formControl: {
    width: "80%",
    maxWidth: "20.625rem",
    mb: 0.75,
    fontWeight: 500,
  },
  formHelperText: {
    color: "#d32f2f",
    m: 0,
    mt: 0.5,
  },
};
