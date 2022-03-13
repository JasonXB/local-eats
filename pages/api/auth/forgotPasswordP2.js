import { compare } from "bcryptjs";
import { connectToDB } from "../../../src/utility-functions/auth/connectToDB";
import {checkPasswordStrength} from "./signupP1"
//# API Route file
export default async function handler(req, res) {
  const { accountEmail, submittedPIN, newPassword } = req.body; // prettier-ignore
  //!!! Check if the suggested password is strong enough

  // Find the account the user's locked out of and extract its data
  const client = await connectToDB(); //  Connect to DB and access the db instance
  const db = client.db();
  const lockedOutAccount = await db
    .collection("users")
    .findOne({ email: accountEmail });

  // If no verified account with that email exists, don't let the user know that
  // Simply say the PIN is wrong, so malicious attackers get minimal info about targeting non existent accounts
  if (!existingUser || existingUser.accountStatus === "pending") {
    client.close(); // don't forget to close mongo session
    res.status(422).json({ message: "Invalid PIN" }); // prettier-ignore
    return;
  }
  // If a verified account with this email exists, extract the data we saved during forgotPasswordP1
  const hashedVerifyPIN = lockedOutAccount.passwordChangePin;
  const pinExpiryDate = lockedOutAccount.passwordChangePinExpiryDate;

  // Check if the PIN is submitted before the time limit we're imposing. If not...
  // If not... delete the password change PIN and expiry date (user failed the process and must restart)
  const currentUnixTime = new Date().getTime();
  if (currentUnixTime > pinExpiryDate) { 
    await db
      .collection("users")
      .updateOne(
        { email: accountEmail },
        { $unset: { passwordChangePin: "", passwordChangePinExpiryDate: "" } }
      );
    client.close();
    res.status(422).json({ message: "PIN has expired" });
    return; // if the PIN's expired, end the API route
  }

  // See if the submitted PIN matches the hashed version we saved to the DB
  // If not... delete the password change PIN and expiry date (user failed the process and must restart)
  const pinsMatch = await compare(submittedPIN, hashedVerifyPIN); // equals Boolean
  if (!pinsMatch) {
    await db
      .collection("users")
      .updateOne(
        { email: accountEmail },
        { $unset: { passwordChangePin: "", passwordChangePinExpiryDate: "" } } 
        // delete the temporary pending change fields
      );
    client.close();
    res.status(422).json({ message: "Invalid PIN" });
    return; // if pins don't match, end the API route
  }

  // Past this point, the user's verified email ownership. 
  // Change the password to what they suggested
  await db.collection("users").updateOne(
    { email: accountEmail },
    {
      $set: { password: newPassword }, // set the new password
      $unset: { passwordChangePin: "", passwordChangePinExpiryDate: "" }, 
      // delete the temporary pending change fields
    }
  );
  client.close(); // end Mongo session
  res.status(201).json({ message: "Created user!" });
}
