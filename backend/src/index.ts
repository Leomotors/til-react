import express from "express";

import getQuote from "./data";

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  if (!req.query.percent) {
    res.status(400);
    res.json({ error: "No Query 'percent' founded" });
    return;
  }

  const percent = parseInt(req.query.percent as string);

  if (percent < 0 || percent > 100) {
    res.status(400);
    res.json({ error: "Bad Percent" });
    return;
  }

  res.status(200);
  res.json({
    quote: getQuote(percent),
  });
});

app.listen(PORT, () => {
  console.log(`The application is listening on port ${PORT}`);
});
