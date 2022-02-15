import { compare } from "bcryptjs";
import { connectToDB } from "../../../src/utility-functions/auth/connectToDB";

//# API Route file
export default async function handler(req, res) {
  const { pendingEmail, submittedPIN } = req.body; // prettier-ignore
  const client = await connectToDB(); // access db instance
  const db = client.db();
  // Find the pending account created with the pending email and extract its data
  const pendingAccount = await db
    .collection("users")
    .findOne({ email: pendingEmail });
  const pinExpiryDate = pendingAccount.pinExpiryDate;
  const hashedVerifyPIN = pendingAccount.hashedVerifyPIN;

  // See if the submitted PIN from /verify-email matches the hashed version of the correct PIN we emailed
  const pinsMatch = await compare(submittedPIN, hashedVerifyPIN); // equals Boolean
  if (!pinsMatch) {
    await db.collection("users").deleteOne({ email: pendingEmail }); // delete the pending account
    client.close();
    res.status(422).json({ message: "Invalid PIN" });
    return; // if pins don't match, end the API route
  }

  // Check if the PIN is submitted before the time limit we're imposing
  const currentUnixTime = new Date().getTime();
  if (currentUnixTime > pinExpiryDate) {
    await db.collection("users").deleteOne({ email: pendingEmail }); // delete the pending account
    client.close();
    res.status(422).json({ message: "PIN has expired" });
    return; // if the PIN's expired, end the API route
  }

  // Past this point, the user's verified themselves
  // Make changes to the pending account to indicate it is now verified
  await db.collection("users").updateOne(
    { email: pendingEmail },
    {
      $set: { accountStatus: "verified" },
      $unset: { hashedVerifyPIN: "", pinExpiryDate: "" },
    }
  );
  client.close(); // end Mongo session
  res.status(201).json({ message: "Created user!" });
}
