import bcrypt from "bcryptjs";

//This should encrypt the password for us
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

//This will take in the password a user wrote, and compare them
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}