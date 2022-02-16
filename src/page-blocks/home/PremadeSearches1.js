import React from "react";
import Card from "@mui/material/Card";
import { CardContent, CardMedia } from "@mui/material";
import { Typography, Container } from "@mui/material";
import { mix } from "../../../styles/styleMixins";
import { useLocationContext } from "../../../state-management/locationContext";

export default function SearchOptions1() {
  const { checkForSavedLocation } = useLocationContext(); // prettier-ignore

  // Clicking on a card should trigger a function that redirects us to a dynamic page
  // We need a locationObject before doing so (why React Context houses that function)
  const cardHandler1 = async () => checkForSavedLocation("/search?price=1");
  const cardHandler2 = async () => checkForSavedLocation("/search?price=4");

  return (
    <>
      <Container
        sx={{
          ...mix.responsiveLayout,
          ["@media (min-width: 570px)"]: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
            px: 2,
          },
          ["@media (min-width: 700px)"]: {
            mt: 5,
          },
        }}
      >
        <Card
          sx={{
            [`@media (max-width: 570px)`]: { borderRadius: 0 },
            ...mix.hoverShadow,
          }}
          onClick={cardHandler1}
        >
          <CardMedia
            component="img"
            height="140"
            image="/images/fast_food.jpg"
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
          sx={{
            [`@media (max-width: 570px)`]: { borderRadius: 0 },
            "&:hover": {
              cursor: "pointer",
            },
            ...mix.hoverShadow,
          }}
          onClick={cardHandler2}
        >
          <CardMedia
            component="img"
            height="140"
            image="/images/fineDining.jpg"
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
    </>
  );
}
