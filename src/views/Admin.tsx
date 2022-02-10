import { useState, useEffect } from "react";
import axios from "axios";

import { getAll } from "../utils/client_get";
import { Learned, LearnedWithID } from "../models/Learned";

import AdminModal from "../components/AdminModal";
import FormModal from "../components/FormModal";
import DeleteModal from "../components/DeleteModal";
import Alert from "../components/Alert";

export default function Admin() {
  const [datas, setDatas] = useState<LearnedWithID[]>([]);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("password")) {
      setShowAdmin(true);
    } else {
      requestLearned();
    }
  }, []);

  function submitPassword(newPassword: string) {
    return () => {
      setShowAdmin(false);
      localStorage.setItem("password", newPassword);
      requestLearned();
    };
  }

  async function requestLearned() {
    const quotes = await getAll();
    if (typeof quotes == "string") {
      setErrorMsg(quotes);
      setShowAdmin(true);
    } else {
      setDatas(
        quotes.sort((a: Learned, b: Learned) => {
          const ac = a.date;
          const bc = b.date;
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

  async function handleNewLearn(what: string, date: string) {
    try {
      await axios.post("/api/add", {
        what,
        date,
        password: localStorage.getItem("password"),
      });
      setAlertContent("Quote added Successfully");
      setAlertType("success");
      setShowAlert(true);
      requestLearned();
    } catch (err) {
      // @ts-ignore
      setAlertContent(err.message as string);
      setAlertType("danger");
      setShowAlert(true);
    }

    setTimeout(() => resetAlert(), 3000);
  }

  const [deleteModal, setDeleteModal] = useState("");

  async function deleteLearn(id: string) {
    try {
      await axios.post("/api/delete", {
        id,
        password: localStorage.getItem("password"),
      });
      setAlertContent("Learn deleted Successfully");
      setAlertType("success");
      setShowAlert(true);
      requestLearned();
    } catch (err) {
      // @ts-ignore
      setAlertContent(err.message as string);
      setAlertType("danger");
      setShowAlert(true);
    }

    setTimeout(() => resetAlert(), 3000);
  }

  return (
    <div className="Admin container-lg p-5 d-flex flex-column">
      <Alert show={showAlert} type={alertType} content={alertContent} />
      <div className="buttons d-flex flex-row justify-content-between">
        <button
          className="btn btn-dark mb-2"
          onClick={() => setShowAdmin(true)}
        >
          <i className="bi bi-lock me-1 fs-5" />
          <span className="fs-5">Reenter Password</span>
        </button>
        <button className="btn btn-dark mb-2" onClick={() => setShowForm(true)}>
          <i className="bi bi-plus me-1 fs-5" />
          <span className="fs-5">Add</span>
        </button>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr className="table-secondary">
            <th>Learned</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {datas.map((data, index) => (
            <tr key={index}>
              <td>{data.what}</td>
              <td>{data.date}</td>
              <td className="d-flex flex-row justify-content-around">
                <button
                  className="btn btn-danger"
                  onClick={() => setDeleteModal(data.id)}
                >
                  Delete
                </button>
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
        onSubmit={handleNewLearn}
      />
      <DeleteModal
        id={deleteModal}
        onClose={() => setDeleteModal("")}
        onConfirm={deleteLearn}
      />
    </div>
  );
}
