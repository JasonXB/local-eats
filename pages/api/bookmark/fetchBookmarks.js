import { getSession } from "next-auth/react";
import { connectToDB } from "../helperFunctions/connectToDB";

export default async function handler(req, res) {
  // Check and see if the user's online. If not, end the route
  const session = await getSession({ req }); // null if offline
  if (!session) {
    return res.status(401).json({ message: "User offline" });
  }
  // Grab the current logged in email- only works b/c of [...nextAuth].js: return { email: user.email } @ end
  const userEmail = session.user.email;

  // Fetch the 2 saved restaurant lists
  // Retrieve the user's list of bookmarked businesses, and see if this business is already inside
  const client = await connectToDB(); // access db instance
  const db = client.db();
  const userAccount = await db
    .collection("users")
    .findOne({ email: userEmail });
  const savedIds = userAccount?.bookmarks?.idsOnly; // an array
  const savedRestaurants = userAccount?.bookmarks?.saved; // an array

  client.close();
  return res
    .status(200)
    .json({ message: "Bookmark removed", savedIds, savedRestaurants });
}
