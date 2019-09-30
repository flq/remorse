import React from "react";
import Layout from "../../components/Layout";
import Results from "./Results";
import NumberWithUnit from "./NumberWithUnit";
import TrainingRun from "./TrainingRun";
import LetterScope from "./LetterScope";
import TrainingRunContext from "./TrainingRunContext";

const TestReading = () => (
  <Layout header="Test your reading">
    <TrainingRunContext>
      <h2>Select the letters you want to train</h2>
      <LetterScope
        scope={["a"]}
        onChangeWritingScope={l => {
          console.log(l);
        }}
      />
      <TrainingRun />
    </TrainingRunContext>
  </Layout>
);

export default TestReading;
