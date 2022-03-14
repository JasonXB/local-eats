import { compare } from "bcryptjs";
import { connectToDB } from "../../../src/utility-functions/auth/connectToDB";
import { pwStrengthCheck } from "../helperFunctions/pwStrengthCheck";
//# API Route file
export default async function handler(req, res) {
  const { accountEmail, submittedPIN, newPassword } = req.body; // prettier-ignore

  // Check if the suggested password is strong enough
  const acceptablePW = pwStrengthCheck(newPassword);
  if (!acceptablePW) {
    res.status(422).json({ message: "Password does not meet requirements" }); // prettier-ignore
    return; // end the route
  } // past this point the password is strong enough to replace the old one

  // Find the account the user's locked out of and extract its data
  const client = await connectToDB(); //  Connect to DB and access the db instance
  const db = client.db();
  const lockedOutAccount = await db
    .collection("users")
    .findOne({ email: accountEmail });

  // If no verified account with that email exists, don't let the user know that
  // Simply say the PIN is wrong, so malicious attackers get minimal info about targeting non existent accounts
  if (!existingUser || existingUser.accountStatus === "pending") {
    client.close(); // don't forget to end Mongo session
    res.status(422).json({ message: "Invalid PIN" }); // prettier-ignore
    return;
  }

  // If a verified account with this email does exist, extract the data we saved during forgotPasswordP1 (api route)
  const hashedVerifyPIN = lockedOutAccount.passwordChangePin;
  const pinExpiryDate = lockedOutAccount.passwordChangePinExpiryDate;

  // Check if the PIN is submitted before the time limit we're imposing. If not...
  // If not, delete the password change PIN and expiry date (user failed the process and must restart)
  const currentUnixTime = new Date().getTime();
  if (currentUnixTime > pinExpiryDate) {
    await db
      .collection("users")
      .updateOne(
        { email: accountEmail },
        { $unset: { passwordChangePin: "", passwordChangePinExpiryDate: "" } }
      );
    client.close(); // don't forget to end Mongo session
    res.status(422).json({ message: "PIN has expired" });
    return; // if the PIN's expired, end the API route
  }

  // See if the submitted PIN matches the hashed version we saved to the DB
  // If not, delete the password change PIN and expiry date (user failed the process and must restart)
  const pinsMatch = await compare(submittedPIN, hashedVerifyPIN); // equals Boolean
  if (!pinsMatch) {
    await db.collection("users").updateOne(
      { email: accountEmail },
      { $unset: { passwordChangePin: "", passwordChangePinExpiryDate: "" } }
      // delete the temporary pending change fields
    );
    client.close(); // don't forget to end Mongo session
    res.status(422).json({ message: "Invalid PIN" });
    return; // if pins don't match, end the API route
  }

  // Past this point, the user has verified email ownership.
  // Change the password to what they suggested
  await db.collection("users").updateOne(
    { email: accountEmail },
    {
      $set: { password: newPassword }, // set the new password
      $unset: { passwordChangePin: "", passwordChangePinExpiryDate: "" },
      // delete the temporary pending change fields
    }
  );
  client.close(); // don't forget to end Mongo session
  res.status(201).json({ message: "Created user!" });
}
