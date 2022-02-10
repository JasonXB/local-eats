import { hash, compare } from "bcryptjs";
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
//!!! Rehash parts of this copy pasted API route to change emails instead
export default async function handler(req, res) {
  // Extract data from request body
  const newEmail = req.body.email; // the email the user wishes to swap to
  const submittedPassword = req.body.submittedPassword; // may be correct or not
  const currentEmail = req.body.currentEmail; // old and already verified

  // Generate a 6 digit PIN to send via email, and create a hashed version that expires
  const normalPIN = makeId(6);
  const hashedPIN = await hash(normalPIN, 12);
  const expiryDate = new Date().getTime() + 1800000; // Unix 30 mins in future

  // Check if the submitted password matches the account the user's logged into
  const client = await connectToDB(); // access db instance
  const db = client.db();
  try {
    const userAccount = await db.collection("users").findOne({ email: currentEmail }); // prettier-ignore
    console.log(userAccount);
    const hashedAccountPassword = userAccount.password;
    const submittedPwIsCorrect = await compare(
      submittedPassword,
      hashedAccountPassword
    ); // returns a Boolean
    if (!submittedPwIsCorrect) throw new Error(); // if pw doesn't match, throw an error manually
  } catch (error) {
    res.status(422).json({ message: "Incorrect password provided" });
    return;
  }
  /*
  // Send the normal PIN to the new email
  const msg = {
    to: newEmail, // recipient
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

  // Edit the account to reflect an email swap has been started
  const pendingEmailChange = {
    address: newEmail,
    verificationPIN: hashedPIN,
    pinExpiryDate: expiryDate,
  };
  await db
    .collection("users")
    .updateOne({ email: currentEmail }, { $set: { pendingEmailChange } });
  client.close();
  */
  res.status(200).json({ message: "Pending account created" });
}
