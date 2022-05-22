import React from "react";
import { Typography, Button ,Box, CardMedia , Container, Card } from '@mui/material'; // prettier-ignore
import { mix } from "../../../styles/styleMixins";
import useVisitSearchPage from "../../utility-functions/search/useVisitSearchPage";
import useGetFilters from "../../utility-functions/search/useGetFilters";

export default function RestaurantTypes() {
  const filters = useGetFilters();
  const navToSearchPage = useVisitSearchPage();

  return (
    <>
      <Typography variant="h2">Food Moods:</Typography>
      <Container sx={stylesLocal.container}>
        {Object.keys(types).map((category, ind) => {
          return (
            <Card key={ind} sx={stylesLocal.card}>
              <CardMedia
                component="img"
                height="160"
                image={pickImage(category)[0]}
                alt={pickImage(category)[1]}
              />
              <Typography sx={{ p: 2, pb: 0 }} variant="h4">
                {category}
              </Typography>
              <Box sx={{ p: 2 }}>
                {Object.keys(types[category]).map((shopType, ind) => {
                  return (
                    <Button
                      key={ind}
                      variant="outlined"
                      onClick={() =>
                        navToSearchPage({
                          term: shopType.toLowerCase(),
                          sort_by: filters.sort_by,
                        })
                      }
                      sx={stylesLocal.btn}
                    >
                      {shopType}
                    </Button>
                  );
                })}
              </Box>
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
    Pizza: "pizza", 
  },

  Breakfast: {
    Bistros: "bistro",
    Diners: "diner",
    Bakeries: "bakery",
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
    Burgers: "burgers", 
    Steak: "steak", 
    Wings: "chicken wings",
  },

  "Drink-centric": {
    "Juice bars": "juice",
    Tea: "tea",
    "Beverage shops": "beverages",
  },
};
function pickImage(key) {
  const imgs = {
    Casual: ["/images/casual.webp", "burger, fries, chicken nuggets"],
    Breakfast: ["/images/breakfast.webp", "waffles with maple syrup on top"],
    Alcohol: ["/images/alcohol.webp", "shelf holding assorted liquor bottles"],
    "Meat-oriented": ["/images/meat.webp", "chicken wings"],
    "Plant-based": ["/images/plant-based.webp", "vegan nachos and cheese"],
    "Drink-centric": ["/images/drink-centric.webp", "fruit smoothies"],
  };
  return [imgs[key][0], imgs[key][1]]; // return the src url
}

const stylesLocal = {
  container: {
    ...mix.responsiveLayout,
    px: 0,
    borderRadius: 0,
    "& .MuiPaper-root": {
      borderRadius: 0,
    },
    ["@media (min-width: 1000px)"]: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "1rem",
    },
    ["@media (min-width: 1300px)"]: {
      gridTemplateColumns: "1fr 1fr 1fr",
      mb: "4.5rem",
    },
  },
  card: { [`@media (max-width: 570px)`]: { borderRadius: 0 } },
  btn: { fontSize: "1rem", borderRadius: 0, mr: 1, mb: 1 },
};
