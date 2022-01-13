import React from "react";
import Card from "@mui/material/Card";
import { CardActions, CardContent, CardMedia } from "@mui/material";
import { Button, Typography, Container } from "@mui/material";

export default function searchOptions1() {
  return (
    <>
      <Container
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
          p: 0,
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
              View the most affordable options around with minimal waiting times
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
              Explore higher-end local restaurants whose menu items cost a bit
              more
            </Typography>
          </CardContent>
        </Card>
      </Container>
      <Container></Container>
    </>
  );
}
