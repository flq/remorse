import React from "react";
import { connect } from "react-redux";
import { saveProgress } from "../AppActions";

function Inner({ saveProgress }) {
  return (
    <div id="globalCommands">
      <button onClick={saveProgress}>
        <span role="img" aria-label="Save state">
          &#128190;
        </span>
      </button>
      <span className="tooltiptext">Save training settings</span>
    </div>
  );
}

const GlobalCommands = connect(
  s => s,
  { saveProgress }
)(Inner);

export default GlobalCommands;
