import "./App.scss";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "./views/Home";
import Admin from "./views/Admin";
import PageNotFound from "./views/404";

export default function App() {
  return (
    <Router>
      <div className="App">
        <div className="navbar bg-primary px-4">
          <Link to={"/"} className="navbar-brand">
            Food Waste Quotes
          </Link>
          <a href={"/admin"} className="navbar-option">
            Admin
          </a>
        </div>

        <div className="router-view col-12">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/admin" component={Admin} />
            <Route path="*" component={PageNotFound} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}
