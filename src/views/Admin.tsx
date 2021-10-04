import { useState, useEffect } from "react";

import { fullQuoteResponse, getAllQuote } from "../utils/Quote";

import AdminModal from "../components/AdminModal";

export default function Admin() {
  const [quotes, setQuotes] = useState<fullQuoteResponse[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("password")) {
      setShowModal(true);
    } else {
      requestQuotes();
    }
  }, []);

  function submitPassword(newPassword: string) {
    return () => {
      setShowModal(false);
      localStorage.setItem("password", newPassword);
      requestQuotes();
    };
  }

  async function requestQuotes() {
    const quotes = await getAllQuote(localStorage.getItem("password") ?? "");
    if (typeof quotes == "string") {
      setErrorMsg(quotes);
      setShowModal(true);
    } else {
      setQuotes(quotes);
    }
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
          {quotes.map((quote, index) => (
            <tr key={index}>
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
      <AdminModal
        show={showModal}
        submitPassword={submitPassword}
        errorMsg={errorMsg}
      />
    </div>
  );
}
