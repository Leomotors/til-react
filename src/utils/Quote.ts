import axios from "axios";

import { miniQuote, Quote } from "../models/Quote";

export async function randomQuote(
  percent: number,
  lang: string
): Promise<string> {
  try {
    const res = await axios.get<miniQuote>("/api/quote", {
      params: {
        percent,
        lang,
      },
    });
    return res.data.quote;
  } catch (err) {
    // @ts-ignore
    return err.message as string;
  }
}

export async function getAllQuote(password: string): Promise<Quote[] | string> {
  try {
    const res = await axios.get<Quote[]>("/api/allquote", {
      params: {
        password,
      },
    });
    return res.data;
  } catch (err) {
    return "Password Incorrect";
  }
}
