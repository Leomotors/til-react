import "./App.scss";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Home from "./views/Home";
import Admin from "./views/Admin";

import { Version, BuildTime } from "./config";

export default function App() {
  return (
    <Router>
      <div className="App">
        <div className="navbar bg-primary px-4">
          <div className="brand" title={`Built at ${BuildTime}`}>
            <Link to="/" className="navbar-brand fs-2">
              Today I Learned
            </Link>
            <span className="text-white fs-5">{Version}</span>
            <a
              className="preview fs-5"
              href="https://github.com/Leomotors"
              target="_blank"
              rel="noreferrer"
            >
              Leomotors
            </a>
          </div>
        </div>

        <div className="router-view col-12 col-lg-9 col-xl-6 mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
