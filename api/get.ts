import { VercelRequest, VercelResponse } from "@vercel/node";

import { getAll } from "../lib/getAll";

export default async (req: VercelRequest, res: VercelResponse) => {
  res.status(200).json(await getAll());
  console.log("API get responded successfully (200)");
};
