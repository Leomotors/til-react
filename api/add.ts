import { VercelRequest, VercelResponse } from "@vercel/node";

import { db } from "../lib/Firestore";
import { collection, addDoc } from "firebase/firestore";
import auth from "../lib/AdminAuth";

export default async (req: VercelRequest, res: VercelResponse) => {
  const { what, date, password } = req.body;

  if (!auth(password as string, res)) return;

  if (!(what && date)) {
    res.status(400).send("Bad Request");
    return;
  }

  try {
    await addDoc(collection(db, "learned"), {
      what,
      date,
    });
    res.status(200).send("Success");
    console.log("API add responded successfully (200)");
  } catch (err) {
    res.status(500).send("Internal Server Error");
    console.log(`Internal Error: ${err}`);
  }
};
