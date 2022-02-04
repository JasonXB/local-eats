import { compare, hash } from "bcryptjs";

// Hash a password before we store it in the DB
export async function hashPassword(password) {
  // the higher the num, the more secure, but the slower this function takes
  const hashed = await hash(password, 12); // 12 is considered good
  return hashed;
}
// await hash(newPassword);  Must await for this to work!

// See if arg 1's regularly typed password matches arg 2's which is hashed
export async function compareHashedPasswords(password, alreadyHashedVersion) {
  const isValid = await compare(password, alreadyHashedVersion);
  return isValid; // T/F
}
// await verifyPassword(password, hashedVersion);  Must await for this to work!
