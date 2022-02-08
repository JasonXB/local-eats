import { compare, hash } from "bcryptjs";
export default async function handler(req, res) {
  const { submittedPassword, hashedPassword } = req.body; // prettier-ignore
  const isValid = await compare(submittedPassword, hashedPassword);
  if (isValid) res.status(200).json({ message: "Logged in" });
  else res.status(422).json({ message: "Wrong password" });
}
