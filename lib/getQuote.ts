import { db } from "./Firestore";
import { collection, getDocs } from "firebase/firestore";

import { Quote } from "../src/models/Quote";

export async function getQuote(percent: number): Promise<string> {
  const data = await getAllQuotes();
  console.log(`data: ${data}`);
  const quote = data[Math.floor(Math.random() * data.length)];
  const count = Math.ceil((quote.count * (100 - percent)) / 100);
  return quote.quote.replace("__PARAM__", count.toString());
}

export async function getAllQuotes(): Promise<Quote[]> {
  const querySnapshot = await getDocs(collection(db, "quotes"));

  let result: Quote[] = [];
  querySnapshot.forEach((doc) => {
    result.push({
      id: doc.id,
      quote: doc.data().quote,
      count: doc.data().count,
      created_at: doc.data().created_at,
    });
  });
  return result;
}
