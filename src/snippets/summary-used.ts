import { runProbes } from "../performance/run-probes";
import { summarize } from "../performance/summarize";

// Our function, of which performance we want to measure.
const sum = (...items: number[]): number => {
  return items.reduce((acc, sum) => acc + sum, 0);
};

// Function composition and logging the result.
console.table(
  summarize({
    key: sum.name,
    values: runProbes({ func: () => sum(1, 2, 3, 4, 5, 6), iterations: 3 }),
  })
);

// This is logged in console.
// ┌───────────────┬───────────┐
// │   (index)     │  Values   │
// ├───────────────┼───────────┤
// │     key       │  'sum'    │
// │     total     │   0.0101  │
