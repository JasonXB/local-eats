import React from "react";
//  prettier-ignore
import { Typography, ButtonBase, Button ,Box, CardContent, CardMedia , Container, Card} from '@mui/material';
import LayoutContainer from "../../custom-components/LayoutContainer";
import { mix } from "../../../styles/styleMixins";

export default function RestaurantTypes() {
  return (
    <>
      <Typography variant="h2">Food Moods:</Typography>
      <Container
        sx={{
          ...mix.responsiveLayout,
          ["@media (min-width: 570px)"]: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
            px: 2,
          },
        }}
      >
        {Object.keys(types).map((category) => {
          return (
            <Card
              sx={{
                [`@media (max-width: 570px)`]: { borderRadius: 0 },
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image="/images/fast_food.jpg"
              />
              {/* -------------------------------------------------- */}
              <Typography variant="h4" sx={{ mb: 2, mx: 1.5 }}>
                {category}
              </Typography>
              {Object.keys(types[category]).map((shopType, index) => {
                return (
                  <Button
                    variant="outlined"
                    sx={{ mx: 1.5, my: 1, fontSize: "1rem" }}
                  >
                    {shopType}
                  </Button>
                );
              })}
              {/* -------------------------------------------------- */}
            </Card>
          );
        })}
      </Container>
    </>
  );
}

const types = {
  // Restaurant type : searchTerm for Yelp API
  Casual: {
    "Fast food": "fast food",
    "Food courts": "food court",
    "Food trucks": "food truck",
    "Sandwich shops": "sandwich", // sandwich or however you spell it
    Sushi: "sushi",
    "Noodle shops": "ramen",
    Pizzerias: "pizza", // change to pizza
  },

  Breakfast: {
    Bistros: "bistro",
    Diners: "diner",
    Cafés: "café",
    "Coffee shops": "coffee",
  },

  Alcohol: {
    Bars: "bar",
    "Cocktail bars": "cocktail",
    Clubs: "club",
    Pubs: "pub",
    Lounges: "lounge",
    "Wine bars": "wine",
    Izakaya: "izakaya",
  },

  "Meat-based": {
    Grill: "grill",
    BBQ: "BBQ",
    "Burger joints": "burgers", // change to burger joint as display
    Steakhouses: "steak", // change to steak possibly
  },

  "Plant-based": {
    Vegeterian: "vegetarian",
    Vegan: "vegan",
  },

  "Drink-centered": {
    "Juice bars": "juice",
    "Tea places": "tea",
    "Beverage shops": "beverages",
  },

  Sweets: {
    Bakeries: "bakery",
    "Dessert places": "dessert",
    "Donut shops": "donut",
    "Ice cream parlours": "ice cream",
    "Candy stores": "candy",
  },
};
/* 
API APPROACH 
Make an API call regularly, get back the results
Check the number of results total. If it's over 50, introduce pagination
Pagination should re-render a page block

See if you can save the old results to context API or something (may tank performance)
Try not to automate calling an API twice
*/
