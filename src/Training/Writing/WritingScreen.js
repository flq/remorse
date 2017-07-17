import React from "react";
import { connect } from "react-redux";
import TrainConfiguration from "../TrainConfiguration";
import TrainingScreen from "../TrainingScreen";
import Actions from "./TrainingSpecifics";

const WriteTraining = connect(function(s) {
  return s.train.currentTraining || {};
}, Actions)(TrainingScreen);

function Inner(props) {
  return (
    <section>
      <TrainConfiguration {...props} />
      <WriteTraining />
    </section>
  );
}

const WritingScreen = connect(function(s) {
  return s.train;
}, Actions)(Inner);

export default WritingScreen;
