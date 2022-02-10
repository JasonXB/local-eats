import { connectToDB } from "../../../src/utility-functions/auth/connectToDB";

export default async function handler(req, res) {
  const emailToCheck = req.body.email;
  console.log(55555555555555555555, emailToCheck);
  // Connect to Mongo Cluster
  const client = await connectToDB(); // access db instance
  const db = client.db();
  // Check if the email's already in use
  const existingUser = await db
    .collection("users")
    .findOne({ email: emailToCheck });
  console.log(existingUser);
  // If this email's in use, end the API route and close the Mongo Session
  if (existingUser) {
    res.status(422).json({ message: "Email in use" }); // prettier-ignore
    client.close();
    return;
  }
  // If the email's not in use, close the DB session and return a success code
  client.close();
  res.status(200).json({ message: "Email not in use" });
}
