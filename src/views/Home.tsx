import { useState } from "react";

import { randomQuote } from "../utils/Quote";

export default function Home() {
  const [percent, setPercent] = useState(50);
  const [quote, setQuote] = useState("");

  function setSlider(e: React.ChangeEvent<HTMLInputElement>) {
    setPercent(parseInt(e.target.value));
  }

  async function generateQuote() {
    const newQuote = await randomQuote(percent);
    setQuote(newQuote);
  }

  return (
    <div className="Home container-lg d-flex flex-column justify-content-start align-items-center">
      <h1>Hello World!</h1>
      <input type="range" min="0" max="100" step="10" onChange={setSlider} />
      {percent}
      <button className="btn btn-success" onClick={generateQuote}>
        Submit
      </button>

      {quote.length > 0 && <h1>{quote}</h1>}
    </div>
  );
}
