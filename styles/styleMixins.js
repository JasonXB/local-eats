export const mix = {
  flexRow: {
    display: "flex",
    alignItems: "center",
  },
  flexColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  // Controls the homepage website layout
  responsiveLayout: {
    width: "100%",
    maxWidth: "1232px", // 1200 after padding
    margin: "auto",
    paddingInline: "1rem",
  },
  // This set of styles is commonly used in the search page
  searchMargins: {
    px: 4,
    ["@media (min-width: 700px)"]: { px: 2 },
  },
  // We're using a consistent margin size for distancing our components
  regMargin: (side) => {
    const marginMagnitude = "1.0rem";
    if (side === "m") return { margin: marginMagnitude };
    if (side === "mt") return { marginTop: marginMagnitude };
    if (side === "mb") return { marginBottom: marginMagnitude };
    if (side === "ml") return { marginLeft: marginMagnitude };
    if (side === "mr") return { marginRight: marginMagnitude };
    if (side === "mx") return { marginInline: marginMagnitude };
    if (side === "my") return { marginBlock: marginMagnitude };
    if (side === "!top") {
      return {
        marginInline: marginMagnitude,
        marginBottom: marginMagnitude,
      };
    }
    if (side === "!bottom") {
      return {
        marginInline: marginMagnitude,
        marginTop: marginMagnitude,
      };
    }
  },
  hoverShadow: {
    "&:hover": {
      boxShadow: `rgba(28, 28, 28, 0.35) 0px 4px 7px`,
      cursor: "pointer",
    },
  },

  titleFont: {
    fontFamily: "'Righteous', cursive",
    fontWeight: 500,
    fontStyle: "italic",
  },
  anchorStyling: {
    cursor: "pointer",
    textDecorationLine: "none",
    fontSize: "0.875rem",
    color: "#1f3c50",
    textAlign: "center",
    "&:hover": { textDecoration: "underline" },
  },
  autoCompleteHeight: {
    height: "65px",
  },
  hideAfter: (breakpoint) => {
    return {
      [`@media (min-width: ${breakpoint}px)`]: {
        display: "none",
      },
    };
  },
  hideBefore: (breakpoint) => {
    return {
      display: "none",
      [`@media (min-width: ${breakpoint}px)`]: {
        display: "block",
      },
    };
  },
  hideAfterBP: (BPname, theme) => {
    return {
      [theme.breakpoints.up(BPname)]: { display: "none" },
    };
  },
  hideBeforeBP: (BPname, theme) => {
    return {
      [theme.breakpoints.down(BPname)]: { display: "none" },
    };
  },
  formButtonWidth: {
    width: "80%",
    maxWidth: "20.625rem",
  },
  cardsContainer: {
    gridTemplateColumns: "repeat(auto-fit, minmax(20.75rem, 1fr))",
    px: 2,
    ["@media (min-width: 400px)"]: {
      display: "grid",
      width: "100%",
      gap: 1.5,
      justifyItems: "center",
    },
  },
};
