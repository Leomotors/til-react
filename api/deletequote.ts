import { VercelRequest, VercelResponse } from "@vercel/node";

import { db } from "../lib/Firestore";
import { doc, deleteDoc } from "firebase/firestore";
import auth from "../lib/AdminAuth";

export default async (req: VercelRequest, res: VercelResponse) => {
  const { id, password } = req.body;

  if (!auth(password as string, res)) return;
};
