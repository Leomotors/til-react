import { VercelRequest, VercelResponse } from "@vercel/node";

import { db } from "../lib/Firestore";
import { doc, deleteDoc } from "firebase/firestore";
import auth from "../lib/AdminAuth";

export default async (req: VercelRequest, res: VercelResponse) => {
  const { id, password } = req.body;

  if (!auth(password as string, res)) return;

  if (!id) {
    res.status(400).send("Bad Request");
    return;
  }

  try {
    await deleteDoc(doc(db, "quotes", id));
    res.status(200).send("Deleted Quote Successfully");
  } catch (err) {
    res.status(503).send("Internal Server Error");
  }
};
