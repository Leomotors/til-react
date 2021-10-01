import express from "express";
import cors from "cors";
import path from "path";

import getQuote, { data } from "./data";

const app = express();
const PORT = process.env.PORT || 3030;

app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../dist/index.html"));
  });
}

app.get("/api/quote", (req, res) => {
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

app.get("/api/allquotes", (req, res) => {
  if (req.query.password != "1234") {
    res.status(403);
    res.json({ error: "Access Denied" });
    return;
  }

  res.status(200);
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`The application is listening on port ${PORT}`);
});
