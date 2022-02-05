import { compare, hash } from "bcryptjs";
import { connectToDB } from "../../../src/utility-functions/auth/connectToDB";

//# API Route file
export default async function handler(req, res) {
  const { email, submittedPIN, hashedPIN, expiryDatePIN, password } = req.body; // prettier-ignore
  const hashedPassword = await hash(password, 12);
  // See if the submitted PIN from /verify-email matches the hashed version of the correct PIN we emailed
  const pinsMatch = await compare(submittedPIN, hashedPIN); // equals Boolean
  if (!pinsMatch) {
    res.status(422).json({ message: "Invalid PIN" });
    return; // if pins don't match, end the API route
  }
  console.log("Passed the PIN gate");

  // Check if the PIN is submitted before the time limit we're imposing
  // const currentUnixTime = new Date().getTime();
  // if (currentUnixTime > expiryDatePIN) {
  //   res.status(422).json({ message: "PIN has expired" });
  //   return; // if the PIN's expired, end the API route
  // }
  // console.log("Passed the expiry Unix gate");

  // Check if a user with the submitted email exists already
  const client = await connectToDB(); // access db instance
  const db = client.db();
  const existingUser = await db.collection("users").findOne({ email: email });
  if (existingUser) {
    res.status(422).json({ message: "Existing account is already tied to this email" }); // prettier-ignore
    client.close();
    return; // if this email's in use, end the API route and close the Mongo Session
  }
  console.log("Passed the existing account gate");

  // PAST THIS POINT, THE REQUIREMENTS TO CREATE A NEW ACCOUNT ARE MET
  // Enter the "users" collection to make a new account doc
  const result = await db.collection("users").insertOne({
    email,
    password: hashedPassword, // is hashed before insertion for security reasons
  });
  client.close(); // end Mongo session
  console.log("API route conquered!");
  res.status(201).json({ message: "Created user!" });
}
