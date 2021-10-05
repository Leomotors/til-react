import { VercelResponse } from "@vercel/node";

export default function auth(password: string, res: VercelResponse): boolean {
  if (!process.env.ADMIN_PASSWORD) {
    res.status(500).send("Internal Server Error: Can't authenticate");
    return false;
  }
  if (process.env.ADMIN_PASSWORD != password) {
    res.status(403).send("Permission Denied: Incorrect Password");
    return false;
  }

  return true;
}
