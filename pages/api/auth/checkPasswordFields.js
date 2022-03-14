//# API Route that allows the authenticated to change their account password
import { getSession } from "next-auth/react";
import { connectToDB } from "../../../src/utility-functions/auth/connectToDB";
import { compare, hash } from "bcryptjs";
import { pwStrengthCheck } from "../helperFunctions/pwStrengthCheck";
import { removeWhiteSpace, lengthNoSpaces } from "../../../src/utility-functions/general/lengthNoSpaces"; // prettier-ignore

export default async function handler(req, res) {
  // Extract data from the request body and
  let { newPassword1, newPassword2, oldPassword } = req.body;
  // Check to see if the password fields are filled in (if not, end the route w/ an error)
  if (oldPassword.length === 0) {
    return res.status(401).json({ message: "Old password field empty" });
  }
  if (newPassword1.length === 0) {
    return res.status(402).json({ message: "New password field empty" });
  }
  if (newPassword2.length === 0) {
    return res.status(403).json({ message: "Verify password field empty" });
  }

  // remove all whitespace
  newPassword1 = removeWhiteSpace(newPassword1);
  newPassword2 = removeWhiteSpace(newPassword2);
  oldPassword = removeWhiteSpace(oldPassword);
  console.log(newPassword1, newPassword2, oldPassword);

  // Check to see if newPassword1 and oldPassword are different
  if (newPassword1 == oldPassword) {
    return res.status(404).json({ message: "New password must be different" });
  }

  // Check to see if newPassword1 and newPassword2 match
  if (newPassword1 !== newPassword2) {
    return res.status(405).json({ message: "newPassword2 !== newPassword1" });
  }

  // PAST THIS POINT...
  // 1) All email fields are filled in
  // 2) The oldPassword and newPassword inputs are different
  // 3) The newPassword field and verify password field have the same input values

  // Check the strength of the newly proposed password
  const acceptable = pwStrengthCheck(newPassword1); //bool
  if (!acceptable) {
    return res
      .status(406)
      .json({ message: "Password does not meet requirements" });
  }
  
  // Verify that the user attempting to change a password is logged in
  const session = await getSession({ req: req }); // equals falsy if logged off
  if (!session) {
    res.status(407).json({ message: "Not authenticated!" });
    return;
    // getServerSideProps in the parent component should reroute users who are offline
    // No need to handLe this error in the switch statement in ChangePassword.js for this reason
  }

  // Grab the current logged in email- only works b/c of [...nextAuth].js: return { email: user.email } @ end
  const userEmail = session.user.email;
  // Check the db for an account with the exact userEmail we have
  const client = await connectToDB();
  const db = client.db();
  const userAccount = await db
    .collection("users")
    .findOne({ email: userEmail }); // equals falsy if we can't find it

  // If account's not found, end the route here
  // (should work though, since we're logged in @ this point)
  if (!userAccount) {
    client.close();
    return res.status(408).json({ message: "Something went wrong!" });
    // should only go wrong if MongoDB's platform has issues
  }

  // If we find the account, compare our oldPassword submission to the hashed db one
  const passwordsMatch = await compare(oldPassword, userAccount.password); // T/F
  if (!passwordsMatch) {
    client.close();
    return res.status(409).json({ message: "Old password incorrect" });
  }

  // If passwords do match, hash newPassword1 and replace the old one
  const hashedNewPassword = await hash(newPassword1, 12);
  await db
    .collection("users")
    .updateOne({ email: userEmail }, { $set: { password: hashedNewPassword } });
  client.close();
  res.status(200).json({ message: "Password updated!" });
  return;
}

/*
Response from our password validation library:
On the form, check for
1. No whitespace
2. No empty string responses

From this library, check
charsetSize: 83 or higher
commonPassword: false
passwordLength: 8 or higher
strengthCode: not "VERY_WEAK", not "WEAK". Need it "REASONABLE", "STRONG", or "VERY_STRONG"
trigraphEntropyBits: (don't care)
charsets:
  number: true
  lower: true
  upper: true
  punctuation: false
  symbol: true
  other (don't care)
https://yarnpkg.com/package/tai-password-strength
http://tests-always-included.github.io/password-strength/

*/
