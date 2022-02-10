import { db } from "./Firestore";
import { collection, getDocs } from "firebase/firestore";

import { LearnedWithID } from "../src/models/Learned";

export async function getAll(): Promise<LearnedWithID[]> {
  const querySnapshot = await getDocs(collection(db, "learned"));

  let result: LearnedWithID[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    result.push({
      id: doc.id,
      what: data.what,
      date: data.date,
    });
  });
  return result;
}
