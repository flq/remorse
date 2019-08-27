import React from "react";
import Layout from "../../components/Layout";
import Results from "./Results";

const TestReading = () => (
  <Layout header="Test your reading">
    <p>Read</p>
    <Results results={[true, false, true, true, false]} />
  </Layout>
);

export default TestReading;
