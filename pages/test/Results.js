import React from "react";
import classNames from "classnames";

/**
 *
 * @param props - results: An array of truthy/falsy values
 * @returns A React Node
 * @constructor
 */
const Results = ({ results = [] }) => (
  <div className="results">
    {results.map((v, i) => (
      <span
        aria-label={v ? "success" : "fail"}
        key={i}
        className={classNames({ success: v, fail: !v })}
      />
    ))}
    <style jsx>{`
      .results span {
        display: inline-block;
        width: 1.5rem;
        height: 2rem;
        margin-right: 0.5rem;
        border-radius: 0.25rem;
      }
      .success {
        background-color: green;
      }
      .fail {
        background-color: red;
      }
    `}</style>
  </div>
);

export default Results;
