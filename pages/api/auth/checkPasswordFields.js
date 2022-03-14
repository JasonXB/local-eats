import { pwStrengthCheck } from "../helperFunctions/pwStrengthCheck";
import {
  removeWhiteSpace,
  lengthNoSpaces,
} from "../../../src/utility-functions/general/lengthNoSpaces";

export default async function handler(req, res) {
  // Extract data from the request body and
  let { newPassword1, newPassword2, oldPassword } = req.body;
  // Check to see if the password fields are filled in (if not, end the route w/ an error)
  if (oldPassword.length === 0) {
    return res.status(422).json({ message: "Old password field empty" });
  }
  if (newPassword1.length === 0) {
    return res.status(422).json({ message: "New password field empty" });
  }
  if (newPassword2.length === 0) {
    return res.status(422).json({ message: "Verify password field empty" });
  }

  // remove all whitespace
  newPassword1 = removeWhiteSpace(newPassword1);
  newPassword2 = removeWhiteSpace(newPassword2);
  oldPassword = removeWhiteSpace(oldPassword);
  console.log(newPassword1, newPassword2, oldPassword);

  // Check to see if newPassword1 and oldPassword are different
  if (newPassword1 == oldPassword) {
    return res.status(422).json({ message: "New password must be different" });
  }

  // Check to see if newPassword1 and newPassword2 match
  if (newPassword1 !== newPassword2) {
    return res.status(422).json({ message: "newPassword2 !== newPassword1" });
  }

  // PAST THIS POINT...
  // 1) All email fields are filled in
  // 2) The oldPassword and newPassword inputs are different
  // 3) The newPassword field and verify password field have the same input values

  // Check the strength of the newly proposed password
  const acceptable = pwStrengthCheck(newPassword1); //bool
  if (acceptable) {
    return res
      .status(422)
      .json({ message: "Password does not meet requirements" });
  } else {
    return res.status(200).json({ message: "Valid password" });
  }
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
