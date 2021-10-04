import axios, { AxiosError } from "axios";

interface quoteResponse {
  quote: string;
}

export interface fullQuoteResponse extends quoteResponse {
  count: number;
}

export async function randomQuote(percent: number): Promise<string> {
  try {
    const res = await axios.get<quoteResponse>(`/api/quote?percent=${percent}`);
    return res.data.quote;
  } catch (err) {
    return "Server Error";
  }
}

export async function getAllQuote(
  password: string
): Promise<fullQuoteResponse[] | string> {
  try {
    const res = await axios.get<fullQuoteResponse[]>("/api/allquote", {
      params: {
        password,
      },
    });
    return res.data;
  } catch (err) {
    return "Password Incorrect";
  }
}
