import { useMemo, useRef, useState } from "react";
import { runProbes } from "./performance/run-probes";
import { summarize } from "./performance/summarize";
import { forEachSum, forSum, reduceSum, whileSum } from "./sum";

import "./styles.css";

export default function App() {
  const [counter, setCounter] = useState(0);
  const [iterations, setIterations] = useState(10000);
  const sumsRef = useRef<Record<string, number>>({});

  const results = useMemo(() => {
    const items = Array.from({ length: iterations }, (_, i) => i);

    const results = [forEachSum, forSum, reduceSum, whileSum]
      .map((fn) => {
        return summarize({
          key: fn.name,
          values: runProbes({
            func: () => fn(...items),
            iterations,
          }),
        });
      })
      .sort((a, b) => {
        if (a.total > b.total) return 1;
        if (a.total === b.total) return 0;
        return -1;
      });

    const [{ key }] = results;

    sumsRef.current[key] = (sumsRef.current[key] ?? 0) + 1;

    return results;
  }, [counter]);

  return (
    <div className="App">
      {results.map((result) => (
        <div key={result.key} style={{ display: "flex", alignItems: "center" }}>
          <pre>{JSON.stringify(result)}</pre>
          <div style={{ marginLeft: "8px" }}>
            {sumsRef.current[result.key] && (
              <>Number of wins: {sumsRef.current[result.key]}</>
            )}
          </div>
        </div>
      ))}

      <footer style={{ marginTop: "24px", display: "flex" }}>
        <button onClick={() => setCounter(counter + 1)}>Test</button>
        <div style={{ display: "flex", margin: "0 20px" }}>
          <span>Iterations: </span>
          <input
            type="number"
            value={iterations}
            onChange={(e) => {
              setIterations(+e.target.value);
              sumsRef.current = {};
            }}
          />
        </div>
      </footer>
    </div>
  );
}
