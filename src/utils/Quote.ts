import axios from "axios";

interface quoteResponse {
  quote: string;
}

export interface fullQuoteResponse extends quoteResponse {
  count: number;
}

export async function randomQuote(percent: number): Promise<string> {
  const res = await axios.get<quoteResponse>(
    `http://localhost:3030/api/quote?percent=${percent}`
  );
  return res.data.quote;
}

export async function getAllQuote(): Promise<fullQuoteResponse[]> {
  const res = await axios.get<fullQuoteResponse[]>(
    "http://localhost:3030/api/allquotes?password=1234"
  );
  return res.data;
}
