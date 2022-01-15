import React from "react";
import { mix } from "../../../styles/styleMixins";
//  prettier-ignore
import { Typography, Box } from '@mui/material';
import LayoutContainer from "../../custom-components/LayoutContainer";

export default function restaurantTypes() {
  return (
    <>
      <Typography variant="h2">Popular Restaurant Types:</Typography>
    </>
  );
}

const restaurantType = {
  // Restaurant type : searchTerm for Yelp API

  breakfast: {
    Bistros: "bistro",
    "Coffee shops": "coffee",
    Diners: "diner",
    Café: "café",
  },

  meat: {
    Grill: "grill",
    BBQ: "BBQ",
    Burgers: "burgers", // change to burger joint as display
    Steakhouse: "steak", // change to steak possibly
  },

  misc: {
    Vegeterian: "vegetarian",
    Vegan: "vegan",
  },

  casual: {
    "Fast food": "fast food",
    "Food courts": "food court",
    "Food trucks": "food truck",
    "Sandwich shops": "sandwich", // sandwich or however you spell it
    Sushi: "sushi",
    "Noodle shops": "ramen",
    Pizzerias: "pizza", // change to pizza
  },

  drinks: {
    "Beverage shops": "beverages",
    "Juice bar": "juice",
  },

  alcohol: {
    Bars: "bar",
    "Cocktail bars": "cocktail",
    Clubs: "club",
    Pubs: "pub",
    Lounges: "lounge",
    "Wine bars": "wine",
    Izakaya: "izakaya",
  },

  sweets: {
    Bakeries: "bakery",
    Desserts: "dessert",
    Donuts: "donut",
    "Ice cream": "ice cream",
    "Candy shops": "candy",
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
