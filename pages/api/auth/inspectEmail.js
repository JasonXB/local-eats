var validator = require("email-validator"); 
// https://yarnpkg.com/package/email-validator

export default async function handler(req, res) {
  const emailToInspect = req.body.email;
  const validityBoolean = validator.validate(emailToInspect); // returns Boolean
  if (!validityBoolean) {
    res.status(422).json({ message: "invalid", response: validityBoolean });
  } else {
    res.status(200).json({ message: "valid", response: validityBoolean });
  }
}
