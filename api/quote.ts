import { VercelRequest, VercelResponse } from "@vercel/node";

import { getQuote } from "../lib/getQuote";

export default (request: VercelRequest, response: VercelResponse) => {
  const { percent } = request.query;

  const perc = parseInt(percent as string);

  if (perc < 0 || perc > 100 || isNaN(perc)) {
    response.status(401).json({ error: "Bad Query" });
    return;
  }

  response.status(200).json({ quote: getQuote(perc) });
};
