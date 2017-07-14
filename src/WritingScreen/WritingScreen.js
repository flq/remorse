import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import { If } from "../components/Utils";
import { LETTERS } from "../components/MorseLib";
import "./WritingScreen.css";
import WriteTraining from "./WriteTraining";
import * as Actions from "./Actions";

function Inner({
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
    <section className="writingScreen">
      <If condition={!(currentTraining && currentTraining.started)}>
        <div>
          <ToolBox
            {...{
              canStart: lettersInScope.length > 1,
              trainCount,
              putAllInScope,
              removeAllFromScope,
              changeTrainCount,
              startTraining
            }}
          />
          <LetterScope scope={lettersInScope} {...{ changeWritingScope }} />
        </div>
      </If>
      <WriteTraining />
    </section>
  );
}

export function LetterScope({ scope, changeWritingScope, putAllInScope, removeAllFromScope }) {
  return (
    <section className="learningScope">
      {LETTERS.map(l =>
        <LetterSelector
          key={l}
          letter={l}
          inScope={scope.indexOf(l) >= 0}
          selectLetter={() => changeWritingScope(l)}
        />
      )}
    </section>
  );
}

function ToolBox({
  trainCount = 20,
  canStart,
  putAllInScope,
  removeAllFromScope,
  changeTrainCount,
  startTraining
}) {
  return (
    <div className="toolBox">
      <h2>What do you want to train?</h2>
      <button onClick={putAllInScope}>All</button>
      <button onClick={removeAllFromScope}>None</button>
      <h2>How many?</h2>
      <input
        type="range"
        min="10"
        max="100"
        step="10"
        onChange={e => changeTrainCount(e.currentTarget.value)}
        value={trainCount}
      />
      <h2>
        {trainCount}
      </h2>
      <button onClick={startTraining} disabled={!canStart}>
        Start!
      </button>
    </div>
  );
}

function LetterSelector({ letter, inScope, selectLetter }) {
  const classes = classNames({ inScope });
  return (
    <a className={classes} onClick={selectLetter}>
      {letter}
    </a>
  );
}

const WritingScreen = connect(function(s) {
  return s.writing;
}, Actions)(Inner);

export default WritingScreen;
