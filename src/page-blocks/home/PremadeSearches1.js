import React from "react";
import Card from "@mui/material/Card";
import { CardActions, CardContent, CardMedia } from "@mui/material";
import { Button, Typography, Container } from "@mui/material";
import mobileVersion from "../mobile/PremadeSearches1";

export default function searchOptions1() {
  return (
    <>
      <Container
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          p: 3,
          gap: "1rem",
        }}
      >
        <Card sx={{ width: "100%", maxWidth: "100%" }}>
          <CardMedia
            component="img"
            height="140"
            image="/images/fast_food.jpg"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              Get a Quick Bite
            </Typography>
            <Typography variant="body2" color="text.secondary">
              View the most affordable options around
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ width: "100%", maxWidth: "100%" }}>
          <CardMedia
            component="img"
            height="140"
            image="/images/fineDining.jpg"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              Dine Lavishly
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Explore local higher-end restaurants
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
