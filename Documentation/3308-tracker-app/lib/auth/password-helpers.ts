import { compareSync, genSaltSync, hashSync } from "bcrypt-ts";
//This should encrypt the password for us
export async function hashPassword(password: string): Promise<string> {
  const salt = genSaltSync(10);
  const hashedPassword = hashSync(password, salt);
  return hashedPassword;
}

//This will take in the password a user wrote, and compare them
export async function verifyPassword({ password, hashedPassword }: { password: string, hashedPassword: string }): Promise<boolean> {

  if (!password || !hashedPassword) {
    console.log('Missing password or hashed password for verification');
    return false;
  } else {
    return compareSync(password, hashedPassword);
  }
}