import React from "react";
import classNames from "classnames";
import { LETTERS } from "../../lib/morse";

const LetterScope = ({ scope, onChangeWritingScope }) => {
  return (
    <section>
      {LETTERS.map(l => (
        <LetterSelector
          key={l}
          letter={l}
          inScope={scope.indexOf(l) >= 0}
          onSelectLetter={onChangeWritingScope}
        />
      ))}
      <style jsx>{`
        section {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
        }
      `}</style>
    </section>
  );
};

const LetterSelector = React.memo(({ letter, inScope, onSelectLetter }) => (
  <button
    className={classNames({ inScope })}
    onClick={() => onSelectLetter(letter)}
  >
    {letter}
    <style jsx>{`
      button {
        margin: 0.5rem;
        padding: 0.25rem 0.5rem;
        min-width: 2rem;
        font-size: 1.5rem;
        background-color: cornflowerblue;
        color: white;
      }
      button:hover {
        cursor: pointer;
      }
      .inScope {
        background-color: var(--active-color);
      }
    `}</style>
  </button>
));

export default LetterScope;
