import React, { useState } from "react";
import Layout from "../../components/Layout";
import { WordsToMorse } from "./Morse";

const Typing = () => {
  const [morseText, changeMorseText] = useState("");
  const [soundSpeed, changeSoundSpeed] = useState(1.0);

  return (
    <Layout header="Learn to morse">
      <section className="typingScreen">
        <form>
          <input
            autoFocus
            type="text"
            className="userInput"
            autoComplete="off"
            value={morseText}
            onChange={e => changeMorseText(e.currentTarget.value)}
            placeholder="Type what should be morsed"
          />
          <div className="soundControls">
            <input
              type="range"
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
              value="&#128266;"
              onClick={() => {
                /* TODO Play Sound */
              }}
            />
          </div>
        </form>
        <WordsToMorse text={morseText} />
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
      `}</style>
    </Layout>
  );
};

export default Typing;
