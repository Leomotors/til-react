import axios from "axios";

import { miniQuote, Quote } from "../models/Quote";

export async function randomQuote(percent: number): Promise<string> {
  try {
    const res = await axios.get<miniQuote>(`/api/quote?percent=${percent}`);
    return res.data.quote;
  } catch (err) {
    return "Server Error";
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
