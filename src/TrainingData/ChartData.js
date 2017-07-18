import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { retrieveObject, APP_READ_TRAINDATA_KEY, APP_WRITE_TRAINDATA_KEY } from "../components/Utils";
import { reduce, groupBy, mapValues } from "lodash";

export default function ChartDataFactory(props) {
  return (
    <div className="flex-row wrap">
      <ChartData header="Reading" data={retrieveObject(APP_READ_TRAINDATA_KEY) || []} />
      <ChartData header="Writing" data={retrieveObject(APP_WRITE_TRAINDATA_KEY) || []} />
    </div>
  );
}

function ChartData({ header, data }) {
  const tunedData = mapReduceForChart(data);
  return (
    <div className="chartData">
      <h3>
        {header}
      </h3>
      <LineChart
        width={600}
        height={300}
        data={tunedData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="day" label="Days" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="successRate" stroke="green" name="Success %" />
        <Line type="monotone" dataKey="scopeRatio" stroke="#8884d8" name="Scope %" />
        <Line type="monotone" dataKey="charPerMin" stroke="orange" name="Characters / Minute" />
      </LineChart>
    </div>
  );
}

/*
 * - group by day, take average of all data for that day
 * - absolute dates are converted to relative, starting with 1
 */
function mapReduceForChart(data) {
  const groupedData = groupBy(data, d => new Date(d.time).toLocaleDateString());
  const reducedData = reduce(
    groupedData,
    (acc, items, date) => {
      const total = items.length;
      let item = reduce(
        items,
        (acc, item) => ({
          successRate: (acc.successRate || 0) + item.successRate * 100,
          scopeRatio: (acc.scopeRatio || 0) + item.scopeRatio * 100,
          charPerMin: (acc.charPerMin || 0) + ((parseInt(item.amount, 10) / item.timeTaken) * 60)
        }),
        {}
      );
      item = mapValues(item, v => parseFloat((v / total).toFixed(2)));
      item.originalDay = new Date(items[0].time);
      item.day =
        acc.length === 0
          ? 1
          : acc[acc.length - 1].day + getTimeDifference(item.originalDay, acc[acc.length - 1].originalDay);
      acc.push(item);
      return acc;
    },
    []
  );
  return reducedData;
}

function getTimeDifference(newDay, oldDay) {
  var timeDiff = Math.abs(newDay.getTime() - oldDay.getTime());
  var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return diffDays;
}
