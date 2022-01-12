Searchbar: Perform a business search with a 
https://api.yelp.com/v3/businesses/search?limit=50&latitude=43.853043&longitude=-79.432933&radius=20000&term=Chinese

One request will usually not cut it when we perform a search since we're capped
<<< API request approach >>>
Request with a limit of 30, check if total is over 30
If total is over 30, determine how many multiples of 30 there are with modulus
This determines how many pagination pages there will be 
Afterwards, make a subsequent API request. limit=30 offset=30
Then after that, make an AP


QUERIED SEARCH PAGE:
Introduce pagination, to improve the base Zomato website
responseObj.total= integer
If that number is over 30, introduce pagination 


GET CITY NAME BASED ON GEOLOCATION
// Finding city name using Geolocation
// https://ipinfo.io/

// https://www.javascripttutorial.net/web-apis/javascript-geolocation/


REFACTOR FILES IN 
MissionStatement.js in 