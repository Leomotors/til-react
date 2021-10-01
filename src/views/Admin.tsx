import { useState, useEffect } from "react";

import { fullQuoteResponse, getAllQuote } from "../utils/Quote";

export default function Admin() {
  const [quotes, setQuotes] = useState<fullQuoteResponse[]>([]);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    setQuotes(await getAllQuote());
  }

  return (
    <div className="Admin container-lg p-5">
      <table className="table table-bordered">
        <thead>
          <tr className="table-secondary">
            <th>Quotes</th>
            <th>Count</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {quotes.map((quote) => (
            <tr>
              <td>{quote.quote}</td>
              <td>{quote.count}</td>
              <td className="d-flex flex-row justify-content-around">
                <button className="btn btn-success">Edit</button>
                <button className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
