import { useMemo, useState } from "react";
import { runProbes } from "./performance/run-probes";
import { summarize } from "./performance/summarize";
import { forEachSum, forSum, reduceSum, whileSum } from "./sum";

import "./styles.css";

const useBenchmark = () => {
  const [counter, setCounter] = useState(0);
  const [iterations, setIterations] = useState(100);

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

    return results;
  }, [counter]);

  return { counter, setCounter, iterations, setIterations, results };
};

export default function App() {
  const { counter, setCounter, iterations, setIterations, results } =
    useBenchmark();

  return (
    <div className="App">
      {results.map((result, idx) => (
        <div
          key={result.key}
          style={{
            display: "flex",
            alignItems: "center",
            color: idx === 0 ? "green" : "black",
          }}
        >
          <pre>{JSON.stringify(result)}</pre>
          <div style={{ marginLeft: "8px" }}>
            {idx === 0 && <>Winner in this round</>}
          </div>
        </div>
      ))}

      <footer style={{ marginTop: "24px", display: "flex" }}>
        <button onClick={() => setCounter(counter + 1)}>
          Test {counter + 1}
        </button>
        <div style={{ display: "flex", margin: "0 20px" }}>
          <span>Iterations: </span>
          <input
            type="number"
            value={iterations}
            min={1}
            onChange={(e) => {
              if (e.target.value === "") {
                return;
              }

              setIterations(+e.target.value);
              setCounter(0);
            }}
          />
        </div>
      </footer>
    </div>
  );
}
