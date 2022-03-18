import axios from "axios";
import { organizeData } from "./restaurants";

export async function getRelatedBusinesses(categString, lat, long, id) {
  const str = `https://api.yelp.com/v3/businesses/search?limit=7&radius=20000&latitude=${lat}&longitude=${long}&term=${categString}`;
  const authKey = process.env.YELP_API_KEY;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `bearer ${authKey}`,
  };

  try {
    const response = await axios.get(str, { headers });
    const rawResults = response.data.businesses; // array full of restaurant objects

    // If we get zero hits, end the f() early but successfully
    const numberOfHits = response.data.total; // number of matches for the search
    if (!numberOfHits) return null;

    // Organize the data, sort by rating, and remove the restaurant we're rendering a dedicated page for
    const editedResults = organizeData(rawResults);
    editedResults.sort((a, b) => b.rating - a.rating);
    const elimDuplicate = editedResults.filter((obj) => {
      return obj.storeID !== id;
    });
    if (elimDuplicate.length === 7) return elimDuplicate.slice(0, -1);
    else return elimDuplicate;
  } catch (error) {
    return null;
  }
}
