import "./Home.scss";

import { useState } from "react";

import { randomQuote } from "../utils/Quote";

const calmDown = "Calm down! You are sending too many request!";
export default function Home() {
  const [percent, setPercent] = useState(50);
  const [lang, setLang] = useState("en");
  const [quote, setQuote] = useState("");
  const [error, setError] = useState("");
  const [ongoingRequest, setOngoingRequest] = useState(false);

  function setSlider(e: React.ChangeEvent<HTMLInputElement>) {
    setPercent(parseInt(e.target.value));
  }

  function cleanError() {
    if (error == calmDown) setError("");
  }

  async function generateQuote() {
    if (ongoingRequest) {
      setError(calmDown);
      setTimeout(() => {
        cleanError();
      }, 3000);
      return;
    }

    setOngoingRequest(true);
    const newQuote = await randomQuote(percent, lang);
    if (newQuote.toString().toLowerCase().includes("error")) setError(newQuote);
    else setQuote(newQuote);
    setOngoingRequest(false);
  }

  return (
    <div className="Home d-flex flex-column justify-content-start align-items-center">
      <h1 className="mt-5">Get Quote about Food Waste</h1>
      <div className="slider-group my-5 mt-5 mb-4 d-flex flex-row">
        <div className="input-group-text fw-bold fs-5">
          Amount of Food Eaten
        </div>
        <input
          className="slider"
          type="range"
          min="0"
          max="100"
          step="10"
          onChange={setSlider}
        />
        <div className="slider-label text-center fw-bold fs-4 px-2 py-1">
          {percent}%
        </div>
      </div>
      <div className="input-group input-group-lg select-lang mb-4">
        <span className="input-group-text">Language</span>
        <select
          className="form-select"
          onChange={(e) => setLang(e.target.value)}
        >
          <option value="en">English</option>
          <option value="th">Thai</option>
        </select>
      </div>

      <button className="btn btn-success" onClick={generateQuote}>
        Submit
      </button>

      {error.length > 0 && <h3 className="text-danger mt-4">{error}</h3>}

      {(quote.length > 0 || ongoingRequest) && (
        <div className="quote-container">
          {ongoingRequest && (
            <div className="progress mb-4">
              <div className="progress-bar progress-bar-striped progress-bar-animated" />
            </div>
          )}
          {quote.length > 0 && <h1>{quote}</h1>}
        </div>
      )}
    </div>
  );
}
