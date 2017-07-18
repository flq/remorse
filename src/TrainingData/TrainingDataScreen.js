import React, { Component } from "react";
import { Route } from "react-router";
import { NavLink } from "react-router-dom";
import { retrieveObject, APP_READ_TRAINDATA_KEY, APP_WRITE_TRAINDATA_KEY } from "../components/Utils";
import { calculateMorscore } from "../components/MorseLib";
import "./TrainingData.css";

export default class TrainingDataScreen extends Component {
  render() {
    const { match } = this.props;
    return (
      <div>
        <SubNav {...this.props} />
        <Route path={match.url + "/tabular"} render={TabularDataFactory} />
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

function TabularDataFactory(props) {
  return (
    <div className="flex-row">
      <TabularData header="Reading" data={retrieveObject(APP_READ_TRAINDATA_KEY) || []} />
      <TabularData header="Writing" data={retrieveObject(APP_WRITE_TRAINDATA_KEY) || []} />
    </div>
  );
}

function TabularData({ header, data }) {
  return (
    <div className="tableData">
      <h3>
        {header}
      </h3>
      <table>
        <thead>
          <tr>
            <th>When</th>
            <th>Success</th>
            <th>Scope</th>
            <th>Repeats</th>
            <th>Duration</th>
            <th>
              <span>Morscore</span>
              <span className="tooltiptext">
                The morscore takes all numbers recorded in your training and calculates a score that considers
                your success, scope, size and time taken.
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ time, successRate, scopeRatio, amount, timeTaken }, i) =>
            <tr key={i}>
              <td>
                {getTime(time)}
              </td>
              <td>
                {successRate * 100} %
              </td>
              <td>
                {scopeRatio * 100} %
              </td>
              <td>
                {amount}
              </td>
              <td>
                {timeTaken} s
              </td>
              <td>
                {calculateMorscore(successRate, scopeRatio, amount, timeTaken)}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function getTime(timeString) {
  const d = new Date(timeString);
  return `${d.toLocaleDateString()} ${d.getHours()}:${d.getMinutes()}`;
}
