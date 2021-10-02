import "./Home.scss";

import { useState } from "react";

import { randomQuote } from "../utils/Quote";

export default function Home() {
  let ongoingRequest = false;

  const [percent, setPercent] = useState(50);
  const [quote, setQuote] = useState("");

  function setSlider(e: React.ChangeEvent<HTMLInputElement>) {
    setPercent(parseInt(e.target.value));
  }

  async function generateQuote() {
    if (ongoingRequest) return;

    ongoingRequest = true;
    const newQuote = await randomQuote(percent);
    ongoingRequest = false;
    setQuote(newQuote);
  }

  return (
    <div className="Home container-lg d-flex flex-column justify-content-start align-items-center">
      <h1 className="mt-5">Get Quote about Food Waste</h1>
      <div className="slider-group m-5 d-flex flex-row">
        <input
          className="slider"
          type="range"
          min="0"
          max="100"
          step="10"
          onChange={setSlider}
        />
        <div className="slider-label text-center fw-bold">{percent}%</div>
      </div>

      <button className="btn btn-success" onClick={generateQuote}>
        Submit
      </button>

      {quote.length > 0 && (
        <div className="quote-container">
          <h1>{quote}</h1>
        </div>
      )}
    </div>
  );
}
