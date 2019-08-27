import React from "react";
import Layout from "../../components/Layout";
import Results from "./Results";
import NumberWithUnit from "./NumberWithUnit";
import TrainingRun from "./TrainingRun";
import LetterScope from "./LetterScope";

const TestReading = () => (
  <Layout header="Test your reading">
    <p>Read</p>
    <LetterScope
      scope={["a"]}
      onChangeWritingScope={l => {
        console.log(l);
      }}
    />
    <TrainingRun />
  </Layout>
);

export default TestReading;
