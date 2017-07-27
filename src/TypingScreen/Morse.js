import React from 'react';
import './Morse.css';
import {charToMorseCode} from '../components/MorseLib';

const RENDER_MODES = {
  morse: 1,
  char: 2
}

const RENDER_BOTH = RENDER_MODES.char | RENDER_MODES.morse;


function MorseWord({ word }) {
  const morseChars = Array
    .from(word)
    .map((c, i) => <MorseChar key={i} char={c} />);
  return <span className="morseWord">{morseChars}</span>;
}

export function WordsToMorse({ text }) {
  if (!text)
    return null;
  return (
    <section>
      {text.split(" ").map((word, i) => <MorseWord key={i} word={word} />)}
    </section>
  );
}

export function MorseChar({ char, renderMode = RENDER_BOTH }) {
  return (
    <div className="morseToken">
      {(renderMode & RENDER_MODES.char) && <span className="morseChar">{char}</span> }
      {(renderMode & RENDER_MODES.morse) && <span className="morseCode">{charToMorseCode(char)}</span> }
    </div>
  );
}