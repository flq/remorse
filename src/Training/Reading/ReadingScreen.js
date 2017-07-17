import React from "react";
import { connect } from "react-redux";
import TrainConfiguration from "../TrainConfiguration";
import TrainingScreen from "../TrainingScreen";
import Actions from "./TrainingSpecifics";

const ReadTraining = connect(function(s) {
  return s.train.currentTraining || {};
}, Actions)(TrainingScreen);

function Inner(props) {
  return (
    <section>
      <TrainConfiguration {...props} />
      <ReadTraining />
    </section>
  );
}

const ReadingScreen = connect(function(s) {
  return s.train;
}, Actions)(Inner);

export default ReadingScreen;
