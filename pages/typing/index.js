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
            <span>{soundSpeed * 100} %</span>
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
        .typingScreen .userInput {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }
        .typingScreen .soundButton {
          font-size: 1.5em;
        }

        .typingScreen form {
          display: flex;
          flex-direction: column;
          width: 100%;
          margin-bottom: 0.5rem;
        }

        .soundControls {
          display: flex;
          align-items: center;
        }

        .soundControls > * {
          margin-right: 10px;
        }
      `}</style>
    </Layout>
  );
};

export default Typing;
