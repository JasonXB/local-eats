import React from "react";
import { mix } from "../../../styles/styleMixins";
//  prettier-ignore
import { Typography, ButtonBase, Button ,Box, CardContent, CardMedia } from '@mui/material';
import LayoutContainer from "../../custom-components/LayoutContainer";
import { mix } from "../../../styles/styleMixins";

export default function RestaurantTypes() {
  return (
    <>
      <Box sx={{ mx: 2 }}>
        <Typography variant="h2">Popular Restaurant Types:</Typography>
        {Object.keys(types).map((category) => {
          return (
            <Box sx={{ mb: 2 }}>
              {/* -------------------------------------------------- */}
              <Typography variant="h4" sx={{ mb: 2, mx: 1.5 }}>
                {category}
              </Typography>
              {Object.keys(types[category]).map((shopType, index) => {
                return (
                  <Button
                    variant="outlined"
                    sx={{ mx: 1.5, my:1, fontSize: "1rem" }}
                  >
                    {shopType}
                  </Button>
                );
              })}
              {/* -------------------------------------------------- */}
            </Box>
          );
        })}
      </Box>
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
