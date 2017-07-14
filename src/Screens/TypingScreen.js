import React from "react";
import { connect } from "react-redux";
import "./TypingScreen.css";
import * as Actions from "../AppActions";
import { WordsToMorse } from "../components/Morse";

function Inner({
  userInput = "",
  count = 0,
  soundSpeed = 1.0,
  changeMorsedText,
  changeSoundSpeed,
  playSound
}) {
  return (
    <section className="typingScreen">
      <form>
        <input
          autoFocus
          type="text"
          className="userInput"
          autoComplete="off"
          value={userInput}
          onChange={e => changeMorsedText(e.currentTarget.value)}
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
          <span>{ soundSpeed * 100} %</span>
          <input
            type="button"
            className="soundButton"
            value="&#128266;"
            onClick={playSound}
          />
        </div>
      </form>
      <WordsToMorse text={userInput} />
    </section>
  );
}

const TypingScreen = connect(s => s, Actions)(Inner);

export default TypingScreen;
