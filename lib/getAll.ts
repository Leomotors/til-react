import { db } from "./Firestore";
import { collection, getDocs } from "firebase/firestore";

import { LearnedWithID } from "../src/models/Learned";

function cmp<T>(a: T, b: T) {
  if (a < b) return -1;
  else if (a == b) return 0;
  else return 1;
}

export async function getAll(): Promise<LearnedWithID[]> {
  const querySnapshot = await getDocs(collection(db, "learned"));

  const result: LearnedWithID[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    result.push({
      id: doc.id,
      what: data.what,
      date: data.date,
    });
  });

  result.sort((a, b) => {
    const t = cmp(a.date, b.date);
    if (t) return t;
    return cmp(a.what, b.what);
  });

  return result;
}
