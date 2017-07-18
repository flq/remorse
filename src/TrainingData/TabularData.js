import React from "react";
import { retrieveObject, APP_READ_TRAINDATA_KEY, APP_WRITE_TRAINDATA_KEY } from "../components/Utils";
import { calculateMorscore } from "../components/MorseLib";

export default function TabularDataFactory(props) {
  return (
    <div className="flex-row wrap">
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
  return `${d.toLocaleDateString()} ${d.getHours()}:${d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes()}`;
}