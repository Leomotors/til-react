import { VercelRequest, VercelResponse } from "@vercel/node";

import { getQuote } from "../lib/getQuote";

export default async (req: VercelRequest, res: VercelResponse) => {
  const { percent, lang } = req.query;

  const perc = parseInt(percent as string);

  if (!(lang == "en" || lang == "th")) {
    res.status(400).send("Bad Request: Language invalid");
    return;
  }

  if (perc < 0 || perc > 100 || isNaN(perc)) {
    res.status(400).json({ error: "Bad Query" });
    return;
  }

  const quote = await getQuote(perc, lang as string);
  res.status(200).json({ ...quote });
  console.log("API quote responded successfully (200)");
};
