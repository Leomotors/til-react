import { VercelRequest, VercelResponse } from "@vercel/node";

import { db } from "../lib/Firestore";
import { addDoc, collection, doc, deleteDoc, getDoc } from "firebase/firestore";
import auth from "../lib/AdminAuth";

export default async (req: VercelRequest, res: VercelResponse) => {
  const { id, password } = req.body;

  if (!auth(password as string, res)) return;

  if (!id) {
    res.status(400).send("Bad Request");
    return;
  }

  try {
    const docRef = doc(db, "learned", id);
    const docSnap = await getDoc(docRef);
    const docData = docSnap.data();
    await addDoc(collection(db, "deleted"), { ...docData });
    await deleteDoc(docRef);
    res.status(200).send("Deleted Successfully (but why you would?)");
    console.log("API delete responded successfully (200)");
  } catch (err) {
    res.status(503).send("Internal Server Error");
  }
};
