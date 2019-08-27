import { useState, useRef, useEffect, useCallback } from "react";

export function useStartableInterval(callback, delay) {
  const savedCallback = useRef(null);
  const [running, setRunning] = useState(false);
  const run = useCallback(() => setRunning(true), [setRunning]);
  const stop = useCallback(() => setRunning(false), [setRunning]);
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      // noinspection JSValidateTypes
      savedCallback.current && savedCallback.current();
    }
    if (delay !== null && running) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay, running]);
  return { run, stop };
}
