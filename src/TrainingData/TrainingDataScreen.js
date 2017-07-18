import React, { Component } from "react";
import { Route } from "react-router";
import { NavLink } from "react-router-dom";
import "./TrainingData.css";
import TabularDataFactory from "./TabularData";
import ChartDataFactory from "./ChartData";

export default class TrainingDataScreen extends Component {
  render() {
    const { match } = this.props;
    return (
      <div>
        <SubNav {...this.props} />
        <Route path={match.url + "/tabular"} render={TabularDataFactory} />
        <Route path={match.url + "/chart"} render={ChartDataFactory} />
      </div>
    );
  }
}

function SubNav({ match }) {
  return (
    <nav className="sub">
      <NavLink to={match.url + "/tabular"}>Raw data</NavLink>
      <NavLink to={match.url + "/chart"}>Chart</NavLink>
    </nav>
  );
}



