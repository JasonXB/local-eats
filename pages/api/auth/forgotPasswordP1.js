import { hash, compare } from "bcryptjs";
import { connectToDB } from "../../../src/utility-functions/auth/connectToDB";
import { makeID } from "../helperFunctions/makeID";

// Use to check for bltantly fake emails
var validator = require("email-validator"); // https://yarnpkg.com/package/email-validator

// Use to send emails
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  // Capture payload values
  const { email } = req.body;

  // Connect to Mongo Cluster
  const client = await connectToDB(); // access db instance
  const db = client.db();

  // Check to see if the email is blatantly fake (end the route if it is)
  const validity = validator.validate(email); // returns Boolean
  if (!validity) {
    client.close(); // don't forget to close mongo session
    res.status(422).json({ message: "Invalid email" });
    return;
  }

  // End route if the email's not in use by a verified account
  const existingUser = await db.collection("users").findOne({ email });
  if (!existingUser || existingUser.accountStatus === "pending") {
    client.close(); // don't forget to close mongo session
    res.status(422).json({ message: "Email not tied to a verified account" }); // prettier-ignore
    return;
    // Do not tell the user if this error gets triggered
    // Malicious attackers shouldn't know if an email is being used or not
  } // PAST THIS POINT, THE EMAIL BELONGS TO A VERIFIED ACCOUNT

  // Generate a 6 digit PIN to send via email, and create a hashed version that expires
  const normalPIN = makeID(6);
  const hashedPIN = await hash(normalPIN, 12);
  const expiryDate = new Date().getTime() + 1800000; // Unix 30 mins in future
  const msg = {
    to: email, // recipient
    from: "jasonxportfolio@gmail.com", // Change to your verified sender
    subject: "Forget your Local Eats password?",
    text: "Please do not reply to sender",
    html: `Submit the following PIN code to create a new password for your Local Eats account: <strong>${normalPIN}</strong> If you did not forget your password, go ahead and ignore this`,
  };

  // Store some data in the user's account that'll help us verify the user's submitted PIN
  await db.collection("users").updateOne(
    { email },
    {
      $set: {
        passwordChangePIN: hashedPIN, // will use to verify the email's owned by the user
        passwordChangePINExpiryDate: expiryDate, // used to determine if the PIN's submitted on time
      },
    }
  );
  client.close();

  // Send an email containing the unhashed generated PIN for verification purpsoes
  sgMail.send(msg).catch((error) => {
    res.status(404).json({ message: "Email not sent" });
    return; // needed to stop rest of API route from executing
  });
  res
    .status(200)
    .json({ message: "Forgotten password email sent successfully" });
}
