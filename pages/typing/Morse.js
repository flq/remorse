import React from "react";
import { charToMorseCode } from "../../lib/morse";

const RENDER_MODES = {
  morse: 1,
  char: 2
};

const RENDER_BOTH = RENDER_MODES.char | RENDER_MODES.morse;

export function MorseChar({ char, renderMode = RENDER_BOTH, highlighted }) {
  return (
    <div className="morseToken">
      {renderMode & RENDER_MODES.char && (
        <span className={highlighted ? "highlight" : undefined}>{char}</span>
      )}
      {renderMode & RENDER_MODES.morse && (
        <span className={highlighted ? "highlight" : undefined}>
          {charToMorseCode(char)}
        </span>
      )}
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
          .highlight {
            background: #af0000;
            color: white;
          }
        `}
      </style>
    </div>
  );
}

function MorseWord({ word, wordIndexTuple, highlightedCharacterIndex }) {
  const morseChars = Array.from(word).map((c, i) => (
    <MorseChar
      key={i}
      char={c}
      highlighted={
        wordIndexTuple !== null &&
        highlightedCharacterIndex !== null &&
        wordIndexTuple[1] <= highlightedCharacterIndex &&
        wordIndexTuple[2] >= highlightedCharacterIndex &&
        i === highlightedCharacterIndex - wordIndexTuple[1]
      }
    />
  ));
  return (
    <span className="morseWord">
      {morseChars}
      <style jsx>
        {`
          .morseWord {
            font-size: 1.5em;
            font-family: Consolas;
            display: flex;
            flex-direction: row;
          }
        `}
      </style>
    </span>
  );
}

export function WordsToMorse({
  text,
  wordIndexTuples = null,
  highlightedCharacterIndex = null
}) {
  if (!text) {
    // noinspection JSConstructorReturnsPrimitive
    return null;
  }

  return (
    <section>
      {text.split(" ").map((word, i) => (
        <MorseWord
          key={i}
          word={word}
          wordIndexTuple={wordIndexTuples !== null ? wordIndexTuples[i] : null}
          highlightedCharacterIndex={highlightedCharacterIndex}
        />
      ))}
    </section>
  );
}

/**
 * Returns a tuple for each word with start and end index of each word which
 * describe their position in the input string. The string is expected to be normalized:
 * Trimmed, and only single spaces between words.
 * @param {string} text
 * @returns {Array} - A tuple of [word, startIndex, endIndex]. indices are both inclusive
 */
export function getWordsWithStartAndEndIndex(text) {
  return text.split(" ").reduce((agg, currentWord) => {
    if (agg.length === 0) {
      agg.push([currentWord, 0, currentWord.length - 1]);
    } else {
      const [, , endIndex] = agg[agg.length - 1];
      agg.push([
        currentWord,
        endIndex + 2,
        endIndex +
          currentWord.length +
          1 /* +2(after space) -1(length->index) */
      ]);
    }
    return agg;
  }, []);
}
