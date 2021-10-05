import { useState, useEffect } from "react";
import axios from "axios";

import { getAllQuote } from "../utils/Quote";
import { Quote } from "../models/Quote";

import AdminModal from "../components/AdminModal";
import FormModal from "../components/FormModal";
import Alert from "../components/Alert";

export default function Admin() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("password")) {
      setShowAdmin(true);
    } else {
      requestQuotes();
    }
  }, []);

  function submitPassword(newPassword: string) {
    return () => {
      setShowAdmin(false);
      localStorage.setItem("password", newPassword);
      requestQuotes();
    };
  }

  async function requestQuotes() {
    const quotes = await getAllQuote(localStorage.getItem("password") ?? "");
    if (typeof quotes == "string") {
      setErrorMsg(quotes);
      setShowAdmin(true);
    } else {
      setQuotes(
        quotes.sort((a: Quote, b: Quote) => {
          const ac = a.created_at;
          const bc = b.created_at;
          if (ac < bc) return 1;
          else if (ac > bc) return -1;
          else return 0;
        })
      );
    }
  }

  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertContent, setAlertContent] = useState("");

  function resetAlert() {
    setShowAlert(false);
    setAlertType("");
    setAlertContent("");
  }

  async function handleNewQuote(quote: string, count: number) {
    try {
      await axios.post("/api/addquote", {
        quote,
        count,
        password: localStorage.getItem("password"),
      });
      setAlertContent("Quote added Successfully");
      setAlertType("success");
      setShowAlert(true);
      requestQuotes();
    } catch (err) {
      // @ts-ignore
      setAlertContent(err.message as string);
      setAlertType("danger");
      setShowAlert(true);
    }

    setTimeout(() => resetAlert(), 3000);
  }

  async function deleteQuote(id: string) {
    return async () => {
      await axios.post("/api/deletequote", {
        id,
        password: localStorage.getItem("password"),
      });
    };
  }

  return (
    <div className="Admin container-lg p-5 d-flex flex-column">
      <Alert show={showAlert} type={alertType} content={alertContent} />
      <button
        className="btn btn-dark align-self-end mb-2"
        onClick={() => setShowForm(true)}
      >
        <i className="bi bi-plus me-1 fs-5" />
        <span className="fs-5">Add Quote</span>
      </button>
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
        show={showAdmin}
        submitPassword={submitPassword}
        errorMsg={errorMsg}
      />
      <FormModal
        show={showForm}
        onHide={() => setShowForm(false)}
        onSubmit={handleNewQuote}
      />
    </div>
  );
}
