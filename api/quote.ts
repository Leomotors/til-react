import { VercelRequest, VercelResponse } from "@vercel/node";

import { getQuote } from "../lib/getQuote";

export default async (req: VercelRequest, res: VercelResponse) => {
  const { percent } = req.query;

  const perc = parseInt(percent as string);

  if (perc < 0 || perc > 100 || isNaN(perc)) {
    res.status(401).json({ error: "Bad Query" });
    return;
  }

  res.status(200).json({ quote: await getQuote(perc) });
  console.log("API quote responded successfully (200)");
};
