import { useMemo, useState } from "react";
import { runProbes } from "./performance/run-probes";
import { summarize } from "./performance/summarize";
import { forEachSum, forSum, reduceSum, whileSum } from "./sum";

import "./styles.css";

export default function App() {
  const [counter, setCounter] = useState(0);
  const [iterations, setIterations] = useState(10000);

  const results = useMemo(() => {
    const items = Array.from({ length: iterations }, (_, i) => i);

    return [forEachSum, forSum, reduceSum, whileSum].map((fn) => {
      return summarize({
        key: fn.name,
        values: runProbes({
          func: () => fn(...items),
          iterations,
        }),
      });
    });
  }, [counter]);

  return (
    <div className="App">
      {results
        .sort((a, b) => {
          if (a.total > b.total) return 1;
          if (a.total === b.total) return 0;
          return -1;
        })
        .map((result) => (
          <pre key={result.key}>{JSON.stringify(result)}</pre>
        ))}

      <footer>
        <button
          style={{ marginTop: "24px" }}
          onClick={() => setCounter(counter + 1)}
        >
          Test number {counter + 1}
        </button>
        <div style={{ display: "flex" }}>
          <span>Iterations: </span>
          <input
            type="number"
            value={iterations}
            onChange={(e) => setIterations(+e.target.value)}
          />
        </div>
      </footer>
    </div>
  );
}
