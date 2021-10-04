import { VercelRequest, VercelResponse } from "@vercel/node";

import { getAllQuotes } from "../lib/getQuote";

export default (req: VercelRequest, res: VercelResponse) => {
  const { password } = req.query;

  if (password != "1234") {
    res.status(403).json({ error: "Incorrect Password" });
    return;
  }

  console.log("API allquote responded");
  res.status(200).json(getAllQuotes());
};
