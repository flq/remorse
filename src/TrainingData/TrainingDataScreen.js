import React from "react";
import { Route } from "react-router";
import { NavLink } from "react-router-dom";
import "./TrainingData.css";
import TabularDataFactory from "./TabularData";
import ChartDataFactory from "./ChartData";

export default function TrainingDataScreen({ match }) {
  return (
    <div>
      <SubNav parent={match.url} />
      <Route path={match.url + "/tabular"} render={TabularDataFactory} />
      <Route path={match.url + "/chart"} render={ChartDataFactory} />
    </div>
  );
}

function SubNav({ parent }) {
  return (
    <nav className="sub">
      <NavLink to={parent + "/tabular"}>Raw data</NavLink>
      <NavLink to={parent + "/chart"}>Chart</NavLink>
    </nav>
  );
}
