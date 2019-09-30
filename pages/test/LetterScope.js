import React, { useContext } from "react";
import classNames from "classnames";
import { LETTERS } from "../../lib/morse";
import { TrainingRunContext } from "./TrainingRunContext";

const LetterScope = ({ scope, onChangeWritingScope }) => {
  const trainingRun = useContext(TrainingRunContext);
  return (
    <section>
      <div className="scopeActions">
        <ScopeButton onClick={trainingRun.actions.putAllInScope}>
          All
        </ScopeButton>
        <ScopeButton onClick={trainingRun.actions.clearScope}>None</ScopeButton>
      </div>
      <div className="letters">
        {LETTERS.map(l => (
          <LetterSelector
            key={l}
            letter={l}
            inScope={trainingRun.state.scope.has(l)}
            onSelectLetter={trainingRun.actions.toggleScope}
          />
        ))}
      </div>
      <style jsx>{`
        section {
          display: flex;
          flex-direction: row;
          justify-content: center;
        }
        .letters {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
        }
        .scopeActions {
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </section>
  );
};

const LetterSelector = React.memo(({ letter, inScope, onSelectLetter }) => (
  <ScopeButton active={inScope} onClick={() => onSelectLetter(letter)}>
    {letter}
  </ScopeButton>
));

const ScopeButton = ({ children, active, ...stuff }) => (
  <button className={classNames({ active })} {...stuff}>
    {children}
    <style jsx>{`
      button {
        margin: 0.5rem;
        padding: 0.5rem 0.75rem;
        min-width: 2rem;
        font-size: 1.5rem;
        background-color: darkcyan;
        color: white;
        border: 0;
        border-radius: 0.5rem;
        outline: none;
      }
      button:hover {
        cursor: pointer;
        background-color: cadetblue;
      }
      active:hover {
        cursor: pointer;
        background-color: coral;
      }
      .active {
        background-color: var(--active-color);
        box-shadow: inset 1px -1px 9px 2px darkcyan;
      }
    `}</style>
  </button>
);

export default LetterScope;
