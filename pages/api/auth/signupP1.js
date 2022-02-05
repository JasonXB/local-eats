import { hash } from "bcryptjs";
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
  // Generate a 6 digit PIN to send via email, and create a hashed version
  const normalPIN = makeId(6);
  const hashedPIN = await hash(normalPIN, 12);
  // Generate Unix timestamp 30 mins into future
  const expiryDate = new Date().getTime() + 30 * 60; // 30 mins in future
  // Send the normal PIN to the request body email
  const emailToVerify = req.body.email;
  const msg = {
    to: emailToVerify, // recipient
    from: "jasonxportfolio@gmail.com", // Change to your verified sender
    subject: "Verify Local Eats email",
    text: "Please do not reply to sender",
    html: `Submit the following PIN code to verify your email on Local Eats: <strong>${normalPIN}</strong>`,
  };
  const sendEmail = await sgMail.send(msg);
  res.status(200).json({ message: "Email sent", hashedPIN, expiryDate });

  // sgMail
  //   .send(msg)
  //   .then(() => {
  //     res.status(200).json({ message: "Email sent", hashedPIN, expiryDate });
  //     return;
  //   })
  //   .catch((error) => {
  //     res.status(422).json({ message: "SendGrid API failure" });
  //     return;
  //   });

  return;
}
