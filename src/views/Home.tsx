import "./Home.scss";

import { useEffect, useState } from "react";

import { getAll } from "../utils/client_get";
import { LearnedWithID } from "../models/Learned";

export default function Home() {
  const [datas, setDatas] = useState<LearnedWithID[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      const newDatas = await getAll();
      if (typeof newDatas == "string") setError(newDatas);
      else setDatas(newDatas);
    })();
  }, []);

  return (
    <div className="Home d-flex flex-column justify-content-start align-items-center p-4">
      <h1>Today I Learned</h1>
      {error && <p>{error}</p>}
      {datas.length ? (
        datas.map((data) => (
          <div
            className="items d-flex flex-row justify-content-center gap-2"
            key={data.id}
          >
            <p>{data.date}</p>
            <p>{data.what}</p>
          </div>
        ))
      ) : (
        <p>No data. Probably loading</p>
      )}
      <p>
        Source Code for this website&nbsp;
        <a
          href="https://github.com/Leomotors/til-react"
          target="_blank"
          rel="noopener"
        >
          here
        </a>
      </p>
    </div>
  );
}
