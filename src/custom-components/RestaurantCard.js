import React from "react";
import { Typography, Box, Stack } from "@mui/material";
import { mix } from "../../styles/styleMixins";

export default function RestaurantCard() {
  const entries = [
    {
      "id": "SjgeuBlgKER9yegpoxT99w",
      "alias": "nomé-izakaya-toronto-2",
      "name": "Nomé Izakaya",
      "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/I7RmJr2cKXoedVIsCsfQ-A/o.jpg",
      "is_closed": false,
      "url": "https://www.yelp.com/biz/nom%C3%A9-izakaya-toronto-2?adjust_creative=nnM6X1MD9I5Z1Ro7lb0m7Q&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=nnM6X1MD9I5Z1Ro7lb0m7Q",
      "review_count": 662,
      "categories": [
        {
          "alias": "lounges",
          "title": "Lounges"
        },
        {
          "alias": "japanese",
          "title": "Japanese"
        },
        {
          "alias": "tapas",
          "title": "Tapas Bars"
        }
      ],
      "rating": 4,
      "coordinates": {
        "latitude": 43.7626495361328,
        "longitude": -79.4114685058594
      },
      "transactions": [
        "restaurant_reservation"
      ],
      "price": "$$",
      "location": {
        "address1": "4848 Yonge Street",
        "address2": "",
        "address3": "",
        "city": "Toronto",
        "zip_code": "M2N 5N2",
        "country": "CA",
        "state": "ON",
        "display_address": [
          "4848 Yonge Street",
          "Toronto, ON M2N 5N2",
          "Canada"
        ]
      },
      "phone": "+16473477937",
      "display_phone": "+1 647-347-7937",
      "distance": 5815.934550715106
    },
  ];
  const cardData = {}
  return <Box>RestaurantCard</Box>;
}
