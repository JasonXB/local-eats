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

  // If the restaurant's not on the list, add it
  if (!bookmarkedAlready) {
    await db.collection("users").updateOne(
      { email: userEmail },
      {
        $push: {
          bookmarks: {
            saved: dataObj, // Add to the saved bookmarks list (contains )
            idsOnly: storeID, // Add to the saved bookmarks idsOnly list
          },
        },
      }
    );
  }
  // If the resturant is already in the list, remove it
  if (bookmarkedAlready) {
    // Remove from the saved bookmarks idsOnly list
    // Remove from saved bookmarks list (contains )
  }
  res.status(201).json({ message: "Test run done" });
}
