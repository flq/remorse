import React from "react";
import "./Training.css";
import { If } from "../components/Utils";
import LetterScope from "./LetterScope";

export default function TrainConfiguration({
  currentTraining,
  lettersInScope,
  trainCount,
  changeWritingScope,
  putAllInScope,
  removeAllFromScope,
  changeTrainCount,
  startTraining
}) {
  return (
    <If condition={!(currentTraining && currentTraining.started)}>
      <div className="flex-column">
        <div className="flex-row toolBox">
          <h2>What do you want to train?</h2>
          <button onClick={putAllInScope}>All</button>
          <button onClick={removeAllFromScope}>None</button>
        </div>
        <LetterScope scope={lettersInScope} {...{ changeWritingScope }} />
        <div className="flex-row toolBox">
          <h2>Train </h2>
          <input
            type="range"
            min="10"
            max="100"
            step="10"
            onChange={e => changeTrainCount(e.currentTarget.value)}
            value={trainCount}
          />
          <h2>
            {trainCount} times.
          </h2>
          <button onClick={startTraining} disabled={lettersInScope.length < 2}>
            Start!
          </button>
        </div>
      </div>
    </If>
  );
}
