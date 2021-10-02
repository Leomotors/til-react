const quotesData = [
  {
    quote:
      "Methane Produced by this Meal equals to a cow's fart of __PARAM__ days!",
    count: 3,
  },
  {
    quote:
      "Methane Produced by this Meal equals to a dog's fart of __PARAM__ days!",
    count: 7,
  },
];

export function getQuote(percent: number): string {
  const data = getAllQuotes();
  const quote = data[Math.floor(Math.random() * data.length)];
  const count = Math.ceil((quote.count * (100 - percent)) / 100);
  return quote.quote.replace("__PARAM__", count.toString());
}

export function getAllQuotes() {
  return quotesData;
}
