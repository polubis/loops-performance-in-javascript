import { useMemo, useRef, useState } from "react";
import { runProbes } from "./performance/run-probes";
import { summarize } from "./performance/summarize";
import { forEachSum, forSum, reduceSum, whileSum } from "./sum";

import "./styles.css";

export default function App() {
  const [counter, setCounter] = useState(0);
  const [iterations, setIterations] = useState(100);
  const sumsRef = useRef<Record<string, number>>({});

  const results = useMemo(() => {
    const items = Array.from({ length: iterations }, (_, i) => i);

    const results = [forEachSum, forSum, reduceSum, whileSum]
      .map((fn) => {
        return summarize({
          key: fn.name,
          digits: 8,
          values: runProbes({
            func: () => fn(...items),
            iterations,
            digits: 8,
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

  const rank = Object.entries(sumsRef.current)
    .filter(([_, value]) => value !== undefined)
    .sort(([, valueA], [, valueB]) => {
      if (valueA < valueB) return 1;
      if (valueA === valueB) return 0;
      return -1;
    });

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

      <section style={{ margin: "24px 0 0 0" }}>
        <h1>Rank</h1>
        {rank.map(([key, value], idx) => (
          <div key={key}>
            <span>({idx + 1}) </span>
            <span>
              <b>{key}</b> has won {value} times
            </span>
          </div>
        ))}
      </section>

      <footer style={{ marginTop: "24px", display: "flex" }}>
        <button onClick={() => setCounter(counter + 1)}>
          Test {counter + 1}
        </button>
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
