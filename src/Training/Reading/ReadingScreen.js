import React from "react";
import { connect } from "react-redux";
import TrainConfiguration from "../TrainConfiguration";
import "./WritingScreen.css";
import WriteTraining from "./WriteTraining";
import * as Actions from "./Actions";

function Inner(props) {
  return (
    <section className="readingScreen">
      <TrainConfiguration {...props} />
      <WriteTraining />
    </section>
  );
}

const ReadingScreen = connect(function(s) {
  return s.train;
}, Actions)(Inner);

export default ReadingScreen;
