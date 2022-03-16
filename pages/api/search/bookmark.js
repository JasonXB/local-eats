import { getSession } from "next-auth/react";
import { connectToDB } from "../helperFunctions/connectToDB";

export default async function handler(req, res) {
  // Extract the restaurant data we fed to the API route, and lump it all into 1 object for later
  const { address, category, distance, image, price, rating, storeID, storeName } = req.body; // prettier-ignore
  const dataObj = { address, category, distance, image, price, rating, storeID, storeName }; // prettier-ignore

  // Check and see if the user's online. If not, end the route
  const session = await getSession({ req }); // null if offline
  if (!session) {
    return res.status(401).json({ message: "User offline" });
  }

  // Grab the current logged in email- only works b/c of [...nextAuth].js: return { email: user.email } @ end
  const userEmail = session.user.email;

  // Retrieve the user's list of bookmarked businesses, and see if this business is already inside
  const client = await connectToDB(); // access db instance
  const db = client.db();
  const userAccount = await db
    .collection("users")
    .findOne({ email: userEmail });
  const savedIdList = userAccount.bookmarks.idsOnly; // an array
  const bookmarkedAlready = savedIdList.includes(storeID); // a boolean

  // If the restaurant's not on the list of saved ID's, add it to both bookmark arrays on our DB
  // Array 1: Contains all restaurant data we deconstructed at the top of this route
  // Array 2: Contains ID's of bookmarked restaurants (but no other data)
  if (!bookmarkedAlready) {
    await db.collection("users").updateOne(
      { email: userEmail }, // locate the document to edit using the user email (a unique identifier)
      {
        // Perform a push operation to add array entries
        // Reaching the arrays we wish to edit requires a bit of drilling
        $push: {
          "bookmarks.saved": dataObj, // must equal the exact object of data we're removing (entire thing)
          "bookmarks.idsOnly": storeID, // must equal the exact id we're removing
        },
      }
    );
  }
  // If the resturant is already in the list, remove it
  if (bookmarkedAlready) {
    // Remove from the saved bookmarks idsOnly list
    // Remove from saved bookmarks list (contains )
    await db.collection("users").updateOne(
      { email: userEmail }, // locate the document to edit using the user email (a unique identifier)
      {
        // Perform a pull operation to remove array entries
        // Reaching the arrays we wish to edit requires a bit of drilling
        $pull: {
          "bookmarks.saved": dataObj,
          "bookmarks.idsOnly": storeID,
        },
      }
    );
  }
  res.status(201).json({ message: "Test run done" });
}
