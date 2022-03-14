import { compare } from "bcryptjs";
import { connectToDB } from "../../../src/utility-functions/auth/connectToDB";
import { pwStrengthCheck } from "../helperFunctions/pwStrengthCheck";
import { removeWhiteSpace } from "../../../src/utility-functions/general/lengthNoSpaces";

export default async function handler(req, res) {
  const { email, pin, newPassword } = req.body;

  // Connect to the DB
  const client = await connectToDB(); // access db instance
  const db = client.db();

  // If the code is not 6 digits long, end the route with an error immediately
  if (pin.length !== 6) {
    await db.collection("users").updateOne(
      { email: email }, //!!! repeat
      { $unset: { passwordChangePin: "", passwordChangePinExpiryDate: "" } }
    );
    client.close();
    res.status(401).json({ message: "Invalid PIN" });
    return;
  }
  // End the route if no new password is submitted
  const thinnedPassword = removeWhiteSpace(newPassword);
  if (thinnedPassword.length === 0) {
    await db.collection("users").updateOne(
      { email: email }, //!!! repeat
      { $unset: { passwordChangePin: "", passwordChangePinExpiryDate: "" } }
    );
    client.close();
    res.status(402).json({ message: "New password field empty" });
    return;
  }

  // Check the new password to see if it meets our standards
  let acceptablePW = pwStrengthCheck(newPassword); // Boolean
  if (!acceptablePW) {
    await db.collection("users").updateOne(
      { email: email }, //!!! repeat
      { $unset: { passwordChangePin: "", passwordChangePinExpiryDate: "" } }
    );
    client.close();
    res.status(403).json({ message: "Password does not meet requirements" });
    return;
  }

  // Find the account associated with the submitted email and extract its info saved in forgotPasswordP1 (api route)
  // If no account is found, end the route with an error
  const userAccount = await db.collection("users").findOne({ email: email });
  if (!userAccount) {
    await db.collection("users").updateOne(
      { email: email }, //!!! repeat
      { $unset: { passwordChangePin: "", passwordChangePinExpiryDate: "" } }
    );
    client.close();
    res
      .status(404)
      .json({ message: "No account found for the submitted email" });
    return;
  }
  const hashedVerifyPin = userAccount.passwordChangePin;
  const expiryDate = userAccount.passwordChangePinExpiryDate;

  // Compare the verification code with the pin submitted in the request body
  // If we don't get a match, end the route with an error
  const pinMatch = await compare(pin, hashedVerifyPin); // T/F
  if (!pinMatch) {
    await db.collection("users").updateOne(
      { email: email }, //!!! repeat
      { $unset: { passwordChangePin: "", passwordChangePinExpiryDate: "" } }
    );
    client.close();
    res.status(405).json({ message: "Incorrect PIN" });
    return;
  }

  // See if the PIN is submitted on time
  const currentUnixTime = new Date().getTime();
  if (currentUnixTime > expiryDate) {
    await db.collection("users").updateOne(
      { email: email }, //!!! repeat
      { $unset: { passwordChangePin: "", passwordChangePinExpiryDate: "" } }
    );
    client.close(); // don't forget to end Mongo session
    res.status(406).json({ message: "PIN has expired" });
    return;
  }

  // Past this point, we know the pin's correct & submitted on time
  // Change the password to what they suggested
  await db.collection("users").updateOne(
    { email: email },
    {
      $set: { password: newPassword }, // set the new password
      $unset: { passwordChangePin: "", passwordChangePinExpiryDate: "" },
      // delete the temporary pending change fields
    }
  );
  client.close(); // don't forget to end Mongo session
  res.status(201).json({ message: "Created user!" });
}
