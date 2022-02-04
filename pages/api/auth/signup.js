import { connectToDB } from "../../../src/utility-functions/auth/connectToDB";
import { compareHashedPasswords, hashPassword } from "../../../src/utility-functions/auth/hashing"; // prettier-ignore
//# API Route file
export default async function handler(req, res) {
  if ((req.method = "POST")) {
    // Extract data from the request body
    const { email, password } = req.body;
    const hashedPassword = await hashPassword(password); // hash the password before storage
    // Access db instance
    const db = await connectToDB();
    // Check if a user with the submitted email exists already
    const existingUser = await db.collection("users").findOne({ email: email });
    if (existingUser) {
      res
        .status(422)
        .json({ message: "Account with this email exists already" });
      client.close();
      return;
    }
    // Enter the "users" collection to make a new account doc
    const result = await db.collection("users").insertOne({
      email,
      password: hashedPassword, // is hashed before insertion for security reasons
    });
    client.close();
    res.status(201).json({ message: "Created user!" });
  }
}
