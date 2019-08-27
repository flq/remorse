import React from "react";

const NumberWithUnit = ({ children, unit }) => {
  return (
    <div className="numberWithUnit">
      <span>{children}</span>
      <span>{unit}</span>
      <style jsx>{`
        .numberWithUnit {
          display: inline-flex;
          flex-direction: column;
          background-color: lightblue;
          margin-right: 0.5rem;
        }

        .numberWithUnit span:first-of-type {
          font-size: 2em;
          font-weight: bold;
          margin-left: 0.5rem;
          margin-right: 2rem;
        }

        .numberWithUnit span:nth-of-type(2) {
          text-align: right;
          font-size: 1rem;
          margin: 0.25rem 0.5rem;
        }
      `}</style>
    </div>
  );
};

export default NumberWithUnit;
