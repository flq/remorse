import React from "react";
import { charToMorseCode } from "../../lib/morse";

const RENDER_MODES = {
  morse: 1,
  char: 2
};

const RENDER_BOTH = RENDER_MODES.char | RENDER_MODES.morse;

export function MorseChar({ char, renderMode = RENDER_BOTH }) {
  return (
    <div className="morseToken">
      {renderMode & RENDER_MODES.char && <span>{char}</span>}
      {renderMode & RENDER_MODES.morse && <span>{charToMorseCode(char)}</span>}
      <style jsx>
        {`
          .morseToken {
            background: lightgray;
            margin: 0 10px 10px 0;
            display: flex;
            flex-direction: column;
            min-width: 3.4em;
            text-transform: capitalize;
            box-shadow: 4px 4px 10px;
          }
        `}
      </style>
    </div>
  );
}

function MorseWord({ word }) {
  const morseChars = Array.from(word).map((c, i) => (
    <MorseChar key={i} char={c} />
  ));
  return (
    <span className="morseWord">
      {morseChars}
      <style jsx>
        {`
          .morseWord {
            font-size: 2em;
            font-family: Consolas;
            display: flex;
            flex-direction: row;
          }
        `}
      </style>
    </span>
  );
}

export function WordsToMorse({ text }) {
  if (!text) return null;
  return (
    <section>
      {text.split(" ").map((word, i) => (
        <MorseWord key={i} word={word} />
      ))}
    </section>
  );
}
