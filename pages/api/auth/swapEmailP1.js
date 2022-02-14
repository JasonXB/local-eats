import { getSession } from "next-auth/react";
import { compare, hash } from "bcryptjs";
import { connectToDB } from "../../../src/utility-functions/auth/connectToDB";

// Helps identify blatantly fake emails
var validator = require("email-validator"); // https://yarnpkg.com/package/email-validator
// Sendgrid Email API
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function makeId(length) {
  var result = "";
  var characters = "0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export default async function handler(req, res) {
  // Capture the new proposed email and the one currently in use
  const { newEmail, submittedPassword } = req.body;
  const session = await getSession({ req });
  if (!session) {
    res.status(422).json({ message: "User offline" }); //@ code error actions for this
    return; // Ensure the user is online
  }
  const oldEmail = session.user.email;
  console.log(oldEmail, newEmail)
  if (newEmail === oldEmail) {
    res
      .status(422)
      .json({ message: "This email's already tied to your Local Eats account" });
    return;
  }

  // Check to see if the email looks blatantly fake
  const newEmailValidity = validator.validate(newEmail); // returns Boolean
  if (!newEmailValidity) {
    res.status(422).json({ message: "Invalid email entry" }); //@ code error actions for this
    return;
  }

  // Check to see if the new email is already in use by another Local-eats user
  const client = await connectToDB(); // access db instance
  const db = client.db();

  const newEmailAccount = await db
    .collection("users")
    .findOne({ email: newEmail });
  if (newEmailAccount && newEmailAccount.accountStatus === "verified") {
    // If the new email is being used by a verified account, end the route now
    client.close();
    res.status(422).json({ message: "This email is connected to an existing Local Eats account" }); // prettier-ignore
    return; //@ code error actions for this
  }

  // Check if the password provided matches the account found
  const currentAccount = await db
    .collection("users")
    .findOne({ email: oldEmail });
  console.log(currentAccount); //!!! equals null for some reason sometimes
  const passwordsMatch = await compare(
    submittedPassword,
    currentAccount.password
  ); // T/F
  if (!passwordsMatch) {
    client.close();
    res.status(408).json({ message: "Account password incorrect" });
    return; //@ code error actions for this
  }
  // PAST THIS POINT...
  // THE USER SUBMITTED A CORRECT ACCOUNT PASSWORD AND PICKED AN AVAILABLE NEW EMAIL

  // Generate a 6 digit PIN to send via email, and create a hashed version that expires
  const normalPIN = makeId(6);
  const hashedPIN = await hash(normalPIN, 12);
  const expiryDate = new Date().getTime() + 1800000; // Unix 30 mins in future
  // Send the normal PIN to the request body email
  const msg = {
    to: newEmail, // recipient
    from: "jasonxportfolio@gmail.com", // Change to your verified sender
    subject: "Verify Local Eats email change",
    text: "Please do not reply to sender",
    html: `Submit the following PIN code to complete an account email change on Local Eats: <strong>${normalPIN}</strong>`,
  };
  // Send an email containing a PIN for verification purpsoes
  sgMail.send(msg).catch((error) => {
    client.close();
    res.status(422).json({ message: "SendGrid API failure" }); //@ CODE ERROR ACTIONS
    return; // needed to stop rest of API route from executing
  });
  // Save an email swap object to the acccount on the DB
  const emailSwap = {
    newEmail,
    hashedPIN,
    expiryDate,
    emailSwapStatus: "pending",
  };
  await db
    .collection("users")
    .updateOne({ email: oldEmail }, { $set: { emailSwap } });
  client.close();
  res.status(201).json({ message: "Swap procedure part 1 completed" });
}
