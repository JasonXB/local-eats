var validator = require("email-validator");

export default async function handler(req, res) {
  const emailToInspect = req.body.email;
  const valid = validator.validate(emailToInspect); // Boolean
  if (!valid) {
    res.status(422).json({ message: "Invalid email", response: valid });
  } else {
    res.status(200).json({ message: "Valid email", response: true });
  }
}
// https://yarnpkg.com/package/email-validator