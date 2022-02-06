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

  // Check if the PIN is submitted before the time limit we're imposing
  const currentUnixTime = new Date().getTime();
  if (currentUnixTime > expiryDatePIN) {
    res.status(422).json({ message: "PIN has expired" });
    return; // if the PIN's expired, end the API route
  }

  // PAST THIS POINT, THE REQUIREMENTS TO CREATE A NEW ACCOUNT ARE MET
  // Enter the "users" collection to make a new account doc
  const client = await connectToDB(); // access db instance
  const db = client.db();
  const result = await db.collection("users").insertOne({
    email,
    password: hashedPassword, // is hashed before insertion for security reasons
  });
  
  client.close(); // end Mongo session
  res.status(201).json({ message: "Created user!" });
}
