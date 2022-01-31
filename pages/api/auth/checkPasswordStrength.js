var taiPasswordStrength = require("tai-password-strength"); 

var strengthTester = new taiPasswordStrength.PasswordStrength();

export default async function handler(req, res) {
  const passwordToInspect = req.body.password;
  // Inspect the response and see if our conditions are met
  let results = strengthTester.check(passwordToInspect);
  const conditions = {
    characterDiversity: results.charsetSize >= 80,
    commonPassword: !results.commonPassword,
    adequateLength: results.passwordLength >= 8,
    adequateStrength: results.strengthCode != "VERY_WEAK" || results.strengthCode != "WEAK", // prettier-ignore
    includesNumber: results.charsets.number === true,
    includesLowercase: results.charsets.lower === true,
    includesUppercase: results.charsets.upper === true,
    includesSymbol: results.charsets.symbol === true,
    excludesPunctuation: !results.charsets.punctuation,
  }; // if this object contains a falsy, the password is not acceptable
  // Check if any of the KVP's in that object equal false
  let falseInside = Object.values(conditions).includes(false); // Boolean
  console.log(falseInside)
  if (falseInside) {
    // If we have a false in the object, throw an error
    res.status(422).json({ message: "Invalid password" });
  } else {
    // If the object is falsy free, return a success code
    res.status(200).json({ message: "Valid password" });
  }
}

/* Response from our password validation library:

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

// https://yarnpkg.com/package/tai-password-strength
// http://tests-always-included.github.io/password-strength/
*/
