export const data = [
  {
    quote:
      "Methane Produced by this Meal equals to a cow's fart of __PARAMS__ days!",
    count: 3,
  },
  {
    quote:
      "Methane Produced by this Meal equals to a dog's fart of __PARAMS__ days!",
    count: 7,
  },
];

export default function getQuote(percent: number): string {
  const quote = data[Math.floor(Math.random() * data.length)];
  const count = Math.ceil((quote.count * (100 - percent)) / 100);
  return quote.quote.replace("__PARAMS__", count.toString());
}
