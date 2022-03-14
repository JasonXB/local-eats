import { hash, compare } from "bcryptjs";
import { connectToDB } from "../../../src/utility-functions/auth/connectToDB";
import { makeID } from "../helperFunctions/makeID";
import { pwStrengthCheck } from "../helperFunctions/pwStrengthCheck";

// Use to check for bltantly fake emails
var validator = require("email-validator"); // https://yarnpkg.com/package/email-validator
// Use to assess password strength
var taiPasswordStrength = require("tai-password-strength");
var strengthTester = new taiPasswordStrength.PasswordStrength();
// Use to send emails
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  // Capture payload values
  const { email, password, verifyPassword } = req.body;

  // Check to see if the 2 submitted passwords match
  if (password !== verifyPassword) {
    res.status(422).json({ message: "This password does not match the first" });
    return;
  }

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

  // End route if the email's already in use by a verified account
  const existingUser = await db.collection("users").findOne({ email });
  if (existingUser && existingUser.accountStatus === "verified") {
    client.close(); // don't forget to close mongo session
    res.status(422).json({ message: "This email is tied to a verified account" }); // prettier-ignore
    return;
  }

  // See if the password provided meets our requirements
  let acceptablePW = pwStrengthCheck(password); // Boolean
  if (!acceptablePW) {
    client.close(); // don't forget to close mongo session
    res.status(422).json({ message: "Password does not meet requirements" });
    return; // If password's insufficent, throw an error nd end the route
  } // PAST THIS POINT, THE EMAIL IS UNIQUE/LIKELY REAL + THE PASSWORD IS STRONG ENOUGH

  // Generate a 6 digit PIN to send via email, and create a hashed version that expires
  const normalPIN = makeID(6);
  const hashedPIN = await hash(normalPIN, 12);
  const hashedPassword = await hash(password, 12); // hashed version of submitted password from earlier
  const expiryDate = new Date().getTime() + 1800000; // Unix 30 mins in future
  const msg = {
    to: email, // recipient
    from: "jasonxportfolio@gmail.com", // Change to your verified sender
    subject: "Verify Local Eats email",
    text: "Please do not reply to sender",
    html: `Submit the following PIN code to verify your email on Local Eats: <strong>${normalPIN}</strong>. If you did not try to create an account, ignore this email.`,
  };

  // Send an email containing the unhashed generated PIN for verification purpsoes
  sgMail.send(msg).catch((error) => {
    client.close();
    res.status(422).json({ message: "Error" });
    return; // needed to stop rest of API route from executing
  });

  // IF THE EMAIL IS NOT ASSOCIATED WITH ANY ACCOUNT... VERIFIED OR PENDING
  // Create a new pending account on MongoDB
  if (!existingUser) {
    await db.collection("users").insertOne({
      email,
      password: hashedPassword, // is hashed before insertion for security reasons
      hashedVerifyPIN: hashedPIN, // will use to verify the email's owned by the user
      pinExpiryDate: expiryDate,
      accountStatus: "pending",
    });
    client.close();
    res.status(200).json({ message: "Pending account created" });
  }

  // IF THE EMAIL'S CONNECTED TO A PENDING ACCOUNT
  // Update the pending account data so that the latest form submitter has a chance to verify ownership
  else if (existingUser.accountStatus === "pending") {
    await db.collection("users").updateOne(
      {
        email,
      },
      {
        $set: {
          email,
          password: hashedPassword, // is hashed before insertion for security reasons
          hashedVerifyPIN: hashedPIN, // will use to verify the email's owned by the user
          pinExpiryDate: expiryDate,
          accountStatus: "pending",
        },
      }
    );
    client.close();
    res.status(200).json({ message: "Pending account created" });
  }
}

export const checkPasswordStrength = function (pw) {};
