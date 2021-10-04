import "./App.scss";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "./views/Home";
import Admin from "./views/Admin";

import { Version } from "./config";

export default function App() {
  return (
    <Router>
      <div className="App">
        <div className="navbar bg-primary px-4">
          <div className="brand">
            <Link to="/" className="navbar-brand fs-2">
              Food Waste Quotes
            </Link>
            <span className="text-white fs-5">{Version}</span>
            <span className="preview fs-5">PREVIEW</span>
          </div>

          <Link to="/admin" className="navbar-option fs-3">
            Admin
          </Link>
        </div>

        <div className="router-view col-12 col-lg-9 col-xl-6 mx-auto">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/admin" component={Admin} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}
