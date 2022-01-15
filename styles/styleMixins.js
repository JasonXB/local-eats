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
    maxWidth: "1232px",
    margin: "auto",
    paddingInline: "1rem",
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
      boxShadow: `rgba(28, 28, 28, 0.08) 0px 4px 8px`,
    },
  }
};
