import React from "react";
import Layout from "../../components/Layout";
import Results from "./Results";
import NumberWithUnit from "./NumberWithUnit";

const TestReading = () => (
  <Layout header="Test your reading">
    <p>Read</p>
    <Results results={[true, false, true, true, false]} />
    <NumberWithUnit unit="metres">{23}</NumberWithUnit>
    <NumberWithUnit unit="cm">{230}</NumberWithUnit>
  </Layout>
);

export default TestReading;
