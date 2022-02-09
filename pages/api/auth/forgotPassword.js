var generatePassword = require("password-generator");

var maxLength = 18;
var minLength = 12;
var uppercaseMinCount = 3;
var lowercaseMinCount = 3;
var numberMinCount = 2;
var specialMinCount = 2;
var UPPERCASE_RE = /([A-Z])/g;
var LOWERCASE_RE = /([a-z])/g;
var NUMBER_RE = /([\d])/g;
var SPECIAL_CHAR_RE = /([\?\-])/g;
var NON_REPEATING_CHAR_RE = /([\w\d\?\-])\1{2,}/g;

function isStrongEnough(password) {
  var uc = password.match(UPPERCASE_RE);
  var lc = password.match(LOWERCASE_RE);
  var n = password.match(NUMBER_RE);
  var sc = password.match(SPECIAL_CHAR_RE);
  var nr = password.match(NON_REPEATING_CHAR_RE);
  return (
    password.length >= minLength &&
    !nr &&
    uc &&
    uc.length >= uppercaseMinCount &&
    lc &&
    lc.length >= lowercaseMinCount &&
    n &&
    n.length >= numberMinCount &&
    sc &&
    sc.length >= specialMinCount
  );
}

function customPassword() {
  var password = "";
  var randomLength =
    Math.floor(Math.random() * (maxLength - minLength)) + minLength;
  while (!isStrongEnough(password)) {
    password = generatePassword(randomLength, false, /[\w\d\?\-]/);
  }
  return password;
}

console.log(customPassword()); // => 2hP5v?1KKNx7_a-W

export default async function handler(req, res) {
  //@ Check if an account using the submitted email even exists
  // If not (mayb don't clue the melicious attacker in)
  // If so
  //@ Send an email with a temporary password over to the legitimate email
  //@ Make them log in via magic link or something
  // if (!validityBoolean) {
  //   res.status(422).json({ message: "invalid", response: validityBoolean });
  // } else {
  //   res.status(200).json({ message: "valid", response: validityBoolean });
  // }
}
