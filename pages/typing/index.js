import React, { useState } from "react";
import Layout from "../../components/Layout";
import { getWordsWithStartAndEndIndex, WordsToMorse } from "./Morse";
import { textAsMorseSound } from "../../lib/sound";

const Typing = () => {
  const [morseText, changeMorseText] = useState("");
  const [soundSpeed, changeSoundSpeed] = useState(1.0);
  const [disabledDueToSoundPlay, setPlayingSound] = useState(false);
  const [highlightedCharacterIndex, setHighlightedCharacterIndex] = useState(
    null
  );
  const [wordIndexTuples, setWordIndexTuples] = useState(null);

  return (
    <Layout header="Learn to morse">
      <section className="typingScreen">
        <form>
          <input
            autoFocus
            type="text"
            disabled={disabledDueToSoundPlay}
            className="userInput"
            autoComplete="off"
            value={morseText}
            onChange={e => changeMorseText(e.currentTarget.value)}
            placeholder="Type what should be morsed"
          />
          <div className="soundControls">
            <input
              type="range"
              disabled={disabledDueToSoundPlay}
              max="1.0"
              min="0.3"
              step="0.1"
              onChange={e => changeSoundSpeed(e.currentTarget.value)}
              value={soundSpeed}
            />
            <span>{soundSpeed * 100}%</span>
            <input
              type="button"
              className="soundButton"
              disabled={disabledDueToSoundPlay}
              value="&#128266;"
              onClick={async () => {
                setPlayingSound(true);
                setWordIndexTuples(getWordsWithStartAndEndIndex(morseText));
                await textAsMorseSound(
                  morseText,
                  soundSpeed,
                  setHighlightedCharacterIndex
                );
                setPlayingSound(false);
                setHighlightedCharacterIndex(null);
                setWordIndexTuples(null);
              }}
            />
          </div>
        </form>
        <WordsToMorse
          text={morseText}
          highlightedCharacterIndex={highlightedCharacterIndex}
          wordIndexTuples={wordIndexTuples}
        />
      </section>
      <style jsx>{`
        .typingScreen input {
          font-size: 1.5em;
          min-width: 40%;
        }

        .typingScreen form {
          display: flex;
          width: 100%;
          flex-direction: row;
          flex-wrap: wrap;
          margin-bottom: 1rem;
          margin-top: -0.5rem;
        }

        .typingScreen form > * {
          margin-right: 0.5rem;
          margin-top: 0.5rem;
        }

        .soundControls {
          display: flex;
          align-items: center;
        }

        .soundControls > span {
          min-width: 4rem;
        }

        .soundControls > * {
          margin-right: 0.5rem;
        }

        .soundButton:disabled {
          opacity: 0.6;
        }
      `}</style>
    </Layout>
  );
};

export default Typing;
