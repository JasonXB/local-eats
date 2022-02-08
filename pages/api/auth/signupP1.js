import { hash } from "bcryptjs";
import { connectToDB } from "../../../src/utility-functions/auth/connectToDB";
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
  const emailToVerify = req.body.email;
  const hashedPassword = await hash(req.body.password, 12);
  // Generate a 6 digit PIN to send via email, and create a hashed version that expires
  const normalPIN = makeId(6);
  const hashedPIN = await hash(normalPIN, 12);
  const expiryDate = new Date().getTime() + 1800000; // Unix 30 mins in future
  // Send the normal PIN to the request body email
  const msg = {
    to: emailToVerify, // recipient
    from: "jasonxportfolio@gmail.com", // Change to your verified sender
    subject: "Verify Local Eats email",
    text: "Please do not reply to sender",
    html: `Submit the following PIN code to verify your email on Local Eats: <strong>${normalPIN}</strong>`,
  };

  // Send an email containing a PIN for verification purpsoes
  sgMail.send(msg).catch((error) => {
    res.status(422).json({ message: "SendGrid API failure" });
    return;
  });

  // Create a pending account on MongoDB
  const client = await connectToDB(); // access db instance
  const db = client.db();
  await db.collection("users").insertOne({
    email: emailToVerify,
    password: hashedPassword, // is hashed before insertion for security reasons
    hashedVerifyPIN: hashedPIN, // will use to verify the email's owned by the user
    pinExpiryDate: expiryDate,
    accountStatus: "pending",
  });
  client.close();
  res.status(200).json({ message: "Pending account created" });
}
