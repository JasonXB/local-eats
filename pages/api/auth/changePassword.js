//# API Route that allows the authenticated to change their account password
import { getSession } from "next-auth/react";
import { connectToDB } from "../../../src/utility-functions/auth/connectToDB";
import { compare, hash } from "bcryptjs";

export default async function handler(req, res) {
  // Grab the old and new password form submissions
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  // Verify that the user attempting to change a password is logged in
  const session = await getSession({ req: req }); // equals falsy if logged off
  if (!session) {
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }
  // Grab the current logged in email- only works b/c of [...nextAuth].js: return { email: user.email } @ end
  const userEmail = session.user.email;
  // Check the db for an account with the exact userEmail we have
  const client = await connectToDB();
  const db = client.db();
  const userAccount = await db
    .collection("users")
    .findOne({ email: userEmail }); // equals falsy if we can't find it

  // If account's not found, end the route here
  // (should work though, since we're logged in @ this point)
  if (!userAccount) {
    client.close();
    res.status(405).json({ message: "Something went wrong!" });
    return;
  }
  // If we find it, compare our oldPassword submission to the encryted db one
  const passwordsMatch = await compare(oldPassword, userAccount.password); // T/F
  if (!passwordsMatch) {
    client.close();
    res.status(408).json({ message: "Incorrect account password" });
    return; // if password's wrong, end the route here
  }
  // If passwords do match, make sure the newPassword is different than the old one
  if (oldPassword === newPassword) {
    client.close();
    res.status(408).json({ message: "This password has been used previously" });
    return; // end route here
  }
  // If passwords do match, encrypt the newPassword and replace the old one
  const hashedNewPassword = await hash(newPassword, 12);
  await db
    .collection("users")
    .updateOne({ email: userEmail }, { $set: { password: hashedNewPassword } });
  client.close();
  res.status(200).json({ message: "Password updated!" });
  return;
}
