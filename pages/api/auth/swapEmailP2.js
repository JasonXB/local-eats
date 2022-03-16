import { getSession } from "next-auth/react";
import { compare, hash } from "bcryptjs";
import { connectToDB } from "../helperFunctions/connectToDB";

export default async function handler(req, res) {
  const { submittedPIN } = req.body;

  // Capture the email we're currently logged in with
  const { newEmail, submittedPassword } = req.body;
  const session = await getSession({ req });
  if (!session) {
    res.status(422).json({ message: "User offline" }); //@ code error actions for this
    return; // Ensure the user is online
  }
  const userEmail = session.user.email;

  // Capture the data stored in the account's emailSwap object
  const client = await connectToDB(); // access db instance
  const db = client.db();
  const userAccount = await db
    .collection("users")
    .findOne({ email: userEmail });
  const correctHashedPIN = userAccount.emailSwap.hashedPIN;
  const expiryDate = userAccount.emailSwap.expiryDate;
  const newPendingEmail = userAccount.emailSwap.newEmail;

  // Verify the PIN submitted in the verify form
  const correctPIN = await compare(submittedPIN, correctHashedPIN); // Boolean
  // If the PIN is wrong, delete the emailSwap object on the account we're logged into
  if (!correctPIN) {
    await db
      .collection("users")
      .updateOne({ email: userEmail }, { $unset: { emailSwap: "" } });
    client.close();
    res.status(422).json({ message: "Wrong PIN" });
    return; // needed to stop rest of API route from executing
  }

  // If the PIN's correct, check to see if its expired
  const currentTime = new Date().getTime();
  const pinExpired = expiryDate < currentTime; // true if expired
  // If PIN's expired, end the route and delete the pending emailSwap object in the account
  if (pinExpired) {
    await db
      .collection("users")
      .updateOne({ email: userEmail }, { $unset: { emailSwap: "" } });
    client.close();
    res.status(422).json({ message: "PIN expired" });
    return; // needed to stop rest of API route from executing
  }

  // PAST THIS POINT, THE PIN IS CORRECT AND NOT EXPIRED
  // GO AHEAD AND SWAP THE ACCOUNT'S EMAIL AND DELETE THE SWAP OBJECT
  await db
    .collection("users")
    .updateOne(
      { email: userEmail },
      { $unset: { emailSwap: "" }, $set: { email: newPendingEmail } }
    );
  client.close();
  res.status(201).json({ message: "Swap procedure part 2 completed" });
}
