import React, { useState } from "react";
import { useStartableInterval } from "../../components/useStartableInterval";
import NumberWithUnit from "./NumberWithUnit";

const TrainingRun = () => {
  const [count, setCount] = useState(0);
  const { run, stop } = useStartableInterval(() => setCount(i => i + 1), 1000);
  return (
    <div>
      <button onClick={run}>Run</button>
      <button onClick={stop}>Stop</button>
      <NumberWithUnit unit="Seconds">{count}</NumberWithUnit>
    </div>
  );
};

export default TrainingRun;
