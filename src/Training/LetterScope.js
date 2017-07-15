import React from "react";
import classNames from "classnames";
import { LETTERS } from "../components/MorseLib";

export default function LetterScope({ scope, changeWritingScope }) {
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

function LetterSelector({ letter, inScope, selectLetter }) {
  const classes = classNames({ inScope });
  return (
    <a className={classes} onClick={selectLetter}>
      {letter}
    </a>
  );
}