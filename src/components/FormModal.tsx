import { useState } from "react";
import { Modal } from "react-bootstrap";

import "./FormModal.scss";

export default function FormModal({
  show,
  onHide,
  onSubmit,
}: {
  show: boolean;
  onHide: () => void;
  onSubmit: (what: string, date: string) => Promise<void>;
}) {
  const [what, setWhat] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  return (
    <Modal show={show} onHide={onHide} backdrop="static" keyboard={true}>
      <Modal.Header closeButton>
        <p className="fw-bolder h3">Add</p>
      </Modal.Header>
      <Modal.Body>
        <label className="form-label fw-bold">What have I learned?</label>
        <textarea
          className="form-control"
          onChange={(e) => setWhat(e.target.value)}
        />
        <label className="date-picker fw-bold pt-3 pb-2">Date</label>
        <input
          type="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={onHide}>
          Cancel
        </button>
        <button
          className="btn btn-success"
          onClick={() => {
            onHide();
            onSubmit(what, date);
          }}
          disabled={!what}
        >
          Submit
        </button>
      </Modal.Footer>
    </Modal>
  );
}
