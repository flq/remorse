import React from "react";
import { connect } from "react-redux";
import KeyBinding from "react-keybinding-component";
import classNames from "classnames";
import { If, NumberWithUnit } from "../../components/Utils";
import * as Actions from "./Actions";

function Inner({
  started,
  ended,
  itemsLeft,
  currentTime,
  currentLetter,
  currentInput,
  results,
  expectedInput,
  evaluateUserInput,
  forceStopTraining
}) {
  if (!started) return null;
  return (
    <div id="writeTraining">
      <KeyBinding onKey={e => evaluateUserInput(e.keyCode)} />
      <div className="toolBox">
        <a onClick={forceStopTraining}>Stop the training</a>
        <NumberWithUnit unit="seconds">
          {currentTime}
        </NumberWithUnit>
        <NumberWithUnit unit="items left">
          {itemsLeft}
        </NumberWithUnit>
        <h2>
          {Preparation(currentTime)}
        </h2>
      </div>
      <Results results={results} />
      {
        ended && <h2>Well done, you got { percentageOfSuccess(results) } % right!</h2>
      }
      <div>
        <If condition={currentLetter}>
          <p>
            {currentLetter}
          </p>
        </If>
        <If condition={currentInput}>
          <p>
            {currentInput}
          </p>
        </If>
      </div>
    </div>
  );
}

function Results({ results = [] }) {
  return (
    <div id="results">
      {results.map((v, i) => <span key={i} className={classNames({ success: v, fail: !v })} />)}
    </div>
  );
}



function Preparation(currentTime) {
  let text = null;
  if (currentTime > 0) return "";
  switch (currentTime) {
    case -4:
    case -3:
      text = "Use keys '-' and '.' to write";
      break;
    case -2:
      text = "Ready...";
      break;
    case -1:
      text = "Steady...";
      break;
    case 0:
      text = "Go!";
      break;
    default:
      text = "";
      break;
  }
  return text;
}

function percentageOfSuccess(results) {
  var successes = results.reduce((sum, r) => r ? sum + 1 : sum, 0);
  return ((successes / results.length) * 100).toFixed(2);
}

const WriteTraining = connect(function(s) {
  return s.train.currentTraining || {};
}, Actions)(Inner);

export default WriteTraining;
