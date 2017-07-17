import React from "react";
import { connect } from "react-redux";
import {saveProgress} from "../AppActions";

function Inner({ saveProgress }) {
  return (
    <div id="globalCommands">
      <a onClick={saveProgress}>S</a>
    </div>
  );
}

const GlobalCommands = connect(s => s, {saveProgress})(Inner);

export default GlobalCommands;
