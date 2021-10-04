import { VercelRequest, VercelResponse } from "@vercel/node";

import { db } from "../lib/Firestore";
import { collection, addDoc } from "firebase/firestore";

export default async (req: VercelRequest, res: VercelResponse) => {
  const { quote, count, password } = req.body;

  if (password != "1234") {
    res.status(403).send("Permission Denied");
    return;
  }

  if (!(quote.length && count)) {
    res.status(400).send("Bad Request");
    return;
  }

  try {
    await addDoc(collection(db, "quotes"), {
      quote,
      count,
    });
    console.log("API addquote responded successfully (200)");
    res.status(200).send("Success");
  } catch (err) {
    console.log(`Internal Error: ${err}`);
    res.status(500).send("Internal Server Error");
  }
};
