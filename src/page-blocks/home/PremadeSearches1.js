import React from "react";
import Card from "@mui/material/Card";
import { CardContent, CardMedia } from "@mui/material";
import { Typography, Container } from "@mui/material";
import { mix } from "../../../styles/styleMixins";
import useVisitSearchPage from "../../utility-functions/search/useVisitSearchPage";
import useGetFilters from "../../utility-functions/search/useGetFilters";
import LayoutContainer from "../../custom-components/LayoutContainer";

export default function SearchOptions1() {
  // Function that navs us to the search page while letting us set a term or price parameter for the URL
  const navToSearchPage = useVisitSearchPage();
  const filters = useGetFilters();

  return (
    <LayoutContainer>
      <Container sx={stylesLocal.container}>
        <Card
          sx={stylesLocal.card}
          onClick={() => navToSearchPage({ price: 1, sort_by: filters.sort_by })} //  prettier-ignore
        >
          <CardMedia
            component="img"
            height="140"
            image="/images/fast_food.webp"
            alt="burger and fries"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="p">
              Get a Quick Bite
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: "1rem" }}
            >
              View the most affordable options around with minimal wait times
            </Typography>
          </CardContent>
        </Card>
        <Card
          sx={stylesLocal.card}
          onClick={() => navToSearchPage({ price: 4 })}
        >
          <CardMedia
            component="img"
            height="140"
            image="/images/fineDining.webp"
            alt="medium rare pork cutlet with vegetables"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="p">
              Dine Lavishly
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: "1rem" }}
            >
              Explore higher-end restaurants whose menu items cost a bit more
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </LayoutContainer>
  );
}

const stylesLocal = {
  container: {
    ...mix.responsiveLayout,
    px: 0,
    ["@media (min-width: 570px)"]: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "1rem",
    },
    ["@media (min-width: 700px)"]: {
      mt: 5,
    },
  },
  card: {
    [`@media (max-width: 570px)`]: { borderRadius: 0 },
    ...mix.hoverShadow,
    "&:hover": { cursor: "pointer" },
  },
};
