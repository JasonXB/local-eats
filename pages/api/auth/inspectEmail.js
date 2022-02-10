var validator = require("email-validator"); // https://yarnpkg.com/package/email-validator

export default async function handler(req, res) {
  console.log("hello")
  const emailToInspect = req.body.email;
  const validityBoolean = await validator.validate(emailToInspect); // returns Boolean
  console.log(555, emailToInspect, validityBoolean);
  if (!validityBoolean) {
    res.status(422).json({ message: "invalid", response: validityBoolean });
  } else {
    res.status(200).json({ message: "valid", response: validityBoolean });
  }
}
