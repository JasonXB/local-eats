// FIND PLACES OPEN AND NEARBY:

// Get a quick bite
// View the most affordable options around
// https://api.yelp.com/v3/businesses/search?limit=50&latitude=43.853043&longitude=-79.432933&price=1,2

// Dine lavishly
// Explore your local higher-end restaurants
// https://api.yelp.com/v3/businesses/search?limit=50&latitude=43.853043&longitude=-79.432933&radius=10000&price=3,4

// POPULAR RESTAURANT TYPES NEAR ME
const restaurantType = [
  "Bakery",
  "Desserts",
  "Donuts",
  "Bars",
  "Beer Gardens", // cringe
  "Beverage Shops",
  "Bistros",
  "Cafés",
  "Casual Dining",
  "Clubs",
  "Cocktail Bars", // cocktail
  "Coffee Shops", // coffee
  "Dessert Parlors",
  "Fast Food",
  "Fine Dining",
  "Food Courts",
  "Food Trucks",
  "Ice Cream",
  "Izakaya",
  "Juice Bar",
  "Lounges",
  "Noodle Shops",
  "Pizzerias", // change to pizza
  "Pubs",
  "Sandwich Shops", // sandwich or however you spell it
  "Steakhouse", // change to steak possibly
  "Sweet Shops",
  "Wine Bars", // change to wine
  "Grill",
  "Burgers", // change to burger joint as display
  "Sushi",
];
// POPULAR CUISINES NEAR ME
const cuisines = [
  "American",
  "Canadian",
  "Chinese",
  "Japanese",
  "Vietnamese",
  "Indian",
  "Italian",
  "Peruvian",
  "Japanese",
  "Middle Eastern",
  "Thai",
  "Sri Lankan", // https://api.yelp.com/v3/businesses/search?latitude=43.853043&longitude=-79.432933&radius=20000&term=sri lanka
];
// filter using categories[0].title and categories[1].title

const insufficientResults = ["Polish"];
