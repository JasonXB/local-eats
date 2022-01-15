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
              <Typography sx={{ p: 2, pb: 0 }} variant="h4">
                {category}
              </Typography>
              <Box sx={{ p: 2 }}>
                {Object.keys(types[category]).map((shopType, index) => {
                  return (
                    <Button
                      variant="outlined"
                      sx={{ fontSize: "1rem", borderRadius: 0 }}
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

  "Meat-centric": {
    Grill: "grill",
    BBQ: "BBQ",
    Burgers: "burgers", // change to burger joint as display
    Steak: "steak", // change to steak possibly
    Wings: "chicken wings",
  },

  "Plant-based": {
    Vegeterian: "vegetarian",
    Vegan: "vegan",
  },

  "Drink-centric": {
    "Juice bars": "juice",
    Tea: "tea",
    "Beverage shops": "beverages",
  },

  Sweets: {
    Bakeries: "bakery",
    Dessert: "dessert",
    Donuts: "donut",
    Candy: "candy",
    "Ice cream": "ice cream",
  },
};
function pickImage(key) {
  let img;
  switch (key) {
    case key == "Casual":
      img = <img src="../../../public/images/casual.jpg" />;
      break;
    case key == "Breakfast":
      img = <img src="../../../public/images/breakfast.jpg" />;
      break;
    case key == "Alcohol":
      img = <img src="../../../public/images/alcohol.jpg" />;
      break;
    case key == "Meat-centric":
      img = <img src="../../../public/images/meat-centric.jpg" />;
      break;
    case key == "Plant-based":
      img = <img src="../../../public/images/plant-based.jpg" />;
      break;
    case key == "Drink-centric":
      img = <img src="../../../public/images/drink-centric.jpg" />;
      break;
    case key == "Sweets":
      img = <img src="../../../public/images/sweets.jpg" />;
      break;
    default:
      break;
  }
  return img;
}
/* 
API APPROACH 
Make an API call regularly, get back the results
Check the number of results total. If it's over 50, introduce pagination
Pagination should re-render a page block

See if you can save the old results to context API or something (may tank performance)
Try not to automate calling an API twice
*/
