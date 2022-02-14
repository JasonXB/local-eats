import { getSession } from "next-auth/react";
import { compare } from "bcryptjs";
import { connectToDB } from "../../../src/utility-functions/auth/connectToDB";

export default async function handler(req, res) {
  const session = await getSession({ req });
  // Capture the logged in account's email and the password the user submitted
  const accountEmail = session.user.email;
  const submittedPassword = req.body.submittedPassword;

  // Look in the DB and capture the account's hashed password
  const client = await connectToDB(); // access db instance
  const db = client.db();
  const userAccount = await db.collection("users").findOne({ email: accountEmail }); // prettier-ignore
  const hashedAccountPassword = userAccount.password;

  // Check if the password submitted in the form matches the DB account's
  const correctPassword = await compare(
    submittedPassword, // from the /auth/delete-account form
    hashedAccountPassword // official password from the DB
  ); // equals Boolean

  // If the password's wrong, end the API route and throw an error
  if (!correctPassword) {
    client.close();
    res.status(401).json({ message: "Incorrect password" });
    return; // end API route here
  }
  // If the password matches, go ahead and delete the account
  await db.collection("users").deleteOne({ email: accountEmail });
  client.close();
  res.status(200).json({ message: "Account deleted" });
}
