import React from "react";
//  prettier-ignore
import { Typography, ButtonBase, Button ,Box, CardContent, CardMedia , Container, Card} from '@mui/material';
import LayoutContainer from "../../custom-components/LayoutContainer";
import { mix } from "../../../styles/styleMixins";
export default function RestaurantTypes() {
  return (
    <>
      <Typography variant="h2" sx={{ pl: 2 }}>
        Food Moods:
      </Typography>
      <Container
        sx={{
          ...mix.responsiveLayout,
          borderRadius: 0,
          "& .MuiPaper-root": {
            borderRadius: 0,
          },
          ["@media (min-width: 1000px)"]: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
            px: 2,
          },
          ["@media (min-width: 1300px)"]: {
            gridTemplateColumns: "1fr 1fr 1fr",
          },
        }}
      >
        {Object.keys(types).map((category, ind) => {
          return (
            <Card
              key={ind}
              sx={{
                [`@media (max-width: 570px)`]: { borderRadius: 0 },
              }}
            >
              <CardMedia
                component="img"
                height="160"
                image={pickImage(category)}
              />
              {/* -------------------------------------------------- */}
              <Typography sx={{ p: 2, pb: 0 }} variant="h4">
                {category}
              </Typography>
              <Box sx={{ p: 2 }}>
                {Object.keys(types[category]).map((shopType, ind) => {
                  return (
                    <Button
                      key={ind}
                      variant="outlined"
                      sx={{ fontSize: "1rem", borderRadius: 0, mr: 1, mb: 1 }}
                    >
                      {shopType}
                    </Button>
                  );
                })}
              </Box>
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
    Sandwiches: "sandwich", // sandwich or however you spell it
    // Sushi: "sushi",
    Ramen: "ramen",
    Pizza: "pizza", // change to pizza
  },

  Breakfast: {
    Bistros: "bistro",
    Diners: "diner",
    Cafés: "café",
    Coffee: "coffee",
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
  "Plant-based": {
    Vegeterian: "vegetarian",
    Vegan: "vegan",
  },

  "Meat-oriented": {
    Grill: "grill",
    BBQ: "BBQ",
    Burgers: "burgers", // change to burger joint as display
    Steak: "steak", // change to steak possibly
    Wings: "chicken wings",
  },

  "Drink-centric": {
    "Juice bars": "juice",
    Tea: "tea",
    "Beverage shops": "beverages",
  },

  // Sweets: {
  //   Bakeries: "bakery",
  //   Dessert: "dessert",
  //   Donuts: "donut",
  //   Candy: "candy",
  //   "Ice cream": "ice cream",
  // },
};
function pickImage(key) {
  const imgs = {
    Casual: "/images/casual.jpg",
    Breakfast: "/images/breakfast.jpg",
    Alcohol: "/images/alcohol.jpg",
    "Meat-oriented": "/images/meat.jpg",
    "Plant-based": "/images/plant-based.jpg",
    "Drink-centric": "/images/drink-centric.jpg",
    Sweets: "/images/sweets.jpg",
  };
  return imgs[key]; // return the src url
}
/* 
API APPROACH 
Make an API call regularly, get back the results
Check the number of results total. If it's over 50, introduce pagination
Pagination should re-render a page block

See if you can save the old results to context API or something (may tank performance)
Try not to automate calling an API twice
*/
