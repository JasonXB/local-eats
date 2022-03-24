import { hash, compare } from "bcryptjs";
import { connectToDB } from "../helperFunctions/connectToDB";
import { pwStrengthCheck } from "../helperFunctions/pwStrengthCheck";
import { removeWhiteSpace } from "../../../src/utility-functions/general/lengthNoSpaces";

export default async function handler(req, res) {
  const { email, pin, newPassword } = req.body;

  // Connect to the DB
  const client = await connectToDB(); // access db instance
  const db = client.db();

  // Create utility functions that help end the API route when the user submits invalid information
  const endFailedProcess = async () => {
    // For when a user makes a genuine attempt to verify an email and fails (incorrect or expired pin for ex.)
    await db
      .collection("users")
      .updateOne(
        { email: email },
        { $unset: { passwordChangePin: "", passwordChangePinExpiryDate: "" } }
      );
    client.close();
  };
  const endWithSecondChance = () => {
    // For when the user makes an innocent mistake (forgets to fill a field for ex.)
    client.close(); // close DB session but don't erase the pending data on the user account
  };

  // If the code is not 6 digits long, end the route (innocent mistake)
  if (pin.length !== 6) {
    endWithSecondChance();
    res.status(400).json({ message: "Invalid PIN" });
    return;
  }
  // End the route if the new password is submitted empty (innocent mistake)
  const thinnedPassword = removeWhiteSpace(newPassword);
  if (thinnedPassword.length === 0) {
    endWithSecondChance();
    res.status(400).json({ message: "New password field empty" });
    return;
  }
  // Check the new password to see if it meets our standards (innocent mistake if it doesn't)
  let acceptablePW = pwStrengthCheck(newPassword); // Boolean
  if (!acceptablePW) {
    endWithSecondChance();
    res.status(400).json({ message: "Password does not meet requirements" });
    return;
  }

  // Find the account associated with the submitted email and extract its info saved in forgotPasswordP1 (api route)
  // If no account is found, end the route with a harsh error
  const userAccount = await db.collection("users").findOne({ email: email });
  if (!userAccount) {
    await endFailedProcess();
    res
      .status(400)
      .json({ message: "No account found for the submitted email" });
    return;
  }
  const hashedVerifyPin = userAccount.passwordChangePin;
  const expiryDate = userAccount.passwordChangePinExpiryDate;

  // Compare the verification code with the pin submitted in the request body
  // If we don't get a match, end the route with a harsh error
  const pinMatch = await compare(pin, hashedVerifyPin); // T/F
  if (!pinMatch) {
    await endFailedProcess();
    res.status(400).json({ message: "Incorrect PIN" });
    return;
  }

  // See if the PIN is submitted on time. If not, end with a harsh error
  const currentUnixTime = new Date().getTime();
  if (currentUnixTime > expiryDate) {
    await endFailedProcess();
    res.status(400).json({ message: "PIN has expired" });
    return;
  }

  // Past this point, we know the pin's correct & submitted on time
  // Change the password to what they suggested, but hash it first
  const hashedPW = await hash(newPassword, 12);

  await db.collection("users").updateOne(
    { email: email },
    {
      $set: { password: hashedPW }, // set the new password
      $unset: { passwordChangePin: "", passwordChangePinExpiryDate: "" },
      // delete the temporary pending change fields
    }
  );
  client.close(); // don't forget to end Mongo session
  res.status(201).json({ message: "Created user!" });
}
